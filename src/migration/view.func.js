function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const formattedDateTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDateTime;
}

function formatTrangThai(trangThai) {
    if(trangThai === 2){
        return 'Đã duyệt';
    }else if(trangThai === 1){
        return 'Chờ duyệt';
    }else{
        return 'Đã hủy';
    }
}

function formatTien(tongTien) {
    return tongTien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatSoDienThoai(soDienThoai) {
    // Đảo ngược chuỗi số điện thoại
    const reversedPhoneNumber = soDienThoai.split('').reverse().join('');

    // Sử dụng mẫu regex và định dạng lại chuỗi
    const formattedPhoneNumber = reversedPhoneNumber.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3');

    // Đảo ngược lại chuỗi đã định dạng
    const reversedFormattedPhoneNumber = formattedPhoneNumber.split('').reverse().join('');

    return reversedFormattedPhoneNumber;
}

function formatNgayThangNam(dateStr) {
    let dateParts;

    if (dateStr instanceof Date) {
        const day = dateStr.getDate().toString().padStart(2, '0');
        const month = (dateStr.getMonth() + 1).toString().padStart(2, '0');
        const year = dateStr.getFullYear();
        return `${day}/${month}/${year}`;
    } else if (typeof dateStr === 'string') {
        dateParts = dateStr.split('-');
    } else {
        return '';
    }

    if (dateParts.length === 3) {
        return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    } else {
        return '';
    }
}

module.exports = {
    formatTien, formatTrangThai, formatDateTime, formatSoDienThoai, formatNgayThangNam
}
