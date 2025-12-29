const express = require("express");
const router = express.Router();

const postController = require("./controllers/postController");
const authController = require("./controllers/authController");
const profileController = require("./controllers/profileController");
const passResetController = require('./controllers/passResetController');

const passport = require("passport");
const verifyToken = require('./middlewares/verifyToken');
const upload = require('./middlewares/multerMiddleware');
// const fileUpload = require('express-fileupload');

const seeder = require('./db/seeder');

// api/v1
router.get("/", (req, res) => {
  res.send(`Welcome to the api!`);
});

/* Authentication */

// api/v1/user
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.post("/user/edit", authController.editUser);
router.post("/user/picture", verifyToken, upload.single('profilePicture'), authController.editProfilePicture)
// router.post("/user/picture", verifyToken, fileUpload(), authController.updateProfilePicture);
router.delete("/users", verifyToken, authController.deleteAllUsers);

/* Posts */

// api/v1/posts
router.get("/posts", postController.getAllPosts);
router.get("/posts/latest", postController.getAllLatestPosts);
router.get("/post/:id", postController.getPostById);
router.get("/post/profile/:id", postController.getProfileFromPost);
router.post("/posts", verifyToken, postController.createPost);
router.get("/post/likes/:id", verifyToken, postController.getLikedProfiles);
router.patch("/post/:id", verifyToken, postController.updatePostById);
router.delete("/post/:id", verifyToken, postController.deletePostById);
router.post("/post/like/:id", verifyToken, postController.likePost);
router.delete("/post/unlike/:id", verifyToken, postController.unlikePost);
router.post("/post/comment/:id", verifyToken, postController.addComment);
router.delete("/post/comment/:id/:comment_id", verifyToken, postController.removeComment);

router.delete("/posts", verifyToken, postController.deleteAllPosts);

/* Profiles */

// api/v1/profiles
router.get("/profile", verifyToken, profileController.getCurrentProfile);
router.get("/profiles", verifyToken, profileController.getAllProfiles);
router.get("/profile/user/:user_id", verifyToken, profileController.getProfileByUserId);
router.get("/profile/user/posts/:user_id", verifyToken, profileController.getPostsFromProfileByUserId);
router.get("/profile/username/:username", verifyToken, profileController.getProfileByUsername);
router.post("/profile", verifyToken, profileController.createOrUpdateProfile);
router.delete("/profile/account", verifyToken, profileController.deleteAccount);
router.delete("/profile", verifyToken, profileController.deleteProfile);

router.delete("/profiles", verifyToken, profileController.deleteAllProfiles);

/* Password reset */
// api/v1/reset_request
router.post('/reset_request', passResetController.send_request);
router.post('/reset_password/:token', passResetController.reset_password);
router.delete('/deny_request/:token', passResetController.deny_reset);

router.delete('/passresets', verifyToken, passResetController.deleteAllPassResets);

/* Seeding */
// api/v1/seeder/profiles
router.get('/seeder/profiles', verifyToken, seeder.seedProfiles);

module.exports = router;
