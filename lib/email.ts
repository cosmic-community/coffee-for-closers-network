import { Resend } from 'resend'
import { 
  getWelcomeEmailTemplate, 
  getEmailVerificationTemplate, 
  getOnboardingCompleteTemplate 
} from './email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'Coffee Closer Network <hello@coffeecloser.network>'
const REPLY_TO_EMAIL = 'support@coffeecloser.network'

export async function sendVerificationEmail(
  email: string, 
  name: string, 
  verificationToken: string
): Promise<void> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const verificationUrl = `${baseUrl}/auth/verify-email?token=${verificationToken}`
  
  const template = getWelcomeEmailTemplate(name, verificationUrl)
  
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: REPLY_TO_EMAIL,
      subject: template.subject,
      html: template.html,
      text: template.text,
      tags: [
        { name: 'category', value: 'verification' },
        { name: 'user_type', value: 'new_signup' }
      ]
    })
    
    console.log(`Verification email sent to ${email}`)
  } catch (error) {
    console.error('Failed to send verification email:', error)
    throw new Error('Failed to send verification email')
  }
}

export async function sendEmailVerificationOnly(
  email: string,
  name: string,
  verificationToken: string
): Promise<void> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const verificationUrl = `${baseUrl}/auth/verify-email?token=${verificationToken}`
  
  const template = getEmailVerificationTemplate(name, verificationUrl)
  
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: REPLY_TO_EMAIL,
      subject: template.subject,
      html: template.html,
      text: template.text,
      tags: [
        { name: 'category', value: 'verification' },
        { name: 'user_type', value: 'resend' }
      ]
    })
    
    console.log(`Email verification sent to ${email}`)
  } catch (error) {
    console.error('Failed to send email verification:', error)
    throw new Error('Failed to send email verification')
  }
}

export async function sendOnboardingCompleteEmail(
  email: string,
  name: string
): Promise<void> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const dashboardUrl = `${baseUrl}/dashboard`
  
  const template = getOnboardingCompleteTemplate(name, dashboardUrl)
  
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: REPLY_TO_EMAIL,
      subject: template.subject,
      html: template.html,
      text: template.text,
      tags: [
        { name: 'category', value: 'onboarding' },
        { name: 'user_type', value: 'completed_setup' }
      ]
    })
    
    console.log(`Onboarding complete email sent to ${email}`)
  } catch (error) {
    console.error('Failed to send onboarding complete email:', error)
    // Don't throw here as this is not critical
  }
}

export async function sendWeeklyMatchEmail(
  email: string,
  name: string,
  matches: Array<{
    name: string
    title: string
    company: string
    bio: string
    schedulingLink: string
  }>
): Promise<void> {
  const subject = `Your weekly matches are here, ${name}! ☕`
  
  const matchesHtml = matches.map(match => `
    <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 15px 0;">
      <h3 style="margin: 0 0 10px 0; color: #1f2937;">${match.name}</h3>
      <p style="margin: 0 0 5px 0; color: #6b7280; font-weight: 500;">${match.title} at ${match.company}</p>
      <p style="margin: 0 0 15px 0; color: #4b5563;">${match.bio}</p>
      <a href="${match.schedulingLink}" style="display: inline-block; background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500;">Schedule Coffee Chat</a>
    </div>
  `).join('')
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .container { 
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 40px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1f2937; margin: 0;">☕ Your Weekly Matches</h1>
          <p style="color: #6b7280; margin: 10px 0 0 0;">New connections waiting for you, ${name}!</p>
        </div>
        
        <p>Hi ${name},</p>
        
        <p>Great news! We've found some fantastic sales professionals for you to connect with this week.</p>
        
        ${matchesHtml}
        
        <div style="background: #f0f9ff; border-radius: 6px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #0369a1; margin: 0 0 10px 0;">💡 Coffee Chat Tips</h3>
          <ul style="margin: 0; color: #0c4a6e;">
            <li>Keep it to 15 minutes - respect everyone's time</li>
            <li>Come prepared with 2-3 questions</li>
            <li>Share a recent win or challenge</li>
            <li>Follow up with a LinkedIn connection</li>
          </ul>
        </div>
        
        <p>Remember, these chats are all about building genuine connections and learning from each other. Have fun!</p>
        
        <p>Happy networking!</p>
        
        <p>Cheers,<br>
        The Coffee Closer Network Team</p>
      </div>
    </body>
    </html>
  `
  
  const text = `
    Your Weekly Matches - Coffee Closer Network
    
    Hi ${name},
    
    Great news! We've found some fantastic sales professionals for you to connect with this week.
    
    ${matches.map(match => `
    ${match.name}
    ${match.title} at ${match.company}
    ${match.bio}
    Schedule: ${match.schedulingLink}
    
    `).join('')}
    
    Coffee Chat Tips:
    - Keep it to 15 minutes - respect everyone's time
    - Come prepared with 2-3 questions  
    - Share a recent win or challenge
    - Follow up with a LinkedIn connection
    
    Happy networking!
    
    Cheers,
    The Coffee Closer Network Team
  `
  
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: REPLY_TO_EMAIL,
      subject,
      html,
      text,
      tags: [
        { name: 'category', value: 'weekly_matches' },
        { name: 'match_count', value: matches.length.toString() }
      ]
    })
  } catch (error) {
    console.error('Failed to send weekly match email:', error)
    throw new Error('Failed to send weekly match email')
  }
}