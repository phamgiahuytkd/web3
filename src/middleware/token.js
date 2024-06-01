require('dotenv').config();


const secretKey = process.env.SECRET_KEY; // Thay thế bằng secret key thực tế// Mảng lưu trữ các refresh token đã tạo


const crypto = require('crypto');

const createToken = (user) => {
    const iv = crypto.randomBytes(16); // Tạo một IV ngẫu nhiên
    const cipher = crypto.createCipheriv('aes-256-cbc', crypto.scryptSync(secretKey, 'salt', 32), iv);
    let token = cipher.update(JSON.stringify(user), 'utf8', 'hex');
    token += cipher.final('hex');
    return iv.toString('hex') + ':' + token; // Kết hợp IV với token
};

const decodeToken = (token) => {
    const parts = token.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = parts.join(':');
    const decipher = crypto.createDecipheriv('aes-256-cbc', crypto.scryptSync(secretKey, 'salt', 32), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
};







module.exports = {
    createToken, decodeToken, 
};
