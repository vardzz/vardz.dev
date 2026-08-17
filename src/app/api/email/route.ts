import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const mailOptions = {
      from: SMTP_EMAIL, 
      to: "vardejericho@gmail.com",
      replyTo: email, 
      subject: `Portfolio Contact: ${subject}`,
      html: `<p><strong>Message from:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><br/><div>${content}</div>`,
      attachments: mailAttachments
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
