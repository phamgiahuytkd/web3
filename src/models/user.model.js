const connection = require('../config/database');



const getIdUsers = async function (id) {
    try{
        const [results, fields] = await connection.query("SELECT * FROM tb_taikhoan WHERE User_ID = ?", [id]);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
    
}



const getInfoUsers = async function (id) {
    try{
        const [results, fields] = await connection.query("SELECT * FROM tb_khachhang WHERE User_ID = ?", [id]);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
    
}



const update_InfoUsers = async function (User_ID, Ho_ten, Dien_thoai, Dia_chi) {
    try{
        const [results, fields] = await connection.query("UPDATE tb_khachhang SET Ho_ten = ?, Dien_thoai = ?, Dia_chi = ? WHERE User_ID = ?", [Ho_ten, Dien_thoai, Dia_chi, User_ID]);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
    
}

module.exports = {
    getIdUsers, getInfoUsers, update_InfoUsers
}