const nodemailer = require("nodemailer");

// Configure Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send OTP email
const sendOTPEmail = async (email, otp, userName) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset - Verify Your Email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2C3E50; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">📚 E-Learning Platform</h1>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Password Reset Request</p>
        </div>

        <div style="background-color: #f5f5f5; padding: 40px 30px; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            Hello ${userName || "User"},
          </p>

          <p style="font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 30px;">
            We received a request to reset your password. Use the code below to verify your email address.
          </p>

          <!-- OTP Display -->
          <div style="background-color: white; border: 2px solid #1899A3; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
            <p style="font-size: 12px; color: #666; margin-top: 0; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px;">Your OTP Code</p>
            <div style="font-size: 36px; font-weight: bold; color: #2C3E50; letter-spacing: 4px; font-family: 'Courier New', monospace;">
              ${otp}
            </div>
          </div>

          <div style="background-color: #FFF3CD; border-left: 4px solid #E67E22; padding: 15px; margin-bottom: 30px; border-radius: 4px;">
            <p style="margin: 0; color: #856404; font-size: 13px;">
              ⏱️ <strong>This code expires in 15 minutes.</strong> Do not share this code with anyone.
            </p>
          </div>

          <p style="font-size: 13px; color: #666; margin-bottom: 30px;">
            If you didn't request this password reset, please ignore this email and your account will remain secure.
          </p>

          <div style="border-top: 1px solid #ddd; padding-top: 20px;">
            <p style="font-size: 12px; color: #999; margin: 0;">
              © 2026 E-Learning Platform. All rights reserved.<br>
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      message: "Failed to send OTP email, please try again",
      error: error.message,
    };
  }
};

module.exports = { sendOTPEmail };
