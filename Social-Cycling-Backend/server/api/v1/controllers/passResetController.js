const PassReset = require('../models/passResetModel');
const User = require('../models/userModel');

const randomize = require('randomatic');
const bcrypt = require('bcryptjs');

const send = require('../utils/sendEmail').send_email;

const validateRequestInput = require('../validators/pass_request');
const validateResetInput = require('../validators/pass_reset');

exports.send_request = (req, res) => {
    const { errors, isValid } = validateRequestInput(req.body);

    if (!isValid) {
        return res.status(400).send(errors);
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            res.status(404).json({ noUserFound: "User not found with this email." });
        }

        const resetToken = randomize('Aa0', 40);

        PassReset.findOne({
            email: user.email
        }).then(alreadyRequested => {
            if (alreadyRequested) {
                res.status(400).json({
                    alreadyRequested: "There has already been a request to reset this password!"
                });
            } else {

                const newPassReset = new PassReset({
                    email: user.email,
                    token: resetToken
                });

                newPassReset.save().then(result => {
                    const subject = `You requested to reset your password!`;
                    const text = 'Request your password';
                    send(result.email, subject, text, result.token);
                    res.status(200).send(result);
                });
            }
        })
    })
}

exports.reset_password = (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateResetInput(req.body);

    if (!isValid) {
        return res.status(400).send(errors);
    }
    let password = req.body.password;
    PassReset.findOne({
        token: req.params.token
    }).then((result) => {
        if (!result) {
            res.status(404).json({
                noRequest: 'There is no request for a password reset.'
            })
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                password = hash;
                User.findOneAndUpdate({
                    email: result.email
                }, {
                    $currentDate: {
                        updated_at: true
                    },
                    $set: {
                        password: password
                    },
                }, {
                    new: true
                }).then(() => {
                    PassReset.findOneAndRemove({
                        email: result.email
                    }).then(() => {
                        return null;
                    })
                    res.json({
                        success: 'Your password has been reset'
                    });
                })
                    .catch(err => res.json(err));
            })
        })
    })

};

exports.deny_reset = (req, res) => {
    PassReset.findOneAndRemove({
        token: req.params.token
    }).then(() => {
        res.json({
            success: 'The reset request has been removed'
        })
    })
        .catch(err => res.json(err))
}

// Helpers
exports.deleteAllPassResets = (req, res, next) => {
    PassReset.remove({})
        .then(passResets => {
            if (!passResets) {
                return errorHandler(404, `Could not delete passResets!`, next);
            }
            return res.status(200).send(passResets);
        })
        .catch(err => {
            return errorHandler(400, `${err}`, next);
        });
};