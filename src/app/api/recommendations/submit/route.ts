import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabaseAdmin } from '@/lib/supabase';
import { renderModerationEmail } from '@/emails/recommendationEmail';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, title, message } = body;

    if (!name?.trim() || !title?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, title, and message are all required.' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          error:
            'Supabase is not configured yet. Please check your NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local and restart the server.',
        },
        { status: 503 }
      );
    }

    // Generate unique cryptographically secure approval token
    const approvalToken = crypto.randomUUID();

    // 1. Insert into Supabase with 'pending' status
    const { error: dbError } = await supabaseAdmin
      .from('recommendations')
      .insert([
        {
          name: name.trim(),
          title: title.trim(),
          message: message.trim(),
          status: 'pending',
          approval_token: approvalToken,
        },
      ]);

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json(
        { error: `Database error: ${dbError.message}` },
        { status: 500 }
      );
    }

    // 2. Send email notification with 1-click Approve / Decline buttons
    const { SMTP_EMAIL, SMTP_PASSWORD, NEXT_PUBLIC_SITE_URL } = process.env;
    const siteUrl = NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    if (SMTP_EMAIL && SMTP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD,
          },
        });

        const html = renderModerationEmail({
          name: name.trim(),
          title: title.trim(),
          message: message.trim(),
          approvalToken,
          siteUrl,
        });

        await transporter.sendMail({
          from: SMTP_EMAIL,
          to: 'vardejericho@gmail.com',
          subject: `New Recommendation from ${name.trim()} (Needs Review)`,
          html,
        });
      } catch (emailError) {
        console.error('Failed to send moderation email:', emailError);
      }
    } else {
      console.warn('SMTP credentials missing; moderation email not sent.');
    }

    return NextResponse.json({
      success: true,
      message: 'Recommendation submitted successfully and is pending review.',
    });
  } catch (error: any) {
    console.error('Submit API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
