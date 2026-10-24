import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const action = searchParams.get('action'); // 'approve' | 'reject'

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!token || !action || !['approve', 'reject'].includes(action)) {
    return new Response(
      renderResultPage({
        status: 'error',
        title: 'Invalid Request',
        subtitle: 'Missing or invalid moderation parameters.',
        siteUrl,
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    );
  }

  if (!supabaseAdmin) {
    return new Response(
      renderResultPage({
        status: 'error',
        title: 'Database Unavailable',
        subtitle: 'Supabase is not configured yet. Please check your environment variables.',
        siteUrl,
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    );
  }

  try {
    // 1. Find the recommendation by unique approval token
    const { data: rec, error: findError } = await supabaseAdmin
      .from('recommendations')
      .select('id, name, title, message, status, created_at')
      .eq('approval_token', token)
      .single();

    if (findError || !rec) {
      return new Response(
        renderResultPage({
          status: 'error',
          title: 'Link Expired or Not Found',
          subtitle: 'This moderation link is invalid or has already been used.',
          siteUrl,
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      );
    }

    const newStatus = action === 'approve' ? 'approved' : 'rejected';

    // 2. Update status in database
    const { error: updateError } = await supabaseAdmin
      .from('recommendations')
      .update({ status: newStatus })
      .eq('id', rec.id);

    if (updateError) {
      console.error('Moderation update error:', updateError);
      return new Response(
        renderResultPage({
          status: 'error',
          title: 'Update Failed',
          subtitle: 'Failed to update recommendation status. Please check your database.',
          siteUrl,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      );
    }

    const isApproved = newStatus === 'approved';

    return new Response(
      renderResultPage({
        status: 'success',
        isApproved,
        title: isApproved ? 'Recommendation Approved & Published' : 'Recommendation Declined',
        subtitle: isApproved
          ? `The recommendation from ${rec.name} is now live on your portfolio!`
          : `The recommendation from ${rec.name} has been declined and will not appear publicly.`,
        name: rec.name,
        role: rec.title,
        quote: rec.message,
        date: rec.created_at,
        siteUrl,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    );
  } catch (error) {
    console.error('Moderation endpoint error:', error);
    return new Response(
      renderResultPage({
        status: 'error',
        title: 'Server Error',
        subtitle: 'An unexpected error occurred while processing your request.',
        siteUrl,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    );
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function formatDate(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = d.getFullYear();
  return `${month}  ${year}`;
}

function renderResultPage({
  status,
  isApproved = true,
  title,
  subtitle,
  name,
  role,
  quote,
  date,
  siteUrl,
}: {
  status: 'success' | 'error';
  isApproved?: boolean;
  title: string;
  subtitle: string;
  name?: string;
  role?: string;
  quote?: string;
  date?: string;
  siteUrl: string;
}): string {
  const isSuccess = status === 'success';
  const initials = name ? getInitials(name) : '??';
  const formattedDate = formatDate(date);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Vardz</title>
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 24px;
      min-height: 100vh;
      background-color: #0F0E0D;
      background-image: radial-gradient(circle at 50% 15%, rgba(244, 237, 228, 0.04) 0%, transparent 60%);
      color: #F4EDE4;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      max-width: 540px;
      width: 100%;
      background: #141312;
      border: 1px solid rgba(244, 237, 228, 0.12);
      border-radius: 20px;
      padding: 36px 32px;
      box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(244, 237, 228, 0.04);
      text-align: center;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 4px 12px;
      border-radius: 9999px;
      background: ${
        isSuccess && isApproved
          ? 'rgba(74, 222, 128, 0.08)'
          : isSuccess
          ? 'rgba(244, 237, 228, 0.06)'
          : 'rgba(248, 113, 113, 0.08)'
      };
      border: 1px solid ${
        isSuccess && isApproved
          ? 'rgba(74, 222, 128, 0.25)'
          : isSuccess
          ? 'rgba(244, 237, 228, 0.15)'
          : 'rgba(248, 113, 113, 0.25)'
      };
      color: ${
        isSuccess && isApproved ? '#4ADE80' : isSuccess ? 'rgba(244, 237, 228, 0.7)' : '#F87171'
      };
      margin-bottom: 16px;
    }
    h1 {
      margin: 0 0 8px 0;
      font-size: 22px;
      font-weight: 500;
      letter-spacing: -0.03em;
      color: #F4EDE4;
    }
    .subtitle {
      margin: 0 0 28px 0;
      font-size: 13px;
      line-height: 1.5;
      color: rgba(244, 237, 228, 0.55);
    }
    /* Recommendation Card Replica */
    .rec-card {
      background: rgba(244, 237, 228, 0.02);
      border: 1px solid rgba(244, 237, 228, 0.12);
      border-radius: 16px;
      padding: 24px;
      text-align: left;
      margin-bottom: 28px;
    }
    .quote-icon {
      color: rgba(244, 237, 228, 0.35);
      margin-bottom: 14px;
    }
    .quote-text {
      font-size: 13px;
      line-height: 1.7;
      color: rgba(244, 237, 228, 0.85);
      letter-spacing: -0.01em;
      margin: 0 0 20px 0;
    }
    .author-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid rgba(244, 237, 228, 0.08);
    }
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(244, 237, 228, 0.06);
      border: 1px solid rgba(244, 237, 228, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(244, 237, 228, 0.6);
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .author-name {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: -0.02em;
      color: #F4EDE4;
    }
    .author-title {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: rgba(244, 237, 228, 0.5);
      margin-top: 2px;
    }
    .author-date {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: rgba(244, 237, 228, 0.35);
      margin-top: 6px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background-color: #F4EDE4;
      color: #0F0E0D;
      text-decoration: none;
      font-weight: 500;
      font-size: 13px;
      padding: 13px 26px;
      border-radius: 12px;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .btn:hover {
      background-color: rgba(244, 237, 228, 0.9);
      transform: translateY(-1px);
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="status-badge">
      ${isSuccess && isApproved ? '✓ Live on Portfolio' : isSuccess ? '✕ Declined' : 'Notice'}
    </div>
    <h1>${title}</h1>
    <p class="subtitle">${subtitle}</p>

    ${
      quote && name
        ? `
    <div class="rec-card">
      <div class="quote-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8H6C4.89543 8 4 8.89543 4 10V14C4 15.1046 4.89543 16 6 16H8.5C8.5 17.3807 7.38071 18.5 6 18.5V20C8.48528 20 10.5 17.9853 10.5 15.5V10C10.5 8.89543 9.60457 8 8.5 8H10V8Z" fill="currentColor"/>
          <path d="M20 8H16C14.8954 8 14 8.89543 14 10V14C14 15.1046 14.8954 16 16 16H18.5C18.5 17.3807 17.3807 18.5 16 18.5V20C18.4853 20 20.5 17.9853 20.5 15.5V10C20.5 8.89543 19.6046 8 18.5 8H20V8Z" fill="currentColor"/>
        </svg>
      </div>

      <p class="quote-text">${quote.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>

      <div class="author-row">
        <div class="avatar">${initials}</div>
        <div>
          <div class="author-name">${name.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
          ${
            role
              ? `<div class="author-title">${role.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`
              : ''
          }
          <div class="author-date">${formattedDate}</div>
        </div>
      </div>
    </div>
    `
        : ''
    }

    <div>
      <a href="${siteUrl}/recommendations" class="btn">
        View on Portfolio <span>→</span>
      </a>
    </div>
  </div>
</body>
</html>
`;
}
