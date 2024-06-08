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
        const [results, fields] = await connection.query("SELECT * FROM tb_hoadon ORDER BY Thoi_gian_xuat_hoa_don");
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



const db_StatisticsCatalog = async function (err) {
    try{
        const [results, fields] = await connection.query(`SELECT dm.Ma_danh_muc, dm.Ten_danh_muc, COALESCE(SUM(cthd.Tong_tien), 0) AS Tong_Doanh_Thu
FROM tb_danhmuc dm
LEFT JOIN tb_sanpham sp ON dm.Ma_danh_muc = sp.Ma_danh_muc
LEFT JOIN tb_chitiethoadon cthd ON sp.Ma_san_pham = cthd.Ma_san_pham
GROUP BY dm.Ma_danh_muc, dm.Ten_danh_muc
`);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
}



const db_StatisticsMonth = async function (err) {
    try{
        const [results, fields] = await connection.query(`
SELECT 
    months.month AS Thang,
    COALESCE(SUM(cthd.Tong_tien), 0) AS Doanh_thu
FROM 
    (SELECT 1 AS month UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL 
    SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12) AS months
LEFT JOIN 
    tb_hoadon hd ON MONTH(hd.Thoi_gian_xuat_hoa_don) = months.month AND YEAR(hd.Thoi_gian_xuat_hoa_don) = YEAR(CURRENT_DATE())
LEFT JOIN 
    tb_chitiethoadon cthd ON hd.Ma_hoa_don = cthd.Ma_hoa_don
GROUP BY 
    months.month
ORDER BY 
    months.month;

`);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
}



const db_Top10Product = async function (err) {
    try{
        const [results, fields] = await connection.query(`
SELECT 
    cthd.Ma_san_pham,
    sp.Ten_san_pham,
    sp.Hinh_anh,
    COUNT(cthd.So_luong) AS So_luong
FROM 
    tb_chitiethoadon cthd
JOIN 
    tb_sanpham sp ON cthd.Ma_san_pham = sp.Ma_san_pham
GROUP BY 
    cthd.Ma_san_pham, sp.Ten_san_pham, sp.Hinh_anh
ORDER BY 
    So_luong DESC

`);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
}

const db_RecentBill = async function (err) {
    try{
        const [results, fields] = await connection.query(`
SELECT 
    hd.Thoi_gian_xuat_hoa_don, 
    kh.Ho_ten, 
    hd.Trang_thai, 
    hd.Tong_tien
FROM 
    tb_hoadon hd
JOIN 
    tb_khachhang kh ON hd.makhachhang = kh.User_ID
ORDER BY 
    hd.Thoi_gian_xuat_hoa_don DESC
LIMIT 9


`);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
}



const db_Overview = async function (err) {
    try{
        const [results, fields] = await connection.query(`
SELECT 
    COALESCE((SELECT COUNT(Ma_hoa_don) FROM tb_hoadon), 0) AS so_luong_hoa_don,
    COALESCE((SELECT COUNT(User_ID) FROM tb_taikhoan WHERE Phan_quyen = 1), 0) AS so_luong_tai_khoan,
    COALESCE((SELECT COUNT(Ma_san_pham) FROM tb_sanpham), 0) AS so_luong_san_pham,
    COALESCE((SELECT SUM(Tong_tien) FROM tb_chitiethoadon), 0) AS tong_doanh_thu



`);
        return results;

    }catch(err){
        throw new Error('Database query failed');
    }
}


module.exports = {
    ad_Bill, ad_DetailBill, db_AllBill, get_BillDetail, db_StatisticsCatalog, db_StatisticsMonth, db_Top10Product, db_RecentBill, db_Overview,

}