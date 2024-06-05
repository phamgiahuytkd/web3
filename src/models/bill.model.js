const connection = require('../config/database');



const ad_Bill = async function (Ma_hoa_don , makhachhang, Thoi_gian_xuat_hoa_don, Dia_chi, Tong_tien) {
    try{
        const [results, fields] = await connection.query("INSERT INTO `tb_hoadon` (`Ma_hoa_don`, `makhachhang`, `Thoi_gian_xuat_hoa_don`, `Dia_chi`, `Tong_tien`, `Trang_thai`) VALUES (?, ?, ?, ?, ?, 0);", [Ma_hoa_don , makhachhang, Thoi_gian_xuat_hoa_don, Dia_chi, Tong_tien]);
        return true;

    }catch(err){
        console.log(err);
        throw new Error('Database query failed');
    }
    
}


const ad_DetailBill = async function (Ma_hoa_don , Ma_san_pham, Ten_san_pham, So_luong, Don_gia, Tong_tien) {
    try{
        const [results, fields] = await connection.query("INSERT INTO `tb_chitiethoadon` (`Ma_hoa_don`, `Ma_san_pham`, `Ten_san_pham`, `So_luong`, `Don_gia`, `Tong_tien`) VALUES ( ?, ?, ?, ?, ?, ?)", [Ma_hoa_don , Ma_san_pham, Ten_san_pham, So_luong, Don_gia, Tong_tien]);
        return true;

    }catch(err){
        console.log(err);
        throw new Error('Database query failed');
    }
    
}


const db_AllBill = async function (err) {
    try{
        const [results, fields] = await connection.query("SELECT * FROM tb_hoadon");
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
}



const get_BillDetail = async function (Ma_hoa_don) {
    try{
        const [results, fields] = await connection.query("SELECT * FROM tb_chitiethoadon WHERE Ma_hoa_don = ?", [Ma_hoa_don]);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
}



module.exports = {
    ad_Bill, ad_DetailBill, db_AllBill, get_BillDetail
}