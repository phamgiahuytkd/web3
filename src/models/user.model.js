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
        return true;

    }catch(err){
        throw new Error('Database query failed');
    }
    
}




const update_Pass = async function (User_ID, Pass_word) {
    try{
        const [results, fields] = await connection.query("UPDATE `tb_taikhoan` SET `Pass_word` = ? WHERE `User_ID` = ?", [Pass_word, User_ID]);
        return true;

    }catch(err){
        throw new Error('Database query failed');
    }
    
}


const add_Users = async function (User_ID , Pass_word, Phan_quyen) {
    try{
        const [results, fields] = await connection.query("INSERT INTO `tb_taikhoan` (`User_ID`, `Pass_word`, `Phan_quyen`) VALUES (?, ?, ?)", [User_ID, Pass_word, Phan_quyen]);
        return true;

    }catch(err){
        throw new Error('Database query failed');
    }
    
}


const add_info_Users = async function (User_ID , Ho_ten, Dien_thoai, Dia_chi) {
    try{
        const [results, fields] = await connection.query("INSERT INTO `tb_khachhang` (`User_ID`, `Ho_ten`, `Dien_thoai`, `Dia_chi`) VALUES (?, ?, ?, ?)", [User_ID , Ho_ten, Dien_thoai, Dia_chi]);
        return true;

    }catch(err){
        throw new Error('Database query failed');
    }
    
}


const getAllInfoUsers = async function () {
    try{
        const [results, fields] = await connection.query("SELECT * FROM tb_khachhang");
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
    
}


module.exports = {
    getIdUsers, getInfoUsers, update_InfoUsers, update_Pass, add_Users, add_info_Users, getAllInfoUsers
}