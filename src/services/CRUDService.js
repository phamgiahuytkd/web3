const connection = require('../config/database');

const getAllUsers = async function () {
    const [results, fields] = await connection.query("SELECT * FROM tb_taikhoan");
    return results;
}

const getIdUsers = async function (id) {
    const [results, fields] = await connection.query("SELECT * FROM tb_taikhoan WHERE User_ID = ?", [id]);
    return results;
}

module.exports = {
    getAllUsers,
    getIdUsers
}