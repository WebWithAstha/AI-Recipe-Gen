import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.model.js";
import ResponseHandler from "../utils/response.handler.js";

export const registerController = catchAsyncErrors(async (req, res, next) => {
    const {name, email, password} = req.body;
    if (!name ||!email ||!password) return ResponseHandler.error(404,"Missing credentials")
    const user = await new User(req.body).save();
    const token = user.generateAndSaveToken(res);
    return ResponseHandler({token,user}).send(res);
});

export const loginController = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
      return ResponseHandler.error(404,"Invalid email or password").send(res);
      
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return ResponseHandler.error(404,"User not found").send(res);

    const isValid = await user.comparePassword(req.body.password);
    if (!isValid) 
      return ResponseHandler.error(401,"Wrong password").send(res);

    const token = await user.generateAndSaveToken(res);
      return ResponseHandler.success({token,user},"Login successfull").send(res);
});

export const logoutController = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    return ResponseHandler.success({}, "Logout successfull").send(res);
});

export const currentUserController = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    return ResponseHandler.success(user,`Welcome ${user.name}`).send(res);
});
