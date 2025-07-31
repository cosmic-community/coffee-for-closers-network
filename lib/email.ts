import { EmailOptions, EmailTemplate } from '@/types'
import { getWelcomeEmailTemplate, getEmailVerificationTemplate } from './email-templates'

export async function sendEmail(options: EmailOptions): Promise<void> {
  // This is a placeholder implementation
  // In production, you would integrate with your email service (SendGrid, Resend, etc.)
  
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Email would be sent:', {
        to: options.to,
        subject: options.subject,
        preview: options.html.substring(0, 100) + '...'
      })
      return
    }

    // Example integration with a service like Resend
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL || 'noreply@coffeecloser.network',
          to: [options.to],
          subject: options.subject,
          html: options.html,
          text: options.text,
        }),
      })

      if (!response.ok) {
        throw new Error(`Email service error: ${response.statusText}`)
      }
    }
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}

export async function sendWelcomeEmail(
  email: string,
  name: string,
  verificationUrl: string
): Promise<void> {
  const template = getWelcomeEmailTemplate(name, verificationUrl)
  
  await sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text
  })
}

export async function sendVerificationEmail(
  email: string,
  name: string,
  verificationToken: string
): Promise<void> {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${verificationToken}`
  const template = getEmailVerificationTemplate(name, verificationUrl)
  
  await sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text
  })
}