import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Img,
} from "@react-email/components";
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
    ? `Thank you for reaching out to Jericho Varde`
    : `New message from ${email}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <div style={logoContainer}>
              <Img src="https://vardz.dev/assets/vardz-logo-white.png" width="40" height="40" alt="JV Logo" style={logoImage} />
            </div>
            <Heading style={headerTitle}>JERICHO VARDE</Heading>
            <Text style={headerSubtitle}>DESIGN & DEVELOPMENT</Text>
          </Section>

          <Section style={card}>
            <Heading style={greeting}>Hello,</Heading>
            
            {isClient ? (
              <Row>
                <Column style={introTextColumn}>
                  <Text style={paragraph}>
                    Thank you for reaching out. I'm Jericho Varde, a passionate developer and designer who creates clean, purposeful digital experiences that blend creativity with functionality.
                  </Text>
                  <Text style={paragraph}>
                    I appreciate your interest in my work and I'd love to connect. I will review your message and get back to you shortly.
                  </Text>
                </Column>
                <Column style={introLogoColumn}>
                  <Img src="https://vardz.dev/assets/vardz-logo-white.png" width="160" alt="" style={watermarkImage} />
                </Column>
              </Row>
            ) : (
              <Row>
                <Column style={introTextColumn}>
                  <Text style={paragraph}>
                    You have received a new message from your portfolio website.
                  </Text>
                  <div style={messageContainer}>
                    <Text style={messageHeader}><strong>From:</strong> {email}</Text>
                    <Text style={messageHeader}><strong>Subject:</strong> {subject}</Text>
                    <Text style={messageContent}>{content}</Text>
                  </div>
                </Column>
                <Column style={introLogoColumn}>
                  <Img src="https://vardz.dev/assets/vardz-logo-white.png" width="160" alt="" style={watermarkImage} />
                </Column>
              </Row>
            )}

            <Hr style={divider} />

            <Section>
              <Text style={sectionTitle}>WHAT I DO</Text>
              <Row>
                <Column style={column}>
                  <Text style={icon}>{"</>"}</Text>
                  <Text style={columnTitle}>DEVELOPMENT</Text>
                  <Text style={columnText}>
                    Building fast, scalable, and responsive web applications.
                  </Text>
                </Column>
                <Column style={column}>
                  <Text style={icon}>✎</Text>
                  <Text style={columnTitle}>DESIGN</Text>
                  <Text style={columnText}>
                    Crafting minimal, modern, and user-centered interfaces.
                  </Text>
                </Column>
                <Column style={columnLast}>
                  <Text style={icon}>✧</Text>
                  <Text style={columnTitle}>EXPERIENCE</Text>
                  <Text style={columnText}>
                    Bringing ideas to life with attention to detail and performance.
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr style={divider} />

            <Section>
              <Text style={sectionTitle}>LET'S WORK TOGETHER</Text>
              <Text style={paragraph}>
                I'm always open to new opportunities and exciting projects.
              </Text>
              {isClient ? (
                <Link href="mailto:vardejericho@gmail.com" style={button}>
                  REPLY TO THIS EMAIL
                </Link>
              ) : (
                <Link href={`mailto:${email}`} style={button}>
                  REPLY TO CLIENT
                </Link>
              )}
            </Section>

            <Hr style={divider} />

            <Section>
              <Row>
                <Column>
                  <Text style={sectionTitle}>CONNECT</Text>
                  <Row style={socials}>
                    <Column style={socialIcon}><Link href="https://linkedin.com/in/jerichovarde" style={socialLink}>in</Link></Column>
                    <Column style={socialIcon}><Link href="https://github.com/jerichovarde" style={socialLink}>gh</Link></Column>
                    <Column style={socialIcon}><Link href="https://vardz.dev" style={socialLink}>web</Link></Column>
                  </Row>
                </Column>
                <Column style={{ paddingLeft: '20px' }}>
                  <Text style={sectionTitle}>EMAIL</Text>
                  <Text style={footerText}>vardejericho@gmail.com</Text>
                  <Text style={{...sectionTitle, marginTop: '16px'}}>LOCATION</Text>
                  <Text style={footerText}>Philippines</Text>
                </Column>
              </Row>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={footerBottomText}>
              © 2026 Jericho Varde. All rights reserved.<br />
              You're receiving this email because you contacted me through my portfolio.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmail;

const main = {
  backgroundColor: "#F4EDE4",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: "40px 0",
};

const container = {
  margin: "0 auto",
  maxWidth: "600px",
  width: "100%",
};

const header = {
  textAlign: "center" as const,
  marginBottom: "30px",
};

const logoContainer = {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  backgroundColor: "#0F0E0D",
  margin: "0 auto 16px",
  display: "inline-block", // Fix for centering div in email
};

const logoImage = {
  display: "block",
  margin: "12px auto",
};

const introTextColumn = {
  width: "65%",
  verticalAlign: "top",
  paddingRight: "20px",
};

const introLogoColumn = {
  width: "35%",
  verticalAlign: "top",
  textAlign: "right" as const,
};

const watermarkImage = {
  display: "inline-block",
  opacity: 0.15,
  maxWidth: "100%",
};

const headerTitle = {
  fontSize: "18px",
  letterSpacing: "4px",
  margin: "0",
  fontWeight: "600",
  color: "#0F0E0D",
};

const headerSubtitle = {
  fontSize: "12px",
  letterSpacing: "2px",
  margin: "8px 0 0",
  color: "#666",
};

const card = {
  backgroundColor: "#0F0E0D",
  borderRadius: "16px",
  padding: "40px",
  color: "#F4EDE4",
};

const greeting = {
  fontSize: "32px",
  fontWeight: "400",
  fontFamily: "Georgia, serif",
  margin: "0 0 24px",
  color: "#F4EDE4",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "rgba(244, 237, 228, 0.8)",
  margin: "0 0 20px",
};

const messageContainer = {
  backgroundColor: "rgba(244, 237, 228, 0.05)",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
};

const messageHeader = {
  fontSize: "14px",
  margin: "0 0 8px",
  color: "rgba(244, 237, 228, 0.9)",
};

const messageContent = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "rgba(244, 237, 228, 0.8)",
  marginTop: "16px",
  whiteSpace: "pre-wrap",
};

const divider = {
  borderColor: "rgba(244, 237, 228, 0.15)",
  margin: "32px 0",
};

const sectionTitle = {
  fontSize: "11px",
  letterSpacing: "2px",
  color: "rgba(244, 237, 228, 0.5)",
  margin: "0 0 16px",
  fontWeight: "600",
};

const column = {
  width: "33.33%",
  paddingRight: "16px",
  verticalAlign: "top",
};

const columnLast = {
  width: "33.33%",
  verticalAlign: "top",
};

const icon = {
  fontSize: "20px",
  margin: "0 0 12px",
  color: "#F4EDE4",
};

const columnTitle = {
  fontSize: "12px",
  letterSpacing: "1px",
  margin: "0 0 8px",
  color: "#F4EDE4",
  fontWeight: "600",
};

const columnText = {
  fontSize: "13px",
  lineHeight: "1.5",
  color: "rgba(244, 237, 228, 0.6)",
  margin: "0",
};

const button = {
  backgroundColor: "#F4EDE4",
  color: "#0F0E0D",
  padding: "12px 24px",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "1px",
  textDecoration: "none",
  display: "inline-block",
  marginTop: "16px",
};

const socials = {
  width: "100%",
};

const socialIcon = {
  width: "30px",
  paddingRight: "12px",
};

const socialLink = {
  color: "#F4EDE4",
  textDecoration: "none",
  border: "1px solid rgba(244, 237, 228, 0.3)",
  padding: "6px 8px",
  fontSize: "12px",
  display: "inline-block",
};

const footerText = {
  fontSize: "13px",
  color: "rgba(244, 237, 228, 0.8)",
  margin: "0",
};

const footer = {
  textAlign: "center" as const,
  marginTop: "32px",
};

const footerBottomText = {
  fontSize: "11px",
  color: "rgba(15, 14, 13, 0.5)",
  lineHeight: "1.6",
  margin: "0",
};
