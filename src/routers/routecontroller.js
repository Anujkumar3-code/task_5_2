
const express = require('express');
const router = express.Router();
const userValidation = require('./middleware').userValidation;
const { getAutoSuggestUsers, get_by_id, creat_user, update_user, delete_user } = require('../services/main_logic');

// below function will return the users details for specific id.
const get = (req, res) => {
    const id = req.params.id;
    const { data, position } = get_by_id(id);
    if (position != -1) {
        res.statusCode = 201;
        res.send(data);
    } else {
        res.statusCode = 404;
        res.send({ message: 'Unable to find the user' });
    }
};
// below function will return the users list based on the emailsubstring.
const getUserList = (req, res) => {
    const emailSubstring = req.params.emailsubstring;
    res.statusCode = 200;
    res.send(getAutoSuggestUsers(emailSubstring, 10));
};
// create the user and add the details in the data set.
const post = (req, res) => {
    const userAsJSON = req.body;
    const users = creat_user(userAsJSON);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 201;
    res.send(users);
    // });
};
// update user detail in the data set.
const put = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const flag = update_user(id, data);
    if (flag == 0) {
        res.statusCode = 404;
        res.send({ message:'unable to update the data' });
    } else {
        res.statusCode = 204;
        res.send();
    }
};
// soft delete of the user for the specific id.
const deletes = (req, res) => {
    const id = req.params.id;
    const flag = delete_user(id);
    // console.log(position);
    // console.log(flag);
    if (flag == 1) {
        // console.log(flag);
        res.statusCode = 200;
        res.send({ message: 'Successfully Deleted some data' });
    } else {
        res.statusCode = 404;
        res.send({ message: 'Unable to find the user' });
    }
};
const anything = () => {
    throw 'unable to process';
};


router.get('/get/id/:id', get);
router.get('/get/autosuggest/:emailsubstring', getUserList);
router.post('/post', userValidation, post);
router.put('/put/:id',  put);
router.delete('/delete/:id', deletes);
router.use('/*', anything);


module.exports = {
    router
};
