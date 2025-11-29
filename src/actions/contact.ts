'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import { env, hasSmtpConfig } from '@/lib/env';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  subject: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères'),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères'),
});

export type ContactState = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof z.infer<typeof contactSchema>]?: string[];
  };
};

export async function sendContactEmail(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Simulate delay for better UX
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Veuillez corriger les erreurs dans le formulaire.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, phone, subject, message } = validatedFields.data;

  // Check if SMTP configuration is present
  if (!hasSmtpConfig) {
    console.warn('SMTP configuration missing. Logging email instead.');
    console.log('Email content:', { name, email, phone, subject, message });

    // In development or without config, we'll return success but log a warning
    // This allows the user to see the UI success state even without email config
    return {
      success: true,
      message: 'Message reçu (Mode simulation - Config SMTP manquante)',
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    // Verify connection configuration
    await transporter.verify();

    const mailOptions = {
      from: `"${name}" <${env.SMTP_USER}>`, // Sender address
      to: env.CONTACT_EMAIL || env.SMTP_USER, // List of receivers
      replyTo: email,
      subject: `[Contact Site] ${subject}`, // Subject line
      text: `
        Nouveau message de contact

        Nom: ${name}
        Email: ${email}
        Téléphone: ${phone}
        Sujet: ${subject}

        Message:
        ${message}
      `, // plain text body
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nouveau message de contact</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Téléphone:</strong> ${phone}</p>
            <p><strong>Sujet:</strong> ${subject}</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `, // html body
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: 'Votre message a été envoyé avec succès !',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message:
        "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.",
    };
  }
}
