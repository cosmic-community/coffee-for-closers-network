import nodemailer from 'nodemailer'
import { User, CoffeeChat, AdminSettings } from '@/types'
import { formatDate, formatTime } from '@/lib/utils'

// Initialize email transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
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

  const emailContent = {
    from: settings.metadata.contact_email || process.env.SMTP_USER,
    to: user.metadata.email,
    subject: `Welcome to ${settings.metadata.site_title}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6;">Welcome to ${settings.metadata.site_title}!</h1>
        
        <p>Hi ${user.metadata.full_name},</p>
        
        <p>Welcome to the ${settings.metadata.site_title} community! We're excited to have you join our network of SaaS and software sales professionals.</p>
        
        <h2 style="color: #374151;">What's Next?</h2>
        
        <ul style="color: #6b7280;">
          <li>Complete your profile with your availability and preferences</li>
          <li>Get matched with fellow sales professionals for coffee chats</li>
          <li>Participate in our community feed by sharing tips and insights</li>
          <li>Attend virtual coffee chats to build your network</li>
        </ul>
        
        <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
          <h3 style="color: #374151; margin-top: 0;">Your Profile</h3>
          <p style="color: #6b7280; margin-bottom: 0;">
            <strong>Name:</strong> ${user.metadata.full_name}<br>
            <strong>Job Title:</strong> ${user.metadata.job_title}<br>
            <strong>Company:</strong> ${user.metadata.company}<br>
            <strong>Experience:</strong> ${user.metadata.years_experience?.value || 'Not specified'}
          </p>
        </div>
        
        <p style="color: #6b7280;">
          If you have any questions or need assistance, feel free to reach out to us at 
          <a href="mailto:${settings.metadata.contact_email}" style="color: #3b82f6;">
            ${settings.metadata.contact_email}
          </a>
        </p>
        
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

  const chatDate = new Date(chat.metadata.scheduled_date)
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
            <strong>Experience:</strong> ${otherParticipant.metadata.years_experience?.value || 'Not specified'}<br>
            <strong>Scheduled Date:</strong> ${formatDate(chat.metadata.scheduled_date)}
          </p>
        </div>
        
        ${otherParticipant.metadata.bio ? `
          <div style="margin: 20px 0; padding: 15px; background-color: #eff6ff; border-radius: 8px;">
            <h4 style="color: #1e40af; margin-top: 0;">About ${otherParticipant.metadata.full_name}</h4>
            <p style="color: #374151; margin-bottom: 0;">${otherParticipant.metadata.bio}</p>
          </div>
        ` : ''}
        
        <div style="margin: 30px 0; text-align: center;">
          ${meetingLink ? `
            <a href="${meetingLink}" 
               style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Schedule Your Meeting
            </a>
          ` : ''}
        </div>
        
        <h3 style="color: #374151;">Coffee Chat Tips:</h3>
        <ul style="color: #6b7280;">
          <li>Keep it casual and friendly</li>
          <li>Share your current challenges and wins</li>
          <li>Ask about their experience and insights</li>
          <li>Exchange contact information for future collaboration</li>
          <li>Have fun and build authentic connections!</li>
        </ul>
        
        <p style="color: #6b7280;">
          If you need to reschedule or have any questions, please reach out to us at 
          <a href="mailto:${settings.metadata.contact_email}" style="color: #3b82f6;">
            ${settings.metadata.contact_email}
          </a>
        </p>
        
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

export async function sendChatReminderEmail(
  chat: CoffeeChat,
  recipient: User,
  otherParticipant: User,
  settings: AdminSettings
): Promise<void> {
  const chatDate = new Date(chat.metadata.scheduled_date)
  const meetingLink = chat.metadata.meeting_link || settings.metadata.calendly_url

  const emailContent = {
    from: settings.metadata.contact_email || process.env.SMTP_USER,
    to: recipient.metadata.email,
    subject: `Reminder: Coffee Chat Tomorrow with ${otherParticipant.metadata.full_name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6;">Coffee Chat Reminder ☕</h1>
        
        <p>Hi ${recipient.metadata.full_name},</p>
        
        <p>This is a friendly reminder that you have a coffee chat scheduled for tomorrow with <strong>${otherParticipant.metadata.full_name}</strong>.</p>
        
        <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
          <h3 style="color: #374151; margin-top: 0;">Chat Details</h3>
          <p style="color: #6b7280; margin-bottom: 0;">
            <strong>Date:</strong> ${formatDate(chat.metadata.scheduled_date)}<br>
            <strong>With:</strong> ${otherParticipant.metadata.full_name}<br>
            <strong>Their Role:</strong> ${otherParticipant.metadata.job_title} at ${otherParticipant.metadata.company}
          </p>
        </div>
        
        ${meetingLink ? `
          <div style="margin: 30px 0; text-align: center;">
            <a href="${meetingLink}" 
               style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Join Meeting
            </a>
          </div>
        ` : ''}
        
        <p style="color: #6b7280;">
          Looking forward to hearing about your conversation! Don't forget to share any insights or tips with the community afterward.
        </p>
        
        <p style="color: #6b7280;">
          Best regards,<br>
          The ${settings.metadata.site_title} Team
        </p>
      </div>
    `
  }

  try {
    await transporter.sendMail(emailContent)
    console.log('Chat reminder email sent successfully to:', recipient.metadata.email)
  } catch (error) {
    console.error('Error sending chat reminder email:', error)
    throw new Error('Failed to send chat reminder email')
  }
}

export async function sendChatFeedbackEmail(
  chat: CoffeeChat,
  recipient: User,
  settings: AdminSettings
): Promise<void> {
  const otherParticipant = chat.metadata.participant_1.id === recipient.id 
    ? chat.metadata.participant_2 
    : chat.metadata.participant_1

  const emailContent = {
    from: settings.metadata.contact_email || process.env.SMTP_USER,
    to: recipient.metadata.email,
    subject: `How was your coffee chat with ${otherParticipant.metadata.full_name}?`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6;">How was your coffee chat? ☕</h1>
        
        <p>Hi ${recipient.metadata.full_name},</p>
        
        <p>We hope you had a great coffee chat with <strong>${otherParticipant.metadata.full_name}</strong>!</p>
        
        <p style="color: #6b7280;">
          We'd love to hear how it went. Your feedback helps us improve the matching process and create better connections for everyone.
        </p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard/feedback?chat=${chat.id}" 
             style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Share Your Feedback
          </a>
        </div>
        
        <p style="color: #6b7280;">
          Consider sharing any insights or tips you learned during your chat with the community. Your experience could help other sales professionals!
        </p>
        
        <p style="color: #6b7280;">
          Thank you for being part of the ${settings.metadata.site_title} community!
        </p>
        
        <p style="color: #6b7280;">
          Best regards,<br>
          The ${settings.metadata.site_title} Team
        </p>
      </div>
    `
  }

  try {
    await transporter.sendMail(emailContent)
    console.log('Chat feedback email sent successfully to:', recipient.metadata.email)
  } catch (error) {
    console.error('Error sending chat feedback email:', error)
    throw new Error('Failed to send chat feedback email')
  }
}

export async function sendAdminNotificationEmail(
  type: 'new_user' | 'new_post' | 'chat_feedback',
  data: any,
  settings: AdminSettings
): Promise<void> {
  const adminEmail = settings.metadata.contact_email
  if (!adminEmail) {
    return
  }

  let subject = ''
  let content = ''

  switch (type) {
    case 'new_user':
      subject = `New User Registration - ${data.metadata.full_name}`
      content = `
        <h2>New User Registration</h2>
        <p>A new user has joined the community:</p>
        <ul>
          <li><strong>Name:</strong> ${data.metadata.full_name}</li>
          <li><strong>Email:</strong> ${data.metadata.email}</li>
          <li><strong>Job Title:</strong> ${data.metadata.job_title}</li>
          <li><strong>Company:</strong> ${data.metadata.company}</li>
          <li><strong>Experience:</strong> ${data.metadata.years_experience?.value || 'Not specified'}</li>
        </ul>
      `
      break
    case 'new_post':
      subject = `New Community Post - ${data.metadata.author.metadata.full_name}`
      content = `
        <h2>New Community Post</h2>
        <p>A new post has been shared in the community:</p>
        <ul>
          <li><strong>Author:</strong> ${data.metadata.author.metadata.full_name}</li>
          <li><strong>Post Type:</strong> ${data.metadata.post_type?.value || 'General'}</li>
          <li><strong>Content:</strong> ${data.metadata.content}</li>
        </ul>
      `
      break
    case 'chat_feedback':
      subject = `Chat Feedback Received`
      content = `
        <h2>Chat Feedback Received</h2>
        <p>Feedback has been received for a coffee chat:</p>
        <ul>
          <li><strong>Chat:</strong> ${data.metadata.chat_title}</li>
          <li><strong>Rating:</strong> ${data.metadata.rating?.value || 'No rating'}</li>
          <li><strong>Feedback:</strong> ${data.feedback}</li>
        </ul>
      `
      break
  }

  const emailContent = {
    from: adminEmail,
    to: adminEmail,
    subject: `[${settings.metadata.site_title}] ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6;">${settings.metadata.site_title} - Admin Notification</h1>
        ${content}
        <p style="color: #6b7280; margin-top: 30px;">
          This is an automated notification from the ${settings.metadata.site_title} admin system.
        </p>
      </div>
    `
  }

  try {
    await transporter.sendMail(emailContent)
    console.log(`Admin notification email sent successfully: ${type}`)
  } catch (error) {
    console.error('Error sending admin notification email:', error)
    // Don't throw error for admin notifications to avoid breaking user flows
  }
}