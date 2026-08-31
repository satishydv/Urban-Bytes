import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModel from "../models/User.models.js";
import BlackListTokenModel from "../models/BlackListTokens.models.js";
import blackListTokenModel from "../models/BlackListTokens.models.js";
import verifyEmailModel from "../models/VerifyEmail.models.js";
import sendEmail from "../utils/sendEmails.js";

const SignUpUser = async (req, res) => {
  try {
    const { email, name, password, profile } = req.body;
    if (!email || !name || !password || !profile) {
      return {
        success: false,
        message: "please provide all fields",
      };
    }

    const isExistEmail = await userModel.findOne({ email });
    if (isExistEmail) {
      return res.send({
        success: false,
        message: "User Exist Already",
      });
    }

    const hashpass = await bcrypt.hash(password, 10);
    const c_user = await userModel.create({
      email,
      password: hashpass,
      name,
      profile,
    });
    if (!c_user) {
      return res.send({
        success: false,
        message: "Something wents wrong....",
      });
    }

    const token = jwt.sign(
      { userEmail: c_user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );
    const otpNum = Math.floor(1000 + Math.random() * 90000000);

    await verifyEmailModel.deleteMany({ email: c_user.email });
    const verifyEmail = await verifyEmailModel.create({
      email: c_user.email,
      otp: String(otpNum),
    });
    const verifyUrl = `${process.env.SERVER_URL}/api/auth/verify-email?otp=${otpNum}&email=${c_user.email}`;
    sendEmail(
      c_user.email,
      "Verify Your Email",
      null,
      `
  <div style="font-family: Arial, sans-serif; background:#0f172a; padding:30px; color:#fff;">
    
    <div style="max-width:500px; margin:auto; background:#1e293b; padding:30px; border-radius:12px; text-align:center;">
      
      <h2 style="color:#FF4757;">Verify Your Email</h2>
      
      <p style="color:#cbd5e1; margin-bottom:20px;">
        Click the button below to verify your email address
      </p>

      <a href="${verifyUrl}" 
         style="display:inline-block; padding:12px 25px; background:#FF4757; color:white; text-decoration:none; border-radius:30px; font-weight:bold;">
         Verify Email
      </a>

      <p style="margin-top:20px; font-size:12px; color:#94a3b8;">
        If you didn’t request this, ignore this email.
      </p>

    </div>
  </div>
  `,
    ).catch(console.error);

    return res.send({
      success: true,
      message: "User Sign Up Successfully",
      data: {
        token,
        profile: c_user?.profile,
        name: c_user?.name,
        email: c_user?.email,
        isEmailVerified: c_user?.isEmailVerified,
        role: c_user?.role,
        phone: c_user?.phone,
        address: c_user?.address,
      },
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error,
    });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return {
        success: false,
        message: "Please provide all fields",
      };
    }
    const checkUserExist = await userModel.findOne({ email });
    if (!checkUserExist) {
      return {
        success: false,
        message: "Credentials not match",
      };
    }
    const checkPass = await bcrypt.compare(password, checkUserExist?.password);
    if (!checkPass) {
      return {
        success: false,
        message: "Credentials not match",
      };
    }

    const token = jwt.sign(
      { userEmail: checkUserExist.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );
    return {
      success: true,
      message: "User Login  Successfully",
      data: {
        token,
        profile: checkUserExist?.profile,
        name: checkUserExist?.name,
        email: checkUserExist?.email,
        isEmailVerified: checkUserExist?.isEmailVerified,
        role: checkUserExist?.role,
        phone: checkUserExist?.phone,
        address: checkUserExist?.address,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};

const UserByToken = async (req, res) => {
  try {
    const token = req.headers?.authorization.split(" ")[1];
    if (!token || token === undefined) {
      return res.send({
        success: false,
        message: "Please provide Token",
      });
    }
    // check for black listed token
    const isBlackList = await BlackListTokenModel.findOne({ token });
    if (isBlackList) {
      return res.send({
        success: false,
        message: "Token has expired please login agian",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel
      .findOne({ email: decode.userEmail })
      .select("-password");
    if (!user) {
      return res.send({
        success: false,
        message: "User Not Found",
      });
    }
    return res.send({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const LogOut = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.send({
        success: false,
        message: "TOken is not provided..",
      });
    }
    const blackList = await blackListTokenModel.create({
      token,
    });
    if (!blackList) {
      return res.send({
        success: false,
        message: "Something wents worng...",
      });
    }
    return res.send({
      success: true,
      message: "User LogOut successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const VerifyEmail = async (req, res) => {
  try {
    const { otp, email } = req.query;
    if (!otp || !email) {
      return res.send({
        success: false,
        message: "OTP and email required",
      });
    }

    const checkForEmailAndOTP = await verifyEmailModel.findOne({
      email,
      otp: String(otp),
      purpose: "verify",
    });
    if (!checkForEmailAndOTP) {
      return res.send({
        success: false,
        message: "Something wents wrong while verifying email..",
      });
    }

    const same = String(checkForEmailAndOTP.otp) == String(otp);
    console.log(same, "is email are same or not")
    if (!same) {
      return res.send({
        success: false,
        message: "Something wents wrong while verifying email..",
      });
    }

    const user = await userModel.findOneAndUpdate(
      { email },
      { isEmailVerified: true },
      { new: true },
    );

    if (!user) {
      return res.send({
        success: false,
        message: "Something wents wrong while verifying email..",
      });
    }
    await verifyEmailModel.deleteOne({ _id: checkForEmailAndOTP._id });
    
    return res.send({
      success: true,
      message: "Email Verified Successfully Login to your account",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const RequestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({
        success: false,
        message: "Email required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }

    const otpNum = Math.floor(1000 + Math.random() * 90000000);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await verifyEmailModel.deleteMany({ email, purpose: "reset" });
    await verifyEmailModel.create({
      email,
      otp: String(otpNum),
      purpose: "reset",
      expiresAt,
    });

    sendEmail(
      email,
      "Password Reset Code",
      null,
      `
  <div style="font-family: Arial, sans-serif; background:#0f172a; padding:30px; color:#fff;">
    <div style="max-width:500px; margin:auto; background:#1e293b; padding:30px; border-radius:12px; text-align:center;">
      <h2 style="color:#FF4757;">Reset Your Password</h2>
      <p style="color:#cbd5e1; margin-bottom:12px;">Use this code to reset your password.</p>
      <div style="font-size:28px; letter-spacing:4px; font-weight:bold; color:#fff;">${otpNum}</div>
      <p style="margin-top:16px; font-size:12px; color:#94a3b8;">This code expires in 10 minutes.</p>
    </div>
  </div>
  `,
    ).catch(console.error);

    return res.send({
      success: true,
      message: "Reset code sent to email",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const ResetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) {
      return res.send({
        success: false,
        message: "Email, otp, and password required",
      });
    }

    if (password.length < 8) {
      return res.send({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const record = await verifyEmailModel.findOne({
      email,
      otp: String(otp),
      purpose: "reset",
    });

    if (!record) {
      return res.send({
        success: false,
        message: "Invalid otp or email",
      });
    }

    if (record.expiresAt && record.expiresAt.getTime() < Date.now()) {
      await verifyEmailModel.deleteOne({ _id: record._id });
      return res.send({
        success: false,
        message: "OTP expired",
      });
    }

    const hashpass = await bcrypt.hash(password, 10);
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { password: hashpass },
      { new: true },
    );

    if (!updatedUser) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }

    await verifyEmailModel.deleteMany({ email, purpose: "reset" });
    return res.send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export {
  SignUpUser,
  LoginUser,
  UserByToken,
  LogOut,
  VerifyEmail,
  RequestPasswordReset,
  ResetPasswordWithOtp,
};
