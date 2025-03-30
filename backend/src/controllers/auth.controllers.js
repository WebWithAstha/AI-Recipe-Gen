import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.model.js";
import UserCacheService from "../services/userCache.service.js";
import ResponseHandler from "../utils/response.handler.js";
import { validationResult } from "express-validator";

export const registerController = catchAsyncErrors(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return ResponseHandler.error(404, { errors: errors.array() }).send(res);
  const user = await new User(req.body).save();
  await UserCacheService.setUser(user);
  const token = user.generateAndSaveToken(res);
  return ResponseHandler.success({ token, user }).send(res);
});

export const loginController = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return ResponseHandler.error(404, "Invalid email or password").send(res);
  let user = await UserCacheService.getUserByEmail(email);
  if (user) {
    console.log("User fetched from cache");
    user = new User(user); 
  } else {
    user = await User.findOne({ email: req.body.email });
    await UserCacheService.setUser(user);
  }
  if (!user) return ResponseHandler.error(404, "User not found").send(res);

  const isValid = await user.comparePassword(req.body.password);
  if (!isValid) return ResponseHandler.error(401, "Wrong password").send(res);

  const token = await user.generateAndSaveToken(res);
  return ResponseHandler.success({ token, user }, "Login successfull").send(
    res
  );
});

export const logoutController = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) return ResponseHandler.error(404, "You need to login").send(res);
  await UserCacheService.deleteUser(req.user);
  res.clearCookie("token");
  console.log("user deleted from cache" );
  return ResponseHandler.success({}, "Logout successfull").send(res);
});

export const currentUserController = catchAsyncErrors(
  async (req, res, next) => {
    let user = await UserCacheService.getUserById(req.user.id);
    console.log("fetched user from cache", user?.name);
    if (!user) {
      user = await User.findById(req.user.id);
      if (!user) return ResponseHandler.error(404, "You need to login");
      await UserCacheService.setUser(user);
    }
    return ResponseHandler.success(user, `Welcome ${user.name}`).send(res);
  }
);
