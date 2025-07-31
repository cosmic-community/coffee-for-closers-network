import nodemailer from 'nodemailer'

export interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export interface EmailMessage {
  to: string | string[]
  subject: string
  text?: string
  html?: string
  from?: string
  cc?: string | string[]
  bcc?: string | string[]
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
}

export interface EmailTemplate {
  subject: string
  html: string
  text?: string
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null
  private fromAddress: string

  constructor() {
    this.fromAddress = process.env.EMAIL_FROM || 'noreply@coffeeforclosers.com'
    this.initializeTransporter()
  }

  private initializeTransporter(): void {
    const config: EmailConfig = {
      host: process.env.EMAIL_HOST || 'localhost',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
      },
    }

    try {
      this.transporter = nodemailer.createTransporter(config)
    } catch (error) {
      console.error('Failed to initialize email transporter:', error)
    }
  }

  async sendEmail(message: EmailMessage): Promise<boolean> {
    if (!this.transporter) {
      console.error('Email transporter not initialized')
      return false
    }

    try {
      const result = await this.transporter.sendMail({
        ...message,
        from: message.from || this.fromAddress,
      })

      console.log('Email sent successfully:', result.messageId)
      return true
    } catch (error) {
      console.error('Failed to send email:', error)
      return false
    }
  }

  async sendWelcomeEmail(
    userEmail: string,
    userName: string
  ): Promise<boolean> {
    const template = this.getWelcomeEmailTemplate(userName)
    
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
  }

  async sendPasswordResetEmail(
    userEmail: string,
    resetToken: string
  ): Promise<boolean> {
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`
    const template = this.getPasswordResetTemplate(resetUrl)
    
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
  }

  async sendMatchNotificationEmail(
    userEmail: string,
    userName: string,
    matchName: string,
    meetingLink: string
  ): Promise<boolean> {
    const template = this.getMatchNotificationTemplate(userName, matchName, meetingLink)
    
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
  }

  private getWelcomeEmailTemplate(userName: string): EmailTemplate {
    return {
      subject: 'Welcome to Coffee for Closers! ☕',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Welcome to Coffee for Closers, ${userName}! ☕</h1>
          <p>We're excited to have you join our community of sales professionals.</p>
          <p>Here's what you can do next:</p>
          <ul>
            <li>Complete your profile to get better matches</li>
            <li>Browse the community feed for tips and insights</li>
            <li>Get matched for virtual coffee chats with other members</li>
          </ul>
          <p>Happy networking!</p>
          <p>The Coffee for Closers Team</p>
        </div>
      `,
      text: `Welcome to Coffee for Closers, ${userName}! We're excited to have you join our community.`,
    }
  }

  private getPasswordResetTemplate(resetUrl: string): EmailTemplate {
    return {
      subject: 'Reset Your Password - Coffee for Closers',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Reset Your Password</h1>
          <p>You requested a password reset for your Coffee for Closers account.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
      text: `Reset your password: ${resetUrl}`,
    }
  }

  private getMatchNotificationTemplate(
    userName: string,
    matchName: string,
    meetingLink: string
  ): EmailTemplate {
    return {
      subject: `You've been matched with ${matchName}! ☕`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>New Coffee Chat Match! ☕</h1>
          <p>Hi ${userName},</p>
          <p>Great news! You've been matched with ${matchName} for a virtual coffee chat.</p>
          <p>Join your meeting:</p>
          <a href="${meetingLink}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Join Coffee Chat</a>
          <p>Have a great conversation!</p>
          <p>The Coffee for Closers Team</p>
        </div>
      `,
      text: `You've been matched with ${matchName}! Join your meeting: ${meetingLink}`,
    }
  }

  async testConnection(): Promise<boolean> {
    if (!this.transporter) {
      return false
    }

    try {
      await this.transporter.verify()
      return true
    } catch (error) {
      console.error('Email connection test failed:', error)
      return false
    }
  }
}

// Create and export singleton instance
export const emailService = new EmailService()

// Export individual functions for convenience
export const sendEmail = (message: EmailMessage) => emailService.sendEmail(message)
export const sendWelcomeEmail = (email: string, name: string) => 
  emailService.sendWelcomeEmail(email, name)
export const sendPasswordResetEmail = (email: string, token: string) => 
  emailService.sendPasswordResetEmail(email, token)
export const sendMatchNotificationEmail = (
  email: string, 
  name: string, 
  matchName: string, 
  meetingLink: string
) => emailService.sendMatchNotificationEmail(email, name, matchName, meetingLink)