import { EmailOptions, EmailTemplate } from '@/types'

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Implementation would depend on your email service provider
    // This is a placeholder for the actual email sending logic
    console.log('Sending email:', options)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

export function createWelcomeEmailTemplate(userName: string): EmailTemplate {
  return {
    subject: 'Welcome to Coffee for Closers!',
    html: `
      <h1>Welcome ${userName}!</h1>
      <p>Thank you for joining Coffee for Closers, the network for SaaS and software sales professionals.</p>
      <p>Get ready to connect with fellow sales professionals through 15-minute virtual coffee chats!</p>
    `,
    text: `Welcome ${userName}! Thank you for joining Coffee for Closers, the network for SaaS and software sales professionals.`
  }
}

export function createPasswordResetEmailTemplate(resetUrl: string): EmailTemplate {
  return {
    subject: 'Reset Your Password - Coffee for Closers',
    html: `
      <h1>Reset Your Password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
    `,
    text: `Reset your password by clicking this link: ${resetUrl}. This link will expire in 1 hour.`
  }
}