import nodemailer from 'nodemailer'
import { User, CoffeeChat, AdminSettings } from '@/types'
import { formatDate } from '@/lib/utils'

// Initialize email transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendWelcomeEmail(
  user: User,
  settings: AdminSettings
): Promise<void> {
  if (!settings.metadata.welcome_email_enabled) {
    return
  }

  const experienceValue = typeof user.metadata.years_experience === 'string' 
    ? user.metadata.years_experience 
    : user.metadata.years_experience?.value || 'Not specified'

  const emailContent = {
    from: settings.metadata.contact_email || process.env.SMTP_USER,
    to: user.metadata.email,
    subject: `Welcome to ${settings.metadata.site_title}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6;">Welcome to ${settings.metadata.site_title}!</h1>
        
        <p>Hi ${user.metadata.full_name},</p>
        
        <p>Welcome to the ${settings.metadata.site_title} community! We're excited to have you join our network of SaaS and software sales professionals.</p>
        
        <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
          <h3 style="color: #374151; margin-top: 0;">Your Profile</h3>
          <p style="color: #6b7280; margin-bottom: 0;">
            <strong>Name:</strong> ${user.metadata.full_name}<br>
            <strong>Job Title:</strong> ${user.metadata.job_title}<br>
            <strong>Company:</strong> ${user.metadata.company}<br>
            <strong>Experience:</strong> ${experienceValue}
          </p>
        </div>
        
        <p style="color: #6b7280;">
          Best regards,<br>
          The ${settings.metadata.site_title} Team
        </p>
      </div>
    `
  }

  try {
    await transporter.sendMail(emailContent)
    console.log('Welcome email sent successfully to:', user.metadata.email)
  } catch (error) {
    console.error('Error sending welcome email:', error)
    throw new Error('Failed to send welcome email')
  }
}

export async function sendMatchNotificationEmail(
  chat: CoffeeChat,
  recipient: User,
  otherParticipant: User,
  settings: AdminSettings
): Promise<void> {
  if (!settings.metadata.match_notification_enabled) {
    return
  }

  const meetingLink = chat.metadata.meeting_link || settings.metadata.calendly_url

  const emailContent = {
    from: settings.metadata.contact_email || process.env.SMTP_USER,
    to: recipient.metadata.email,
    subject: `New Coffee Chat Match - ${otherParticipant.metadata.full_name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6;">You've Got a New Coffee Chat Match! ☕</h1>
        
        <p>Hi ${recipient.metadata.full_name},</p>
        
        <p>Great news! You've been matched with <strong>${otherParticipant.metadata.full_name}</strong> for a 15-minute coffee chat.</p>
        
        <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
          <h3 style="color: #374151; margin-top: 0;">Match Details</h3>
          <p style="color: #6b7280; margin-bottom: 0;">
            <strong>Your Match:</strong> ${otherParticipant.metadata.full_name}<br>
            <strong>Job Title:</strong> ${otherParticipant.metadata.job_title}<br>
            <strong>Company:</strong> ${otherParticipant.metadata.company}<br>
            <strong>Scheduled Date:</strong> ${formatDate(chat.metadata.scheduled_date)}
          </p>
        </div>
        
        ${meetingLink ? `
          <div style="margin: 30px 0; text-align: center;">
            <a href="${meetingLink}" 
               style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Schedule Your Meeting
            </a>
          </div>
        ` : ''}
        
        <p style="color: #6b7280;">
          Happy networking!<br>
          The ${settings.metadata.site_title} Team
        </p>
      </div>
    `
  }

  try {
    await transporter.sendMail(emailContent)
    console.log('Match notification email sent successfully to:', recipient.metadata.email)
  } catch (error) {
    console.error('Error sending match notification email:', error)
    throw new Error('Failed to send match notification email')
  }
}