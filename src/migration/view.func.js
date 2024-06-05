
function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const formattedDateTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDateTime;
}

function formatTrangThai(trangThai) {
    return trangThai === 1 ? 'Đã duyệt' : 'Chờ duyệt';
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



module.exports = {
    formatTien, formatTrangThai, formatDateTime, formatSoDienThoai
}