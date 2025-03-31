import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true , select:false },
    profile: { type: String, default: "" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAndSaveToken = function (res) {
    try {
        const token = jwt.sign(
          { id: this._id, email: this.email },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRATION,
          }
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          sameSite: "None", // More flexible for local dev
          maxAge:  24 * 60 * 60 * 1000,
        });
        console.log("cookie set")
        return token;
        
    } catch (error) {
        console.log(error)
        
    }
};

const User = mongoose.model("User", userSchema);
export default User;
