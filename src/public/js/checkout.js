document.getElementById('changeAddressBtn').onclick = function() {
    document.getElementById('modal').style.display = 'block';
}

document.querySelector('.close').onclick = function() {
    document.getElementById('modal').style.display = 'none';
}

document.getElementById('cancelBtn').onclick = function() {
    document.getElementById('modal').style.display = 'none';
}





function checkout_add_bill(Dia_chi, total_Checkout) { 
    // update session cart
    $.ajax({
        type: 'POST',
        url: '/checkout/add_bill',
        data: {
            Dia_chi: Dia_chi,
            total_Checkout: total_Checkout
        },
        success: function(response) {
            if (response.success) {
                alert('Đã đặt hàng!');
                window.location.href = '/cart';
            } else {
                alert('Đặt hàng thất bại!');
            }
        },  
        error: function(xhr, status, error) {
            console.error('Lỗi AJAX:', error);
        }
    });
    

}
