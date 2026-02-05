const nodemailer = require("nodemailer");

const sendEmail = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    // console.log(name, email, message);

    //create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",//  or "hotmail", "outlook", etc.
      auth: {
        user: "snpjogi123@gmail.com",
        pass: "khfjczxvhnllvvvr", // app password (not your Gmail password)
      },
    });

    // Mail options
    const htmlContent = `
   <html>
        <body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f6f8; padding: 30px; margin: 0;">
          <div style="max-width: 650px; background: #ffffff; margin: 0 auto; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); overflow: hidden;">

            <div style="background: linear-gradient(135deg, #4CAF50, #2e7d32); color: white; padding: 20px 30px;">
              <h1 style="margin: 0; font-size: 26px;">🎉 Thanks for Visiting SmartStock!</h1>
            </div>

            <div style="padding: 25px 30px; color: #333;">
              <p style="font-size: 18px;">Hi <strong>${name || "Valued Customer"}</strong>, 👋</p>
              
              <p style="font-size: 16px; line-height: 1.6;">
                We're absolutely thrilled you stopped by! Your visit means a lot to us, and we’re excited to welcome you to the <strong>SmartStock family</strong>.
              </p>

              <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0;">
                <p style="margin: 0; font-size: 15px;">
                  <strong>Message from you:</strong><br>
                  “${message || "Looking forward to hearing from you soon!"}”
                </p>
              </div>

              <p style="font-size: 16px; line-height: 1.6;">
                As a thank-you gift, we’re offering you an <strong>exclusive discount of up to 80% OFF</strong> on your next purchase 🎁. Don’t miss out — it’s waiting just for you!
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="http://localhost:5173/" target="_blank"
                  style="background-color: #4CAF50; color: white; padding: 12px 24px; 
                         border-radius: 6px; text-decoration: none; font-size: 16px; 
                         font-weight: 600; display: inline-block;">
                  🚀 Explore SmartStock Now
                </a>
              </div>

              <p style="font-size: 14px; color: #555;">
                Have any questions? Just reply to this email — our team is always happy to help 💬
              </p>
              
              <p style="font-size: 15px; color: #333;">
                With gratitude,<br>
                <strong>SmartStock Manager Team</strong> 💚
              </p>
            </div>

            <div style="background-color: #f1f1f1; text-align: center; padding: 15px;">
              <p style="font-size: 12px; color: #777;">
                © ${new Date().getFullYear()} SmartStock Manager. All rights reserved.<br>
                <a href="http://localhost:5173/" style="color: #4CAF50; text-decoration: none;">Visit our website</a>
              </p>
            </div>

          </div>
        </body>
      </html>
    `;




    // Mail options

    const mailOptions = {
      from: '"SmartStock Team" < snpjogi123@gmail.com> ',
      to: email,
      subject: `🌟 Thanks for Visiting SmartStock, ${name}!`,
      // text: message,
      html: htmlContent,
    };

    // //send mail
    await transporter.sendMail(mailOptions);
    // ✅ Always respond
    res.status(200).json(`✅ Email sent successfully to ${name}!`);
  }
  catch (error) {
    console.error("Error during send mail : ", error)
    res.status(500).json({ success: false, message: "Email sending failed", error: error.message });

  }
};

module.exports = sendEmail;