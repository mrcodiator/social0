import { Router } from "express";
import { changePassword, checkUniqueUsername, editProfile, getAllUsers, getProfile, getUser, loginUser, registerUser, sendEmail, verifyOtp } from "../controllers/user.controller";
import { verifyToken } from "../middleware/middleware";
import { followUser, getFollowers, getFollowing, removeFollower } from "../controllers/follow.controller";

export const UserRouter = Router();

UserRouter.get("/", verifyToken, getAllUsers);

// Auth Routes
UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);

// Verification Routes
UserRouter.get("/check-username/:username", checkUniqueUsername)
UserRouter.post("/send-otp", sendEmail)
UserRouter.post("/verify-otp", verifyOtp)
UserRouter.post("/change-password", verifyToken, changePassword);

// Profile Routes
UserRouter.get("/profile", verifyToken, getUser);
UserRouter.put("/edit", verifyToken, editProfile);
UserRouter.get("/:username", verifyToken, getProfile)

// Follow Routes
UserRouter.get("/:id/following", verifyToken, getFollowing);
UserRouter.get("/:id/followers", verifyToken, getFollowers);
UserRouter.put("/:id/follow", verifyToken, followUser);
UserRouter.put("/:id/unfollow", verifyToken, removeFollower);



