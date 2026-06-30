// Email HTML templates — inline CSS only, since most email clients
// (Gmail, Outlook) strip <style> blocks or ignore external/embedded CSS.
// Tables are used for layout because Gmail's rendering engine is old-school
// and flexbox/grid is unreliable across clients.

const baseWrapper = (innerContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          ${innerContent}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const sendVerificationEmailTemplate = (url) => baseWrapper(`
  <tr>
    <td style="background-color:#4F46E5; padding: 32px 40px; text-align:center;">
      <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:600; letter-spacing:-0.3px;">
        Verify your email
      </h1>
    </td>
  </tr>
  <tr>
    <td style="padding: 36px 40px 24px 40px;">
      <p style="margin:0 0 16px 0; color:#1f2937; font-size:16px; line-height:1.5;">
        Welcome 👋
      </p>
      <p style="margin:0 0 28px 0; color:#4b5563; font-size:15px; line-height:1.6;">
        Thanks for signing up. Please confirm your email address by clicking the button below — this link will expire shortly for your security.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr>
          <td style="border-radius:8px; background-color:#4F46E5;">
            <a href="${url}" target="_blank"
               style="display:inline-block; padding: 14px 32px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:8px;">
              Verify Email Address
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding: 0 40px 32px 40px;">
      <p style="margin:0; color:#9ca3af; font-size:13px; line-height:1.6;">
        If the button doesn't work, copy and paste this link into your browser:
      </p>
      <p style="margin:8px 0 0 0; word-break:break-all;">
        <a href="${url}" style="color:#4F46E5; font-size:13px;">${url}</a>
      </p>
    </td>
  </tr>
  <tr>
    <td style="background-color:#f9fafb; padding: 20px 40px; text-align:center; border-top:1px solid #f0f0f0;">
      <p style="margin:0; color:#9ca3af; font-size:12px;">
        If you didn't create an account, you can safely ignore this email.
      </p>
    </td>
  </tr>
`);

const sendResetPasswordEmailTemplate = (url) => baseWrapper(`
  <tr>
    <td style="background-color:#DC2626; padding: 32px 40px; text-align:center;">
      <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:600; letter-spacing:-0.3px;">
        Reset your password
      </h1>
    </td>
  </tr>
  <tr>
    <td style="padding: 36px 40px 24px 40px;">
      <p style="margin:0 0 28px 0; color:#4b5563; font-size:15px; line-height:1.6;">
        We received a request to reset your password. Click the button below to choose a new one. This link expires in <strong>15 minutes</strong>.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr>
          <td style="border-radius:8px; background-color:#DC2626;">
            <a href="${url}" target="_blank"
               style="display:inline-block; padding: 14px 32px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:8px;">
              Reset Password
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding: 0 40px 32px 40px;">
      <p style="margin:0; color:#9ca3af; font-size:13px; line-height:1.6;">
        If you didn't request this, you can safely ignore this email — your password will remain unchanged.
      </p>
    </td>
  </tr>
`);

export { sendVerificationEmailTemplate, sendResetPasswordEmailTemplate };