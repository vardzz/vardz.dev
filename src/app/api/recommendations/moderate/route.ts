import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const action = searchParams.get('action'); // 'approve' | 'reject'

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!token || !action || !['approve', 'reject'].includes(action)) {
    return new Response(renderResultPage({
      status: 'error',
      title: 'Invalid Request',
      message: 'Missing or invalid moderation parameters.',
      siteUrl,
    }), {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  if (!supabaseAdmin) {
    return new Response(renderResultPage({
      status: 'error',
      title: 'Database Unavailable',
      message: 'Supabase is not configured yet. Please check your environment variables.',
      siteUrl,
    }), {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  try {
    // 1. Find the recommendation by unique approval token
    const { data: rec, error: findError } = await supabaseAdmin
      .from('recommendations')
      .select('id, name, title, message, status')
      .eq('approval_token', token)
      .single();

    if (findError || !rec) {
      return new Response(renderResultPage({
        status: 'error',
        title: 'Not Found',
        message: 'This moderation link is invalid or has already expired.',
        siteUrl,
      }), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const newStatus = action === 'approve' ? 'approved' : 'rejected';

    // 2. Update status in database
    const { error: updateError } = await supabaseAdmin
      .from('recommendations')
      .update({ status: newStatus })
      .eq('id', rec.id);

    if (updateError) {
      console.error('Moderation update error:', updateError);
      return new Response(renderResultPage({
        status: 'error',
        title: 'Update Failed',
        message: 'Failed to update recommendation status. Please check server logs.',
        siteUrl,
      }), {
        status: 500,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const isApproved = newStatus === 'approved';

    return new Response(renderResultPage({
      status: 'success',
      title: isApproved ? 'Recommendation Approved & Published' : 'Recommendation Declined',
      message: isApproved
        ? `The recommendation from <strong>${rec.name}</strong> (${rec.title}) is now live on your portfolio!`
        : `The recommendation from <strong>${rec.name}</strong> has been declined and will not appear publicly.`,
      quote: rec.message,
      author: `${rec.name} — ${rec.title}`,
      siteUrl,
    }), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (error) {
    console.error('Moderation endpoint error:', error);
    return new Response(renderResultPage({
      status: 'error',
      title: 'Server Error',
      message: 'An unexpected error occurred while processing your request.',
      siteUrl,
    }), {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}

function renderResultPage({
  status,
  title,
  message,
  quote,
  author,
  siteUrl,
}: {
  status: 'success' | 'error';
  title: string;
  message: string;
  quote?: string;
  author?: string;
  siteUrl: string;
}): string {
  const isSuccess = status === 'success';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Vardz</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      background-color: #0F0E0D;
      color: #F4EDE4;
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    .card {
      max-width: 520px;
      margin: 24px;
      background-color: #161514;
      border: 1px solid rgba(244, 237, 228, 0.15);
      border-radius: 16px;
      padding: 36px;
      text-align: center;
    }
    .badge {
      display: inline-block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: ${isSuccess ? '#4ADE80' : '#F87171'};
      margin-bottom: 12px;
    }
    h1 {
      margin: 0 0 12px 0;
      font-size: 22px;
      font-weight: 500;
      letter-spacing: -0.02em;
    }
    p {
      margin: 0 0 24px 0;
      font-size: 13px;
      line-height: 1.6;
      color: rgba(244, 237, 228, 0.7);
    }
    .quote-box {
      background-color: rgba(244, 237, 228, 0.03);
      border: 1px solid rgba(244, 237, 228, 0.1);
      border-radius: 12px;
      padding: 18px;
      margin-bottom: 24px;
      text-align: left;
    }
    .quote-text {
      font-size: 12px;
      line-height: 1.6;
      color: rgba(244, 237, 228, 0.85);
      margin-bottom: 10px;
    }
    .quote-author {
      font-size: 11px;
      color: rgba(244, 237, 228, 0.5);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .btn {
      display: inline-block;
      background-color: #F4EDE4;
      color: #0F0E0D;
      text-decoration: none;
      font-weight: 500;
      font-size: 13px;
      padding: 12px 24px;
      border-radius: 10px;
      transition: opacity 0.2s;
    }
    .btn:hover {
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">${isSuccess ? '✓ Action Completed' : '✕ Notice'}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    ${
      quote
        ? `
      <div class="quote-box">
        <div class="quote-text">"${quote}"</div>
        ${author ? `<div class="quote-author">${author}</div>` : ''}
      </div>
      `
        : ''
    }
    <a href="${siteUrl}/recommendations" class="btn">View Recommendations Page →</a>
  </div>
</body>
</html>
`;
}
