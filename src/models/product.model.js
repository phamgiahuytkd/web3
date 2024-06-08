const connection = require('../config/database');

const db_AllProduct = async function (err) {
    try{
        const [results, fields] = await connection.query("SELECT * FROM tb_sanpham WHERE So_luong > 0");
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
        const [results, fields] = await connection.query("SELECT * FROM tb_sanpham WHERE Ma_danh_muc = ? AND So_luong > 0", [catalog]);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    } 
}


const db_Group = async function (c1,c2,c3) {
    try{
        const [results, fields] = await connection.query("SELECT * FROM tb_sanpham WHERE (Ma_danh_muc = ? OR Ma_danh_muc = ? OR Ma_danh_muc = ?) AND So_luong > 0", [c1, c2, c3]);
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




const db_AddProduct = async function (Ma_san_pham, Ten_san_pham, Mo_ta_san_pham, Hinh_anh, Don_gia, So_luong, Ma_danh_muc) {
    try{
        const [results, fields] = await connection.query("INSERT INTO `tb_sanpham` (`Ma_san_pham`, `Ten_san_pham`, `Mo_ta_san_pham`, `Hinh_anh`, `Don_gia`, `So_luong`, `Ma_danh_muc`) VALUES (?, ?, ?, ?, ?, ?, ?)", [Ma_san_pham, Ten_san_pham, Mo_ta_san_pham, Hinh_anh, Don_gia, So_luong, Ma_danh_muc]);
        return true;

    }catch(err){
        console.log(err);
        throw new Error('Database query failed');
    }
}




const db_UpdateProduct = async function (Ma_san_pham, Ten_san_pham, Mo_ta_san_pham, Hinh_anh, Don_gia, So_luong, Ma_danh_muc) {
    try{
        const [results, fields] = await connection.query("UPDATE tb_sanpham SET Ten_san_pham = ?, Mo_ta_san_pham = ?, Hinh_anh = ?, Don_gia = ?, So_luong = ?, Ma_danh_muc = ? WHERE Ma_san_pham = ?", [Ten_san_pham, Mo_ta_san_pham, Hinh_anh, Don_gia, So_luong, Ma_danh_muc, Ma_san_pham]);
        return true;

    }catch(err){
        console.log(err);
        throw new Error('Database query failed');
    }
}


const db_CatalogAdmin = async function (catalog) {
    try{
        const [results, fields] = await connection.query(`SELECT tb_sanpham.*, tb_danhmuc.Ten_danh_muc FROM tb_sanpham JOIN tb_danhmuc ON tb_sanpham.Ma_danh_muc = tb_danhmuc.Ma_danh_muc WHERE tb_sanpham.Ma_danh_muc = ? ORDER BY CASE WHEN tb_sanpham.So_luong = 0 THEN 1 ELSE 0 END, tb_sanpham.Ten_san_pham; `, [catalog]);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
}


const db_AllProductAdmin = async function (err) {
    try{
        const [results, fields] = await connection.query(`SELECT tb_sanpham.*, tb_danhmuc.Ten_danh_muc FROM tb_sanpham JOIN tb_danhmuc ON tb_sanpham.Ma_danh_muc = tb_danhmuc.Ma_danh_muc ORDER BY CASE WHEN tb_sanpham.So_luong = 0 THEN 1 ELSE 0 END, tb_sanpham.Ten_san_pham; `);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
}



const set_Quantity0_Product = async function (Ma_san_pham) {
    try{
        const [results, fields] = await connection.query("UPDATE tb_sanpham SET So_luong = 0 WHERE Ma_san_pham = ?", [Ma_san_pham]);
        return true;

    }catch(err){
        console.log(err);
        throw new Error('Database query failed');
    }
}



module.exports = {
    db_AllProduct, db_IdProduct, db_Discount, db_Catalog, db_Group, db_BestDiscount, db_DiscountProduct, db_AddProduct,
    db_UpdateProduct, db_AllProductAdmin, db_CatalogAdmin, set_Quantity0_Product
}