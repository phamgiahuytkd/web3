function requireLogin(req, res, next) {
    if (req.session.isLoggedIn) {
        // Nếu đã đăng nhập, tiếp tục xử lý yêu cầu
        next();
    } else {
        // Nếu chưa đăng nhập, chuyển hướng hoặc gửi mã lỗi 401
        res.status(401).send('Unauthorized');
    }
}





module.exports = {
    requireLogin
};