const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin", "instructor"],
      default: "user"
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    resetToken: {
      type: String,
      default: null
    },
    resetTokenExpiry: {
      type: Date,
      default: null
    },
    otp: {
      type: String,
      default: null
    },
    otpExpiry: {
      type: Date,
      default: null
    },
    verificationToken: {
      type: String,
      default: null
    },
    verificationTokenExpiry: {
      type: Date,
      default: null
    },
    streak: {
      type: Number,
      default: 0
    },
    lastLoginDate: {
      type: Date,
      default: null
    },
    loginDates: [
      {
        type: Date,
        default: null
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
