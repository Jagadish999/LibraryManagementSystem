const express = require('express');
const router = express.Router();

const User = require('../models/user');
const db = require('../database/dbOperation');

//For email and date validation
const validateEmail = (email) => {
    return email && typeof email === 'string' && email.includes('@');
};
const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date) && date.toString() !== 'Invalid Date';
}

//Get User With Specific Id
router.get('/:userId', async (req, res) => {

    const userId = req.params.userId;
    const userObj = new User(null, null, null, db);

    // Parse userId into a number
    const numericUserId = Number(userId);

    // Check if the parsed value is a valid number
    if (isNaN(numericUserId) || !Number.isInteger(numericUserId) || numericUserId <= 0) {
        return res.status(400).json({ message: 'Invalid user ID format.' });
    }

    const specificUser = await userObj.getSpecificUser(numericUserId);

    if (!specificUser) {
        return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(specificUser);
});

// Get all users from the database
router.get('', async (req, res) => {

    const userObj = new User(null, null, null, db);
    const allUsers = await userObj.getAllUsers();

    if (allUsers.length === 0) {
        return res.status(404).json({ message: 'No Users' });
    }

    return res.status(200).json(allUsers);
});

//Insert New User in database
router.post('', async (req, res) => {

    const { name, email, membershipDate } = req.body;

    // Basic input validation, email validation and date validation
    if (!name || !email || !membershipDate) {
        return res.status(400).json({ error: 'Name, email, and membership date are required.' });
    }
    else if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid Email' });
    }
    else if (!isValidDate(membershipDate)) {
        return res.status(400).json({ error: 'Invalid Date' });
    }

    //Format date as requried by MySQL
    const membershipDateObject = new Date(membershipDate);
    const formattedMembershipDate = membershipDateObject.toISOString().split('T')[0];

    //instace of user
    const userObj = new User(name, email, formattedMembershipDate, db);
    const insertResult = await userObj.saveUser();

    if (typeof insertResult.UserID === 'number') {
        res.status(200).json({ message: 'New User Inserted' });
    }

    res.status(500).json({ insertResult });
});

module.exports = router;
