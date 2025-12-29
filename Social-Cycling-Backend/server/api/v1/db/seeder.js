const User = require('../models/userModel');
const Post = require('../models/postModel');
const Profile = require('../models/profileModel');

const faker = require('faker');
const bcrypt = require('bcryptjs');

const createObjectId = require('../utils/createObjectId');

/** Create an array with fake user objects
 * @param {number} amountOfUsers 
 * @returns {Array<Object>} Array of user objects
 */
const createUsers = (amountOfUsers) => {
    let users = [];

    for (let i = 0; i <= amountOfUsers; i++) {
        let user = {
            profilePicture: faker.image.imageUrl(),
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            date: new Date(),
        }
        users.push(user);
    }
    return users;
}

// TODO
const createPosts = (amountOfPosts) => {

}

exports.seedProfiles = (req, res) => {
    const users = createUsers(10);

    users.forEach((user) => {
        const objectId = createObjectId();

        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
                throw err;
            }
            const newUser = new User({
                id: objectId,
                profilePicture: user.profilePicture,
                name: user.name,
                email: user.email,
                password: hash,
                date: user.date,
            })
            console.log(newUser)
            newUser.save()
                .then(response => {
                    let likes = [];
                    let comments = [];

                    for (let i = 0; i <= 10; i++) {
                        likes.push({
                            id: objectId,
                            user: newUser
                        })
                        comments.push({
                            id: objectId,
                            description: faker.lorem.paragraph(8),
                            name: response.name,
                            profilePicture: response.profilePicture,
                            user: response._id
                        })
                        const newPost = new Post({
                            id: objectId,
                            user: response._id,
                            title: faker.name.title(),
                            description: faker.lorem.paragraph(8),
                            startDate: "2021-02-27T23:00:00.000Z",
                            startTime: "2021-02-27T13:46:46.000Z",
                            start_lat: 51.093804,
                            start_lng: 2.595335,
                            stop_lat: 51.0967204,
                            stop_lng: 2.5740081,
                            origin: "Sint-Elisabethlaan, 8660 De Panne, Belgium",
                            destination: "Dynastielaan, 8660 De Panne, Belgium",
                            distance: "2.0 km",
                            moving_time: "7 mins",
                            startLocation: "Sint-Elisabethlaan, De Panne, Belgium",
                            endLocation: "Dynastielaan, De Panne, Belgium",
                            likes: likes,
                            comments: comments
                        })
                        newPost.save()
                            .then(response => {

                                console.log(`Succesfully added ${newPost}`)
                                return res.status(200).json(response);
                            })
                            .catch(err => {
                                console.log(err)
                            });
                    }

                    console.log(`Succesfully added ${newUser}`);
                    return res.status(200).json(response);
                })
                .catch(err => {
                    console.log(err)
                })
        })
    });
    return res.send('Profiles and posts succesfully seeded!');
}

exports.seedPosts = (req, res) => {

}
