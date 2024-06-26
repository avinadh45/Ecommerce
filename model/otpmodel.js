// otpmodel.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '5m' // OTP expires after 5 minutes
    }
});

const OTP = mongoose.model('OTP', otpSchema);

// Method to generate and save OTP for a user
OTP.generateAndSaveOTP = async function(userId,email) {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
   console.log(otp);
    const otpEntry = new OTP({
        userId: userId,
        email:email,
        otp: otp
    });
    await otpEntry.save();

    return otp;
};

// Method to verify OTP for a user
// Method to verify OTP for a user
OTP.verifyOTP = async function(userId, otp) {
    const otpEntry = await OTP.findOne({ userId: userId, otp: otp });

    if (otpEntry) {
        // Check if the OTP has expired
        const currentTime = new Date();
        const otpCreationTime = otpEntry.createdAt;
        const otpExpirationTime = new Date(otpCreationTime.getTime() + (5 * 60 * 1000)); // 5 minutes in milliseconds
        if (currentTime <= otpExpirationTime) {
            // OTP is valid and not expired, remove it from the database
            //await otpEntry.remove();
            return true;
        } else {
            // OTP is expired
            return false;
        }
    } else {
        // OTP is invalid (not found in the database)
        return false;
    }
};


// Method to resend OTP for a user
OTP.resendOTP = async function(userId) {
    // Check if there's an existing OTP for the user
    //  const existingOTP = await OTP.findOne({ userId: userId });
    // console.log(otp);
    // If an OTP already exists, just resend it
    //  if (existingOTP) {
    //     return existingOTP.otp;
    // }
    //  console.log(otp);
    // If no OTP exists, generate and save a new one
    return await OTP.generateAndSaveOTP(userId);
};

module.exports = OTP;