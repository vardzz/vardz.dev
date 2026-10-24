export function renderModerationEmail({
  name,
  title,
  message,
  approvalToken,
  siteUrl,
}: {
  name: string;
  title: string;
  message: string;
  approvalToken: string;
  siteUrl: string;
}): string {
  const approveUrl = `${siteUrl}/api/recommendations/moderate?token=${approvalToken}&action=approve`;
  const rejectUrl = `${siteUrl}/api/recommendations/moderate?token=${approvalToken}&action=reject`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Recommendation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0F0E0D; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F4EDE4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0F0E0D; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #161514; border: 1px solid rgba(244, 237, 228, 0.15); border-radius: 16px; overflow: hidden; padding: 32px;">
          <!-- Header -->
          <tr>
            <td style="padding-bottom: 24px; border-bottom: 1px solid rgba(244, 237, 228, 0.1);">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(244, 237, 228, 0.5); font-family: 'SFMono-Regular', Consolas, monospace; margin-bottom: 6px;">
                vardz.dev • Moderation
              </div>
              <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #F4EDE4; letter-spacing: -0.02em;">
                New Recommendation Submitted
              </h1>
            </td>
          </tr>

          <!-- Recommendation Preview Card -->
          <tr>
            <td style="padding: 24px 0;">
              <div style="background-color: rgba(244, 237, 228, 0.03); border: 1px solid rgba(244, 237, 228, 0.12); border-radius: 12px; padding: 24px;">
                <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: rgba(244, 237, 228, 0.85); font-style: italic;">
                  "${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}"
                </p>

                <div style="border-top: 1px solid rgba(244, 237, 228, 0.1); padding-top: 14px;">
                  <div style="font-size: 14px; font-weight: 600; color: #F4EDE4;">
                    ${name.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                  </div>
                  <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(244, 237, 228, 0.5); font-family: 'SFMono-Regular', Consolas, monospace; margin-top: 3px;">
                    ${title.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Action Buttons -->
          <tr>
            <td style="padding-top: 8px; padding-bottom: 16px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-right: 8px;">
                    <a href="${approveUrl}" style="display: block; background-color: #F4EDE4; color: #0F0E0D; font-weight: 600; font-size: 14px; text-align: center; text-decoration: none; padding: 14px 24px; border-radius: 10px; font-family: 'SFMono-Regular', Consolas, monospace;">
                      ✓ Approve & Publish
                    </a>
                  </td>
                  <td align="center" style="padding-left: 8px;">
                    <a href="${rejectUrl}" style="display: block; background-color: transparent; border: 1px solid rgba(244, 237, 228, 0.25); color: rgba(244, 237, 228, 0.7); font-weight: 500; font-size: 14px; text-align: center; text-decoration: none; padding: 13px 24px; border-radius: 10px; font-family: 'SFMono-Regular', Consolas, monospace;">
                      ✕ Decline
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 16px; border-top: 1px solid rgba(244, 237, 228, 0.08); text-align: center;">
              <p style="margin: 0; font-size: 11px; color: rgba(244, 237, 228, 0.4); font-family: 'SFMono-Regular', Consolas, monospace;">
                Clicking either button will securely update the status in your Supabase database.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
