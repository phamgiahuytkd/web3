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






const ad_Bill = async function (Ma_hoa_don , makhachhang, Thoi_gian_xuat_hoa_don, Dia_chi, Tong_tien) {
    try{
        const [results, fields] = await connection.query("INSERT INTO `tb_hoadon` (`Ma_hoa_don`, `makhachhang`, `Thoi_gian_xuat_hoa_don`, `Dia_chi`, `Tong_tien`) VALUES (?, ?, ?, ?, ?);", [Ma_hoa_don , makhachhang, Thoi_gian_xuat_hoa_don, Dia_chi, Tong_tien]);
        return results;

    }catch(err){
        console.log(err);
        throw new Error('Database query failed');
    }
    
}


const ad_DetailBill = async function (Ma_hoa_don , Ma_san_pham, Ten_san_pham, So_luong, Don_gia, Tong_tien) {
    try{
        const [results, fields] = await connection.query("INSERT INTO `tb_chitiethoadon` (`Ma_hoa_don`, `Ma_san_pham`, `Ten_san_pham`, `So_luong`, `Don_gia`, `Tong_tien`) VALUES ( ?, ?, ?, ?, ?, ?)", [Ma_hoa_don , Ma_san_pham, Ten_san_pham, So_luong, Don_gia, Tong_tien]);
        return results;

    }catch(err){
        console.log(err);
        throw new Error('Database query failed');
    }
    
}


module.exports = {
    db_AllProduct, db_IdProduct, db_Discount, db_Catalog, db_Group, db_BestDiscount, db_DiscountProduct, ad_Bill, ad_DetailBill
}