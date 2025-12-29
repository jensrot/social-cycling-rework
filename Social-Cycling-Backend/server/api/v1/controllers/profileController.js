const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

const errorHandler = require("../utils/errorHandler");
const validateProfileInput = require("../validators/profile");

// Here change for profile
exports.createOrUpdateProfile = (req, res, next) => {
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) {
    return res.status(400).send(errors);
  }

  // TODO: something is wrong with the user id it is not the same connected to the profile
  console.log(req.user.id)

  const profileFields = {};
  profileFields.user = req.user.id;

  if (req.body.username) profileFields.username = req.body.username;
  if (req.body.level) profileFields.level = req.body.level;
  if (req.body.location) profileFields.location = req.body.location;

  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

  if (req.body.bio) profileFields.bio = req.body.bio;

  Profile.findOne({
    user: req.user.id
  })
    // TODO: remove profile somewhere here
    .populate("user", ["name", "profilePicture"])
    .then(profile => {
      if (profile) {
        // Update the profile
        Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: profileFields
          },
          {
            new: true
          }
        ).then(profile => res.status(200).json({ profileUpdated: profile }));
      } else {
        // Create a new profile
        Profile.findOne({
          username: profileFields.username
        }).then(profile => {
          if (profile) {
            errors.username = "This username already exists";
            return res.status(400).send(errors);
          }

          // else we create one
          new Profile(profileFields).save().then(profile => {
            res.status(200).json({ profileCreated: profile });
          });
        });
      }
    });
};

exports.getCurrentProfile = (req, res, next) => {
  Profile.findOne({
    user: req.user.id
  })
    .then(profile => {
      return res.status(200).send(profile);
    })
    .catch(err => {
      return errorHandler(400, `${err}`, next);
    });
};

// Remove only the profile
exports.deleteProfile = (req, res, next) => {
  // Problem is -> if profile gets deleted the user also gets deleted.
  // What we can do: take the user out -> save it somewhere? How does it know which user was connected which profile?
  // Other structure: user.profile -> een gebruiker heeft een profiel, so we change the way
  // Only way to do it is to switch

  // Profile.findOne({
  //   user: req.user.id
  // }).then((profile) => {
  //   return res.status(200).send(profile);
  // }).catch(err => {
  //   return errorHandler(400, `${err}`, next);
  // });
  // User.findOne({
  //   _id: req.user.id
  // }).then(user => {
  //   Profile.findOneAndDelete({
  //     user: user._id
  //   }).then(profile => {
  //     return res.status(200).send(profile);
  //   }).catch(err => {
  //     return errorHandler(400, `${err}`, next);
  //   });
  // })
}

// Remove both the profile and user and likes and comments from a post
exports.deleteAccount = (req, res, next) => {
  Profile.findOneAndRemove({
    user: req.user.id
  }).then(() => {
    User.findOneAndRemove({
      _id: req.user.id
    }).then(() => {

      // We search through all posts
      Post.find().then(posts => {
        // console.log("posts", posts);

        posts.forEach(post => {

          // remove like, can only be one per post
          const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

          post.likes.splice(removeIndex, 1);

          post.save().then(post => {

            // Remove all comments that have the same comment user id as the current user id
            // TODO: not fixed yet!!!!!!!, now I removed all comments from every post
            // Loop over posts comments array
            // If comment.user === req.user.id -> we got the correct one
            let postComments = post.comments;

            // postComments.forEach((postComment, index) => {
            //   if (postComment.user === req.user.id) {
            //     postComments.splice(index, 1);
            //   }
            // })

            for (let i = postComments.length - 1; i >= 0; i--) {
              console.log(postComments[i]);
              console.log(postComments[i].user);
              console.log(req.user.id);
              if (postComments[i].user === req.user.id) {
                console.log('should be removed')

                postComments.splice(i, 1);
              }
            }

            // post.comments = post.comments.filter(comment => comment.user === req.user.id);

            post.save()
              .then(() => {
                return res.json({
                  success: true
                })
              }).catch(err => {
                return errorHandler(400, `${err}`, next);
              })
          })

        });
      })
    }).catch(err => {
      return errorHandler(400, `${err}`, next);
    });
  });
};

exports.getProfileByUsername = (req, res, next) => {
  const errors = {};
  const username = req.params.username;
  Profile.findOne({
    username: username
  })
    .populate("user", ["name", "profilePicture"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        errorHandler(404, `${errors}`, next);
      }

      return res.status(200).send(profile);
    })
    .catch(err => {
      errorHandler(404, `${err}`, next);
    });
};

exports.getProfileByUserId = (req, res, next) => {
  const errors = {};
  const userId = req.params.user_id;
  Profile.findOne({
    user: userId
  })
    .populate("user", ["name", "profilePicture"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        errorHandler(404, `${errors}`, next);
      }

      return res.status(200).send(profile);
    })
    .catch(err => {
      errorHandler(404, `${err}`, next);
    });
};

exports.getAllProfiles = (req, res, next) => {
  const errors = {};
  const query = Profile.find();
  query.populate("user", ["name", "profilePicture"]);
  query.sort({ created_at: -1 });
  query.exec((err, profiles) => {
    // console.log(profiles)
    if (!profiles) {
      errors.noprofiles = "There are not profiles!";
      return errorHandler(404, `Could not find profiles! ${errors}`, next);
    } else if (err) {
      return errorHandler(400, `${err}`, next);
    }
    res.status(200).send(profiles);
  });
};

// Get the posts created by a specific profile
exports.getPostsFromProfileByUserId = (req, res, next) => {
  const errors = {};
  const userId = req.params.user_id;
  // We get the data from the profile

  // We then get the user attached to the profile
  Profile.findOne({
    user: userId
  })
    .populate("user", ["name", "profilePicture"])
    .then(profile => {
      const profileUserId = profile.user;
      // We get the posts attached to the user.
      Post.find({
        user: profileUserId
      }).then(posts => {
        if (!posts) {
          errors.noposts = "There are not posts for this profile!";
          errorHandler(404, `Could not find posts for this profile! ${errors}`, next);
        }
        return res.status(200).send(posts);
      }).catch(err => {
        errorHandler(404, `${err}`, next);
      })
    })
}

// Get the likes added by a specific profile
exports.getLikesFromProfileByUserId = (req, res, next) => {

}

// Helpers
exports.deleteAllProfiles = (req, res, next) => {
  Profile.remove({})
    .then(profiles => {
      if (!profiles) {
        return errorHandler(404, `Could not delete profiles!`, next);
      }
      return res.status(200).send(profiles);
    })
    .catch(err => {
      return errorHandler(400, `${err}`, next);
    });
};
