import { Html, Head, Preview } from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  email: string;
  subject: string;
  content: string;
  type: "admin" | "client";
}

export const ContactEmail = ({
  email,
  subject,
  content,
  type,
}: ContactEmailProps) => {
  const isClient = type === "client";
  const previewText = isClient
    ? `Thank you for reaching out. I'm Jericho Varde.`
    : `New message from ${email}`;

  const styles = `
    html,
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #f4ede4;
    }
    body {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      font-family: Arial, Helvetica, sans-serif;
    }
    table {
      border-spacing: 0;
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
      display: block;
    }
    a {
      text-decoration: none;
    }
    @media screen and (max-width: 700px) {
      .email-wrapper {
        width: 100% !important;
      }
      .outer-padding {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .card {
        width: 100% !important;
      }
      .card-padding {
        padding-left: 30px !important;
        padding-right: 30px !important;
      }
      .hero-title {
        font-size: 40px !important;
        line-height: 46px !important;
      }
      .intro-text {
        font-size: 16px !important;
        line-height: 26px !important;
      }
      .service-column {
        display: block !important;
        width: 100% !important;
        padding: 0 0 30px 0 !important;
      }
      .service-divider {
        display: none !important;
      }
      .footer-column {
        display: block !important;
        width: 100% !important;
        padding-bottom: 25px !important;
      }
    }
  `;

  return (
    <Html lang="en">
      <Head>
        <title>Jericho Varde — Design & Development</title>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </Head>
      <Preview>{previewText}</Preview>
      <body style={{ backgroundColor: "#F4EDE4" }}>
        <table
          role="presentation"
          width="100%"
          border={0}
          cellSpacing="0"
          cellPadding="0"
        >
          <tbody>
            <tr>
              <td
                align="center"
                className="outer-padding"
                style={{
                  padding: "60px 20px 40px 20px",
                  backgroundColor: "#F4EDE4",
                }}
              >
                <table
                  role="presentation"
                  width="760"
                  border={0}
                  cellSpacing="0"
                  cellPadding="0"
                  className="email-wrapper"
                  style={{ width: "760px", maxWidth: "760px" }}
                >
                  <tbody>
                    {/* BRAND HEADER */}
                    <tr>
                      <td align="center" style={{ padding: "0 0 48px 0" }}>
                        <img
                          src="https://vardz.dev/assets/vardz-logo-white.png"
                          width="110"
                          height="110"
                          alt="JV Logo"
                          style={{
                            width: "110px",
                            height: "110px",
                            margin: "0 auto",
                            display: "block",
                          }}
                        />
                        <div
                          style={{
                            marginTop: "20px",
                            fontFamily: "Arial, Helvetica, sans-serif",
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "6px",
                            textTransform: "uppercase",
                            color: "#0F0E0D",
                            fontWeight: 500,
                          }}
                        >
                          JERICHO VARDE
                        </div>
                        <div
                          style={{
                            marginTop: "8px",
                            fontFamily: "Arial, Helvetica, sans-serif",
                            fontSize: "12px",
                            lineHeight: "18px",
                            letterSpacing: "4px",
                            textTransform: "uppercase",
                            color: "#0F0E0D",
                            fontWeight: 400,
                          }}
                        >
                          DESIGN & DEVELOPMENT
                        </div>
                      </td>
                    </tr>

                    {/* MAIN DARK CARD */}
                    <tr>
                      <td>
                        <table
                          role="presentation"
                          width="100%"
                          border={0}
                          cellSpacing="0"
                          cellPadding="0"
                          className="card"
                          style={{
                            background: "#0F0E0D",
                            borderRadius: "24px",
                            overflow: "hidden",
                          }}
                        >
                          <tbody>
                            {/* INTRO SECTION */}
                            <tr>
                              <td
                                className="card-padding"
                                style={{ padding: "58px 60px 52px 60px" }}
                              >
                                <table
                                  role="presentation"
                                  width="100%"
                                  border={0}
                                  cellSpacing="0"
                                  cellPadding="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td width="62%" valign="top" style={{ paddingRight: "25px" }}>
                                        <div
                                          className="hero-title"
                                          style={{
                                            fontFamily: "Georgia, 'Times New Roman', serif",
                                            fontSize: "44px",
                                            lineHeight: "52px",
                                            fontWeight: 400,
                                            color: "#F4EDE4",
                                            margin: "0 0 24px 0",
                                          }}
                                        >
                                          Hello,
                                        </div>
                                        {isClient ? (
                                          <>
                                            <div
                                              className="intro-text"
                                              style={{
                                                fontFamily: "Arial, Helvetica, sans-serif",
                                                fontSize: "16px",
                                                lineHeight: "26px",
                                                fontWeight: 400,
                                                color: "#F4EDE4",
                                                margin: "0 0 25px 0",
                                              }}
                                            >
                                              Thank you for reaching out. I&apos;m Jericho Varde,
                                              a passionate developer and designer who creates
                                              clean, purposeful digital experiences that blend
                                              creativity with functionality.
                                            </div>
                                            <div
                                              className="intro-text"
                                              style={{
                                                fontFamily: "Arial, Helvetica, sans-serif",
                                                fontSize: "16px",
                                                lineHeight: "26px",
                                                fontWeight: 400,
                                                color: "#F4EDE4",
                                              }}
                                            >
                                              I appreciate your interest in my work and I&apos;d
                                              love to connect.
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <div
                                              className="intro-text"
                                              style={{
                                                fontFamily: "Arial, Helvetica, sans-serif",
                                                fontSize: "16px",
                                                lineHeight: "26px",
                                                fontWeight: 400,
                                                color: "#F4EDE4",
                                                margin: "0 0 25px 0",
                                              }}
                                            >
                                              You have received a new message from your portfolio website.
                                            </div>
                                            <div
                                              style={{
                                                backgroundColor: "rgba(244, 237, 228, 0.05)",
                                                padding: "20px",
                                                borderRadius: "8px",
                                              }}
                                            >
                                              <div style={{ color: "rgba(244, 237, 228, 0.9)", marginBottom: "8px", fontSize: "14px", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                                <strong>From:</strong> {email}
                                              </div>
                                              <div style={{ color: "rgba(244, 237, 228, 0.9)", fontSize: "14px", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                                <strong>Subject:</strong> {subject}
                                              </div>
                                              <div style={{ color: "rgba(244, 237, 228, 0.8)", fontSize: "15px", lineHeight: "1.6", marginTop: "16px", whiteSpace: "pre-wrap", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                                {content}
                                              </div>
                                            </div>
                                          </>
                                        )}
                                      </td>
                                      <td width="38%" valign="middle" align="center">
                                        <img
                                          src="https://vardz.dev/assets/vardz-logo-white.png"
                                          width="220"
                                          alt=""
                                          style={{
                                            width: "220px",
                                            maxWidth: "100%",
                                            opacity: 0.13,
                                          }}
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>

                            {/* DIVIDER */}
                            <tr>
                              <td className="card-padding" style={{ padding: "0 60px" }}>
                                <div style={{ height: "1px", background: "#6B655D", lineHeight: "1px", fontSize: "1px", opacity: 0.7 }}>
                                  &nbsp;
                                </div>
                              </td>
                            </tr>

                            {/* SERVICES */}
                            <tr>
                              <td className="card-padding" style={{ padding: "42px 60px 40px 60px" }}>
                                <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", lineHeight: "18px", letterSpacing: "4px", textTransform: "uppercase", color: "#F4EDE4", marginBottom: "30px" }}>
                                  WHAT I DO
                                </div>
                                <table role="presentation" width="100%" border={0} cellSpacing="0" cellPadding="0">
                                  <tbody>
                                    <tr>
                                      {/* SERVICE 1 */}
                                      <td width="32%" valign="top" className="service-column" style={{ paddingRight: "22px" }}>
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "30px", lineHeight: "34px", color: "#F4EDE4", marginBottom: "22px" }}>
                                          &lt;/&gt;
                                        </div>
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", lineHeight: "18px", letterSpacing: "3px", textTransform: "uppercase", color: "#F4EDE4", marginBottom: "14px" }}>
                                          DEVELOPMENT
                                        </div>
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "15px", lineHeight: "24px", color: "#D9D2C9" }}>
                                          Building fast, scalable, and responsive web applications.
                                        </div>
                                      </td>
                                      {/* DIVIDER */}
                                      <td width="1" className="service-divider" style={{ width: "1px", minWidth: "1px", maxWidth: "1px", background: "#625D56", padding: 0 }}></td>
                                      {/* SERVICE 2 */}
                                      <td width="32%" valign="top" className="service-column" style={{ paddingLeft: "30px", paddingRight: "22px" }}>
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "29px", lineHeight: "34px", color: "#F4EDE4", marginBottom: "22px" }}>
                                          ◇
                                        </div>
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", lineHeight: "18px", letterSpacing: "3px", textTransform: "uppercase", color: "#F4EDE4", marginBottom: "14px" }}>
                                          DESIGN
                                        </div>
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "15px", lineHeight: "24px", color: "#D9D2C9" }}>
                                          Crafting minimal, modern, and user-centered interfaces.
                                        </div>
                                      </td>
                                      {/* DIVIDER */}
                                      <td width="1" className="service-divider" style={{ width: "1px", minWidth: "1px", maxWidth: "1px", background: "#625D56", padding: 0 }}></td>
                                      {/* SERVICE 3 */}
                                      <td width="32%" valign="top" className="service-column" style={{ paddingLeft: "30px" }}>
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "30px", lineHeight: "34px", color: "#F4EDE4", marginBottom: "22px" }}>
                                          ✧
                                        </div>
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", lineHeight: "18px", letterSpacing: "3px", textTransform: "uppercase", color: "#F4EDE4", marginBottom: "14px" }}>
                                          EXPERIENCE
                                        </div>
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "15px", lineHeight: "24px", color: "#D9D2C9" }}>
                                          Bringing ideas to life with attention to detail and performance.
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>

                            {/* DIVIDER */}
                            <tr>
                              <td className="card-padding" style={{ padding: "0 60px" }}>
                                <div style={{ height: "1px", background: "#6B655D", lineHeight: "1px", fontSize: "1px", opacity: 0.7 }}>
                                  &nbsp;
                                </div>
                              </td>
                            </tr>

                            {/* CTA */}
                            <tr>
                              <td className="card-padding" style={{ padding: "42px 60px 48px 60px" }}>
                                <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", lineHeight: "18px", letterSpacing: "4px", textTransform: "uppercase", color: "#F4EDE4", marginBottom: "24px" }}>
                                  LET&apos;S WORK TOGETHER
                                </div>
                                <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "16px", lineHeight: "26px", color: "#F4EDE4", marginBottom: "28px" }}>
                                  I&apos;m always open to new opportunities and exciting projects.
                                </div>
                                <table role="presentation" border={0} cellSpacing="0" cellPadding="0">
                                  <tbody>
                                    <tr>
                                      <td style={{ backgroundColor: "#F4EDE4", borderRadius: "2px" }}>
                                        <a
                                          href={isClient ? "mailto:vardejericho@gmail.com" : `mailto:${email}`}
                                          style={{
                                            display: "inline-block",
                                            padding: "16px 30px",
                                            fontFamily: "Arial, Helvetica, sans-serif",
                                            fontSize: "12px",
                                            lineHeight: "18px",
                                            letterSpacing: "2px",
                                            textTransform: "uppercase",
                                            color: "#0F0E0D",
                                            background: "#F4EDE4",
                                            border: "1px solid #F4EDE4",
                                            textDecoration: "none",
                                          }}
                                        >
                                          {isClient ? "REPLY TO THIS EMAIL" : "REPLY TO CLIENT"}
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>

                            {/* DIVIDER */}
                            <tr>
                              <td className="card-padding" style={{ padding: "0 60px" }}>
                                <div style={{ height: "1px", background: "#6B655D", lineHeight: "1px", fontSize: "1px", opacity: 0.7 }}>
                                  &nbsp;
                                </div>
                              </td>
                            </tr>

                            {/* FOOTER INSIDE CARD */}
                            <tr>
                              <td className="card-padding" style={{ padding: "38px 60px 54px 60px" }}>
                                <table role="presentation" width="100%" border={0} cellSpacing="0" cellPadding="0">
                                  <tbody>
                                    <tr>
                                      {/* SOCIAL */}
                                      <td width="60%" valign="top" className="footer-column">
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", lineHeight: "18px", letterSpacing: "4px", textTransform: "uppercase", color: "#F4EDE4", marginBottom: "24px" }}>
                                          CONNECT
                                        </div>
                                        <table role="presentation" border={0} cellSpacing="0" cellPadding="0">
                                          <tbody>
                                            <tr>
                                              <td style={{ paddingRight: "25px" }}>
                                                <a href="https://linkedin.com/in/jerichovarde" target="_blank" rel="noreferrer" style={{ display: "inline-block" }}>
                                                  <img src="https://img.icons8.com/ios/50/F4EDE4/linkedin.png" width="22" height="22" alt="LinkedIn" style={{ display: "block", border: "none" }} />
                                                </a>
                                              </td>
                                              <td style={{ paddingRight: "25px" }}>
                                                <a href="https://github.com/jerichovarde" target="_blank" rel="noreferrer" style={{ display: "inline-block" }}>
                                                  <img src="https://img.icons8.com/ios/50/F4EDE4/github.png" width="22" height="22" alt="GitHub" style={{ display: "block", border: "none" }} />
                                                </a>
                                              </td>
                                              <td style={{ paddingRight: "25px" }}>
                                                <a href="https://vardz.dev" style={{ display: "inline-block" }}>
                                                  <img src="https://img.icons8.com/ios/50/F4EDE4/dribbble.png" width="22" height="22" alt="Dribbble" style={{ display: "block", border: "none" }} />
                                                </a>
                                              </td>
                                              <td>
                                                <a href="mailto:hello@jerichovarde.dev" style={{ display: "inline-block" }}>
                                                  <img src="https://img.icons8.com/ios/50/F4EDE4/new-post.png" width="22" height="22" alt="Email" style={{ display: "block", border: "none" }} />
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                      {/* CONTACT INFORMATION */}
                                      <td width="40%" valign="top" className="footer-column">
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", lineHeight: "18px", letterSpacing: "4px", textTransform: "uppercase", color: "#F4EDE4", marginBottom: "8px" }}>
                                          EMAIL
                                        </div>
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "15px", lineHeight: "24px", color: "#D9D2C9", marginBottom: "25px" }}>
                                          <a href="mailto:hello@jerichovarde.dev" style={{ color: "#D9D2C9", textDecoration: "none" }}>
                                            hello@jerichovarde.dev
                                          </a>
                                        </div>
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", lineHeight: "18px", letterSpacing: "4px", textTransform: "uppercase", color: "#F4EDE4", marginBottom: "8px" }}>
                                          LOCATION
                                        </div>
                                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "15px", lineHeight: "24px", color: "#D9D2C9" }}>
                                          Philippines
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* OUTSIDE FOOTER */}
                    <tr>
                      <td align="center" style={{ padding: "38px 20px 10px 20px" }}>
                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", lineHeight: "20px", color: "#746D64", marginBottom: "6px" }}>
                          © 2026 Jericho Varde. All rights reserved.
                        </div>
                        <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "12px", lineHeight: "20px", color: "#746D64" }}>
                          You&apos;re receiving this email because you contacted me through my portfolio.
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </Html>
  );
};

export default ContactEmail;
