/*
  # Send Offer Decision Email Function

  1. Purpose
    - Sends email notifications to buyers when sellers make decisions on offers
    - Handles accept, decline, and counter offer notifications
    - Provides professional email templates for each decision type

  2. Security
    - Uses Mailgun API for reliable email delivery
    - Validates input data before processing
    - Implements CORS for web requests

  3. Email Types
    - Acceptance: Congratulates buyer and provides next steps
    - Decline: Politely declines with encouragement to view other properties
    - Counter: Presents counter offer with seller's message
*/

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// Mailgun configuration
const MAILGUN_API_KEY = Deno.env.get("MAILGUN_API_KEY");
const MAILGUN_DOMAIN = Deno.env.get("MAILGUN_DOMAIN") || "mg.acreagesales.com";
const FROM_EMAIL = "noreply@acreagesales.com";

interface EmailRequest {
  to: string;
  buyerName: string;
  propertyTitle: string;
  propertyApn: string;
  originalOffer: number;
  decision: 'accepted' | 'declined' | 'counter';
  counterOffer?: number;
  counterMessage?: string;
  sellerContact: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const emailData: EmailRequest = await req.json();

    console.log('Received email request:', {
      to: emailData.to,
      decision: emailData.decision,
      hasApiKey: !!MAILGUN_API_KEY,
      domain: MAILGUN_DOMAIN
    });

    // Check if Mailgun is configured
    if (!MAILGUN_API_KEY) {
      console.error('Mailgun API key not configured');
      return new Response(
        JSON.stringify({
          error: 'Mailgun API key not configured',
          message: 'Please configure MAILGUN_API_KEY in Supabase Edge Function secrets',
          instructions: 'Go to Supabase Dashboard → Settings → Edge Functions → Secrets and add MAILGUN_API_KEY and MAILGUN_DOMAIN'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate required fields
    if (!emailData.to || !emailData.buyerName || !emailData.propertyTitle || !emailData.decision) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Generate email content based on decision
    let subject: string;
    let htmlContent: string;

    switch (emailData.decision) {
      case 'accepted':
        subject = `🎉 Your Offer Has Been Accepted - ${emailData.propertyTitle}`;
        htmlContent = generateAcceptedEmailTemplate(emailData);
        break;
      case 'declined':
        subject = `Update on Your Offer - ${emailData.propertyTitle}`;
        htmlContent = generateDeclinedEmailTemplate(emailData);
        break;
      case 'counter':
        subject = `Counter Offer Received - ${emailData.propertyTitle}`;
        htmlContent = generateCounterEmailTemplate(emailData);
        break;
      default:
        throw new Error('Invalid decision type');
    }

    // Send email using Mailgun API
    const mailgunUrl = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
    
    const formData = new FormData();
    formData.append('from', `Acreage Sale <${FROM_EMAIL}>`);
    formData.append('to', emailData.to);
    formData.append('subject', subject);
    formData.append('html', htmlContent);

    const mailgunResponse = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
      },
      body: formData,
    });

    if (!mailgunResponse.ok) {
      const errorText = await mailgunResponse.text();
      console.error('Mailgun API error:', errorText);
      throw new Error(`Failed to send email: ${mailgunResponse.status} ${errorText}`);
    }

    const mailgunResult = await mailgunResponse.json();
    console.log('Email sent successfully:', mailgunResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email notification sent successfully',
        emailSent: {
          to: emailData.to,
          subject,
          decision: emailData.decision,
          messageId: mailgunResult.id
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email notification',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function generateAcceptedEmailTemplate(data: EmailRequest): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offer Accepted</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 28px;">🎉 Congratulations!</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">Your offer has been accepted!</p>
      </div>
      
      <div style="background: #f9fafb; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
        <h2 style="color: #1f2937; margin-top: 0;">Offer Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Property:</td>
            <td style="padding: 8px 0;">${data.propertyTitle}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">APN:</td>
            <td style="padding: 8px 0;">${data.propertyApn}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Your Offer:</td>
            <td style="padding: 8px 0; color: #10b981; font-weight: bold;">$${data.originalOffer.toLocaleString()}</td>
          </tr>
        </table>
      </div>
      
      <div style="background: #dbeafe; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
        <h3 style="color: #1e40af; margin-top: 0;">Next Steps</h3>
        <ol style="margin: 0; padding-left: 20px;">
          <li>The seller will contact you within 24-48 hours</li>
          <li>You'll receive contract documents for review</li>
          <li>Schedule property inspection if needed</li>
          <li>Arrange financing and closing details</li>
        </ol>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <p>Questions? Contact the seller at: <strong>${data.sellerContact}</strong></p>
      </div>
      
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
        <p>This email was sent from Acreage Sale regarding your property offer.</p>
        <p>Visit us at: <a href="https://acreagesales.com" style="color: #329cf9;">acreagesales.com</a></p>
      </div>
    </body>
    </html>
  `;
}

function generateDeclinedEmailTemplate(data: EmailRequest): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offer Update</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #6b7280, #4b5563); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 28px;">Thank You for Your Interest</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">Update on your property offer</p>
      </div>
      
      <div style="background: #f9fafb; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
        <h2 style="color: #1f2937; margin-top: 0;">Offer Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Property:</td>
            <td style="padding: 8px 0;">${data.propertyTitle}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">APN:</td>
            <td style="padding: 8px 0;">${data.propertyApn}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Your Offer:</td>
            <td style="padding: 8px 0;">$${data.originalOffer.toLocaleString()}</td>
          </tr>
        </table>
      </div>
      
      <div style="padding: 20px; text-align: center;">
        <p style="font-size: 16px; margin-bottom: 20px;">
          Dear ${data.buyerName},<br><br>
          Thank you for your interest in our property. After careful consideration, 
          we have decided not to move forward with your current offer at this time.
        </p>
        <p style="font-size: 16px; margin-bottom: 20px;">
          We appreciate the time you took to submit your offer and encourage you to 
          explore other excellent properties available on our platform.
        </p>
      </div>
      
      <div style="background: #dbeafe; padding: 20px; border-radius: 10px; margin-bottom: 25px; text-align: center;">
        <h3 style="color: #1e40af; margin-top: 0;">Explore More Properties</h3>
        <p>Don't let this stop you! We have many other great investment opportunities.</p>
        <a href="https://acreagesales.com/properties" style="display: inline-block; background: #329cf9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          View Available Properties
        </a>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <p>Questions? Contact us at: <strong>${data.sellerContact}</strong></p>
      </div>
      
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
        <p>This email was sent from Acreage Sale regarding your property offer.</p>
        <p>Visit us at: <a href="https://acreagesales.com" style="color: #329cf9;">acreagesales.com</a></p>
      </div>
    </body>
    </html>
  `;
}

function generateCounterEmailTemplate(data: EmailRequest): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Counter Offer Received</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 28px;">💰 Counter Offer Received</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">The seller has made a counter offer</p>
      </div>
      
      <div style="background: #f9fafb; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
        <h2 style="color: #1f2937; margin-top: 0;">Offer Comparison</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Property:</td>
            <td style="padding: 8px 0;">${data.propertyTitle}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">APN:</td>
            <td style="padding: 8px 0;">${data.propertyApn}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Your Original Offer:</td>
            <td style="padding: 8px 0;">$${data.originalOffer.toLocaleString()}</td>
          </tr>
          <tr style="background: #fef3c7;">
            <td style="padding: 8px 0; font-weight: bold; color: #d97706;">Seller's Counter Offer:</td>
            <td style="padding: 8px 0; color: #d97706; font-weight: bold; font-size: 18px;">$${data.counterOffer?.toLocaleString()}</td>
          </tr>
        </table>
      </div>
      
      ${data.counterMessage ? `
      <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
        <h3 style="color: #92400e; margin-top: 0;">Message from Seller</h3>
        <p style="margin: 0; font-style: italic;">"${data.counterMessage}"</p>
      </div>
      ` : ''}
      
      <div style="background: #dbeafe; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
        <h3 style="color: #1e40af; margin-top: 0;">What's Next?</h3>
        <ul style="margin: 0; padding-left: 20px;">
          <li>Review the counter offer carefully</li>
          <li>Consider your budget and investment goals</li>
          <li>Respond within 48 hours to maintain priority</li>
          <li>Contact the seller directly to negotiate further</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <div style="margin-bottom: 15px;">
          <a href="mailto:${data.sellerContact}?subject=Re: Counter Offer for ${data.propertyTitle}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px;">
            Accept Counter Offer
          </a>
          <a href="mailto:${data.sellerContact}?subject=Re: Counter Offer for ${data.propertyTitle}" style="display: inline-block; background: #6b7280; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Negotiate Further
          </a>
        </div>
        <p>Or contact the seller directly at: <strong>${data.sellerContact}</strong></p>
      </div>
      
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
        <p>This email was sent from Acreage Sale regarding your property offer.</p>
        <p>Visit us at: <a href="https://acreagesales.com" style="color: #329cf9;">acreagesales.com</a></p>
      </div>
    </body>
    </html>
  `;
}