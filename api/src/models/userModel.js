import mongoose, { Schema } from "mongoose"
import bcrypt from 'bcrypt'
import crypto from 'crypto'

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    cart: {
        type: Array,
        default: []
    },
    address: {
        type: String
    },
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date

}, { timestamps: true });

// LOGIN
userSchema.statics.login = async function (userInput) {
    try {
        const { email, password } = userInput
        const user = await User.findOne({ email })
        if (!user) throw new Error("wrong email")

        const match = await bcrypt.compare(password, user.password)
        if (!match) throw new Error("wrong password")

        return user
    } catch (error) {
        throw error
    }

}

// REGISTER
userSchema.statics.register = async function (userInformation) {
    try {
        const { email, password } = userInformation;
        // validate
        const user = await User.findOne({ email })
        if (user) throw Error("email already exist")

        // create user
        const newUser = new User(userInformation)
        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(password, salt)
        await newUser.save()
        return newUser
    } catch (error) {
        throw error
    }
}
/* UPDATE PASSWORD */
userSchema.methods.updatePassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(password, salt)
    this.passwordChangedAt = Date.now()
    await this.save()
}

/* CREATE PASSORD */
userSchema.methods.createPasswordResetToken = async function () {
    // generateToken 
    const resetToken =  crypto.randomBytes(32).toString("hex")

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest("hex")
    this.passwordResetExpires = Date.now() + (30 * 60 * 1000)
    await this.save()
    return resetToken
}
//Export the model
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User
