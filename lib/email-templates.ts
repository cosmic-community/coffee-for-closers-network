export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export function getWelcomeEmailTemplate(name: string, verificationUrl: string): EmailTemplate {
  const subject = `Welcome to Coffee Closer Network, ${name}! Please verify your email`
  
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
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .header p {
          margin: 10px 0 0 0;
          opacity: 0.9;
          font-size: 16px;
        }
        .content {
          padding: 40px 30px;
        }
        .button {
          display: inline-block;
          background: #3b82f6;
          color: white;
          padding: 16px 32px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          margin: 20px 0;
        }
        .button:hover {
          background: #2563eb;
        }
        .stats {
          display: flex;
          justify-content: space-around;
          text-align: center;
          margin: 30px 0;
          padding: 20px;
          background: #f8fafc;
          border-radius: 6px;
        }
        .stat {
          flex: 1;
        }
        .stat-number {
          font-size: 24px;
          font-weight: bold;
          color: #3b82f6;
        }
        .stat-label {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .footer {
          padding: 20px 30px;
          background: #f8fafc;
          border-top: 1px solid #e5e7eb;
          font-size: 14px;
          color: #6b7280;
          text-align: center;
        }
        .footer a {
          color: #3b82f6;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>☕ Welcome to Coffee Closer Network!</h1>
          <p>You're about to join an amazing community of sales professionals</p>
        </div>
        
        <div class="content">
          <h2>Hi ${name}!</h2>
          
          <p>Thanks for joining Coffee Closer Network! We're excited to have you as part of our growing community of SaaS and software sales professionals.</p>
          
          <p><strong>Before we get started, please verify your email address:</strong></p>
          
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>
          
          <p>Once verified, you'll be able to:</p>
          <ul>
            <li>🤝 Get matched with fellow sales professionals every week</li>
            <li>☕ Schedule 15-minute virtual coffee chats</li>
            <li>💬 Share wins and insights in our community feed</li>
            <li>📈 Learn from experienced sellers and grow your career</li>
          </ul>
          
          <div class="stats">
            <div class="stat">
              <div class="stat-number">500+</div>
              <div class="stat-label">Active Members</div>
            </div>
            <div class="stat">
              <div class="stat-number">1,200+</div>
              <div class="stat-label">Coffee Chats</div>
            </div>
            <div class="stat">
              <div class="stat-number">95%</div>
              <div class="stat-label">Satisfaction</div>
            </div>
          </div>
          
          <p>If you have any questions, just reply to this email. We're here to help!</p>
          
          <p>Cheers,<br>
          The Coffee Closer Network Team</p>
        </div>
        
        <div class="footer">
          <p>This email was sent to ${name} because you signed up for Coffee Closer Network.</p>
          <p>If you didn't sign up, you can safely ignore this email.</p>
          <p><a href="mailto:support@coffeecloser.network">Contact Support</a> | <a href="https://coffeecloser.network">Visit Website</a></p>
        </div>
      </div>
    </body>
    </html>
  `
  
  const text = `
    Welcome to Coffee Closer Network, ${name}!
    
    Thanks for joining our community of SaaS and software sales professionals.
    
    Please verify your email address by visiting: ${verificationUrl}
    
    Once verified, you'll be able to:
    - Get matched with fellow sales professionals every week
    - Schedule 15-minute virtual coffee chats  
    - Share wins and insights in our community feed
    - Learn from experienced sellers and grow your career
    
    Our community stats:
    - 500+ Active Members
    - 1,200+ Coffee Chats Completed
    - 95% Member Satisfaction
    
    If you have any questions, just reply to this email.
    
    Cheers,
    The Coffee Closer Network Team
    
    ---
    This email was sent because you signed up for Coffee Closer Network.
    If you didn't sign up, you can safely ignore this email.
  `

  return { subject, html, text }
}

export function getEmailVerificationTemplate(name: string, verificationUrl: string): EmailTemplate {
  const subject = 'Please verify your email address - Coffee Closer Network'
  
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
          text-align: center;
        }
        .icon {
          width: 64px;
          height: 64px;
          background: #dbeafe;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 28px;
        }
        .button {
          display: inline-block;
          background: #3b82f6;
          color: white;
          padding: 16px 32px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 14px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">📧</div>
        
        <h1>Verify Your Email</h1>
        
        <p>Hi ${name},</p>
        
        <p>Thanks for signing up! Please verify your email address to complete your Coffee Closer Network registration.</p>
        
        <a href="${verificationUrl}" class="button">Verify Email</a>
        
        <p>This link will expire in 24 hours for security reasons.</p>
        
        <p>If you didn't sign up for Coffee Closer Network, you can safely ignore this email.</p>
        
        <div class="footer">
          <p>Need help? Contact us at support@coffeecloser.network</p>
        </div>
      </div>
    </body>
    </html>
  `
  
  const text = `
    Verify Your Email - Coffee Closer Network
    
    Hi ${name},
    
    Thanks for signing up! Please verify your email address to complete your registration.
    
    Verify your email: ${verificationUrl}
    
    This link will expire in 24 hours for security reasons.
    
    If you didn't sign up for Coffee Closer Network, you can safely ignore this email.
    
    Need help? Contact us at support@coffeecloser.network
  `

  return { subject, html, text }
}

export function getOnboardingCompleteTemplate(name: string, dashboardUrl: string): EmailTemplate {
  const subject = `You're all set, ${name}! Welcome to Coffee Closer Network`
  
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
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .success-icon {
          width: 64px;
          height: 64px;
          background: #dcfce7;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 28px;
        }
        .button {
          display: inline-block;
          background: #3b82f6;
          color: white;
          padding: 16px 32px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          margin: 20px auto;
          display: block;
          max-width: 200px;
        }
        .next-steps {
          background: #f8fafc;
          border-radius: 6px;
          padding: 20px;
          margin: 20px 0;
        }
        .step {
          display: flex;
          align-items: start;
          margin-bottom: 15px;
        }
        .step-icon {
          width: 24px;
          height: 24px;
          background: #3b82f6;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          margin-right: 15px;
          flex-shrink: 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="success-icon">✅</div>
          <h1>Welcome to the Network!</h1>
          <p>Your profile is complete and you're ready to start connecting</p>
        </div>
        
        <p>Hi ${name},</p>
        
        <p>Congratulations! You've successfully completed your Coffee Closer Network setup. You're now part of a community of 500+ sales professionals who are passionate about helping each other succeed.</p>
        
        <div class="next-steps">
          <h3>What happens next?</h3>
          
          <div class="step">
            <div class="step-icon">1</div>
            <div>
              <strong>Monday Matching</strong><br>
              Every Monday morning, we'll match you with 1-2 sales professionals based on your preferences and availability.
            </div>
          </div>
          
          <div class="step">
            <div class="step-icon">2</div>
            <div>
              <strong>Schedule Your Chat</strong><br>
              You'll receive an email with your match details and can easily schedule a 15-minute coffee chat at a time that works for both of you.
            </div>
          </div>
          
          <div class="step">
            <div class="step-icon">3</div>
            <div>
              <strong>Connect & Learn</strong><br>
              Use your coffee chat to share experiences, ask questions, and build meaningful professional relationships.
            </div>
          </div>
        </div>
        
        <p>Ready to explore your dashboard and see what's waiting for you?</p>
        
        <a href="${dashboardUrl}" class="button">Go to Dashboard</a>
        
        <p>Questions? Tips for great coffee chats? Just reply to this email - we love hearing from our members!</p>
        
        <p>Here's to great conversations and career growth!</p>
        
        <p>Cheers,<br>
        The Coffee Closer Network Team</p>
      </div>
    </body>
    </html>
  `
  
  const text = `
    Welcome to the Network, ${name}!
    
    Congratulations! You've successfully completed your Coffee Closer Network setup. You're now part of a community of 500+ sales professionals.
    
    What happens next?
    
    1. Monday Matching
       Every Monday morning, we'll match you with 1-2 sales professionals based on your preferences.
    
    2. Schedule Your Chat  
       You'll receive match details and can schedule a 15-minute coffee chat.
    
    3. Connect & Learn
       Share experiences, ask questions, and build meaningful professional relationships.
    
    Visit your dashboard: ${dashboardUrl}
    
    Questions? Just reply to this email!
    
    Cheers,
    The Coffee Closer Network Team
  `

  return { subject, html, text }
}