const uuid = require('uuid');
const users = require('../data_access/users').users;

// this function will return some emails based on the email substring and limit.
function getAutoSuggestUsers(emailSubstring, limit) {
    const userslist = [];
    const data = users.filter((user) => {
        return user.isDeleted === false;
    });
    for (let i = 0; i < data.length; i++) {
        const email = data[i].email;
        // console.log(email);
        if (email.startsWith(emailSubstring))userslist.push(email);
    }
    userslist.sort((a, b) => {
        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    return userslist.slice(0, limit);
}

const get_by_id = (id) => {
    const data = users.filter((user) => {
        return user.isDeleted === false;
    });
    const position = data.findIndex((user) => user.id === id);
    if (position === -1) {
        return { undefined, position };
    }
    return { data:data[position], position };
};


const creat_user = (userAsJSON) => {
    userAsJSON.id = uuid.v4();
    userAsJSON.isDeleted = false;
    // console.log(userAsJSON);
    users.push(userAsJSON);
    return users;
};
const update_user = (id, data) => {
    const userAsJSON = data;
    const position = users.findIndex((user) => user.id === id);
    let flag = 1;
    if (position !== -1 && users[position].isDeleted === false) {
        Object.entries(userAsJSON).map(entry => {
            const key = entry[0];
            const value = entry[1];
            if (key in users[position]) {
                users[position][key] = value;
            } else {
                flag = 0;
            }
        });
    }
    if (position === -1 || flag === 0) return 0;
    return 1;
};
const delete_user = (id) => {
    const position = users.findIndex((user) => user.id === id);
    if (position !== -1 && users[position].isDeleted === false) {
        users[position].isDeleted = true;
        return 1;
    }

    return 0;
};
module.exports = {
    getAutoSuggestUsers,
    get_by_id,
    creat_user,
    update_user,
    delete_user
};
