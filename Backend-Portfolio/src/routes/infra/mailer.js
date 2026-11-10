import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMail({ nom, email, message }) {
    await resend.emails.send({
        from: 'no-reply@nolhandev.fr',
        to: 'nolhan.marteau@gmail.com',
        subject: `Nouveau message de ${nom} (portfolio)`,
        html: `<p>Message de ${nom} (${email}) :</p><p>${message}</p>`
    });
}