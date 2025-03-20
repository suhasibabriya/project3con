var user =require('../model/usermodel');
var contact = require('../model/usercontact');
const storage = require('node-persist');
const bcrypt = require('bcrypt');

storage.init( /* options ... */);

// Register the data of user
exports.register = async (req, res) => {
    try {
        var b_pass = await bcrypt.hash(req.body.password, 10);
        req.body.password = b_pass;
        var data = await user.create(req.body);
        res.status(200).json({
            status: 'true',
            message: 'User Registered Successfully',
            data
        });
    } catch (error) {
        res.status(400).json({
            status: 'false',
            message: 'Registering Error',
            error: error.message
        });
    }
}

// Login page
exports.login = async (req, res) => {
    try {
        var data = await user.find({ "email": req.body.email });
        var user_id = await storage.getItem('user_id');
        if (user_id == undefined) {
            if (data.length == 1) {
                bcrypt.compare(req.body.password, data[0].password, function (err, result) {
                    storage.setItem("user_id",data[0].id)
                    if (result) {
                        res.status(200).json({
                            status: 'true',
                            message: 'Login Successful',
                            user_id,
                            data
                        });
                    } else {
                        res.status(200).json({
                            status: 'false',
                            message: 'Check email and password'
                        });
                    }
                });
            } else {
                res.status(200).json({
                    status: 'false',
                    message: 'User not found'
                });
            }
        } else {
            res.status(200).json({
                status: 'true',
                message: 'Already Logged In'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'false',
            message: 'logging Error',
            error: error.message
        });
    }
}

// View data of user
exports.viewData = async (req, res) => {
    try {
        var data = await user.find();
        res.status(200).json({
            status: 'true',
            message: 'Data Fetched Successfully',
            data
        });
    } catch (error) {
        res.status(400).json({
            status: 'false',
            message: 'Error fetching data',
            error: error.message
        });
    }
}

// Logout page 
exports.logout = async (req, res) => {
    try {
        await storage.removeItem('user_id');
        res.status(200).json({
            status: 'true',
            message: 'Logged Out Successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: 'false',
            message: 'Error logging out',
            error: error.message
        });
    }
}

// Add contact 
exports.addcontact = async (req, res) => {
    try {
        var data = await contact.create(req.body);
        res.status(200).json({
            status: 'true',
            message: 'Contact Added Successfully',
            data
        });
    } catch (error) {
        res.status(400).json({
            status: 'false',
            message: 'Error adding contact',
            error: error.message
        });
    }
}

// View contact 
exports.viewcontact = async (req, res) => {
    try {
        var data = await contact.find().populate('user_id');
        res.status(200).json({
            status: 'true',
            message: 'Contact Data Fetched Successfully',
            data
        });
    } catch (error) {
        res.status(400).json({
            status: 'false',
            message: 'Error fetching Contacts',
            error: error.message
        });
    }
}

// Update contact data 
exports.update = async (req, res) => {
    try {
        var data = await contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: true,
            message: "You have updated your contact successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Error updating Contact',
            error: error.message
        });
    }
}

// Delete contact data
exports.delete = async (req, res) => {
    try {
        var data = await contact.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: true,
            message: "Your contact is deleted..!",
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Error deleting Contact',
            error: error.message
        });
    }
}