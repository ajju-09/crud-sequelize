const db = require('../models/index')
const createAuthUser = async (data) => {
    const userDetail = await db.Users.create(data);
    return userDetail;
}

const findAuthUser = async (email) => {
    const valid = await db.Users.findOne({ where: { email }})
    return valid;
}

const findAll = async () => {
    const data = await db.Users.findAll({
        attributes: { exclude : ['password']}
    })
    return data;
}


const findByPrimaryKey = async (key) => {
    const data = await db.Users.findByPk(key, {
        attributes: { exclude: ['password']}
    });
    return data;
}

const Update = async (data, user_id) => {
    details = await db.Users.update(data, {
        where: {
            id: user_id
        }
    })
    return details;
}

const Delete = async (key) => {
    const del = await db.Users.destroy({ where: { id: key}});
    return del;
}
module.exports = { createAuthUser, findAuthUser, findAll, findByPrimaryKey, Update, Delete }