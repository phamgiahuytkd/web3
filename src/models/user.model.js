const connection = require('../config/database');



const getIdUsers = async function (id) {
    try{
        const [results, fields] = await connection.query("SELECT * FROM tb_taikhoan WHERE User_ID = ?", [id]);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
    
}

module.exports = {
    getIdUsers
}