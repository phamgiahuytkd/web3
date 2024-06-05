const connection = require('../config/database');

const db_AllProduct = async function (err) {
    try{
        const [results, fields] = await connection.query("SELECT * FROM tb_sanpham");
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
}

const db_Discount = async function (err) {
    try{
        const [results, fields] = await connection.query("SELECT Ma_san_pham, Phan_tram FROM tb_giamgia WHERE CURRENT_DATE() < Ngay_ket_thuc");
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
}


const db_IdProduct = async function (id) {
    try{
        const [results, fields] = await connection.query("SELECT * FROM tb_sanpham WHERE Ma_san_pham = ?", [id]);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    } 
}


const db_Catalog = async function (catalog) {
    try{
        const [results, fields] = await connection.query("SELECT * FROM tb_sanpham WHERE Ma_danh_muc = ?", [catalog]);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    } 
}


const db_Group = async function (c1,c2,c3) {
    try{
        const [results, fields] = await connection.query("SELECT * FROM tb_sanpham WHERE Ma_danh_muc = ? OR Ma_danh_muc = ? OR Ma_danh_muc = ?", [c1, c2, c3]);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    } 
}





const db_BestDiscount = async function (err) {
    try{
        const [results, fields] = await connection.query("SELECT sp.*, gg.Phan_tram, gg.Ngay_bat_dau, gg.Ngay_ket_thuc FROM tb_sanpham sp JOIN tb_giamgia gg ON sp.Ma_san_pham = gg.Ma_san_pham WHERE CURRENT_DATE() < Ngay_ket_thuc ORDER BY gg.Phan_tram DESC LIMIT 1");
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
}



const db_DiscountProduct = async function (err) {
    try{
        const [results, fields] = await connection.query("SELECT sp.* FROM tb_sanpham sp JOIN tb_giamgia gg ON sp.Ma_san_pham = gg.Ma_san_pham WHERE CURDATE() < gg.Ngay_ket_thuc");
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
}









module.exports = {
    db_AllProduct, db_IdProduct, db_Discount, db_Catalog, db_Group, db_BestDiscount, db_DiscountProduct
}