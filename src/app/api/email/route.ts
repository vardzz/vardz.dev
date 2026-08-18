import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { ContactEmail } from "@/emails/ContactEmail";
import * as React from "react";

export async function POST(req: Request) {
  try {
    const { email, subject, content, attachments = [] } = await req.json();

    if (!email || !subject || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

    if (!SMTP_EMAIL || !SMTP_PASSWORD) {
      console.error("Missing SMTP_EMAIL or SMTP_PASSWORD environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const mailAttachments = attachments.map((att: any) => ({
      filename: att.name,
      content: att.base64,
      encoding: 'base64',
      contentType: att.type
    }));

    // 1. Generate HTML for Admin Notification
    const adminHtml = await render(
      React.createElement(ContactEmail, {
        email,
        subject,
        content,
        type: "admin"
      })
    );

    // 2. Generate HTML for Client Auto-Reply
    const clientHtml = await render(
      React.createElement(ContactEmail, {
        email,
        subject,
        content,
        type: "client"
      })
    );

    // Send email to Admin
    await transporter.sendMail({
      from: SMTP_EMAIL, 
      to: "vardejericho@gmail.com",
      replyTo: email, 
      subject: `From vardz.dev email: ${subject}`,
      html: adminHtml,
      attachments: mailAttachments
    });

    // Send auto-reply to Client
    await transporter.sendMail({
      from: SMTP_EMAIL, 
      to: email,
      subject: `Thank you for reaching out - Jericho Varde`,
      html: clientHtml,
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
