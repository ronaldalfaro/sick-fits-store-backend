import { createTransport, getTestMessageUrl } from 'nodemailer';

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string): string {
  return `
        <div style "
            border: 1px solid black;
            padding:20px;
            font-family: sans-serif;
            line-height: 2;
            font-size: 20px
        ">
            <h2>Hello there!</h2>
            <p>${text}</p>
            <p>SICK FITS</p>
        </div>
    `;
}

interface MailResponse {
  message: string;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = (await transporter.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your password reset token',
    html: makeANiceEmail(`Your password reset token is here! 
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
`),
  })) as MailResponse;
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
