function calculateTotal() {
    const checkboxes = document.querySelectorAll('.product-checkbox');
    let totalAmount = 0;
    let itemCount = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const row = checkbox.closest('tr');
            const rowTotal = parseFloat(row.children[4].innerText.replace(' đ', '').replace(/\./g, ''));
            totalAmount += rowTotal;
            itemCount += parseInt(row.querySelector('input[type="number"]').value);
        }
    });

    document.getElementById('totalAmount').innerText = totalAmount.toLocaleString('vi-VN') + ' đ';
    document.getElementById('itemCount').innerText = itemCount + ' sản phẩm';
}







function toggleSelectAll(source) {
    const checkboxes = document.querySelectorAll('.product-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = source.checked);
    calculateTotal();
}

function updateSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.product-checkbox');
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    const someChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    selectAllCheckbox.checked = allChecked;
    selectAllCheckbox.indeterminate = !allChecked && someChecked;
    calculateTotal();
}

function updateQuantity(element, change, Ma_san_pham) {
    const input = element.parentNode.querySelector('input[type="number"]');
    let newValue = parseInt(input.value) + change;
    if (newValue < 1) newValue = 1;
    input.value = newValue;
    updateRowTotal(element);
    calculateTotal();
    // update session cart
    $.ajax({
        type: 'POST',
        url: '/cart/update_cart',
        data: {
           Ma_san_pham: Ma_san_pham,
           So_luong: newValue
        },
        success: function(response) {
            if (response.success) {
                updateCart(response.So_luong);
            } else {
                alert('Vui lòng đăng nhập trước khi mua sản phẩm!');
            }
        },  
        error: function(xhr, status, error) {
            console.error('Lỗi AJAX:', error);
        }
    });
    

}

function updateRowTotal(element) {
    const row = element.closest('tr');
    const price = parseFloat(row.children[2].innerText.replace(' đ', '').replace(/\./g, ''));
    const quantity = parseInt(row.querySelector('input[type="number"]').value);
    const total = price * quantity;
    row.children[4].innerText = total.toLocaleString('vi-VN') + ' đ';
}



function removeProduct(element, Ma_san_pham) {
    const row = element.closest('tr');
    row.parentNode.removeChild(row);
    updateSelectAll();
    calculateTotal();

    // update session cart
    $.ajax({
        type: 'POST',
        url: '/cart/remove_cart',
        data: {
           Ma_san_pham: Ma_san_pham
        },
        success: function(response) {
            if (response.success) {
                updateCart(response.So_luong);
                if (response.So_luong === 0) {
                    window.location.href = '/cart';
                }
            } else {
                alert('Vui lòng đăng nhập trước khi mua sản phẩm!');
            }
        },  
        error: function(xhr, status, error) {
            console.error('Lỗi AJAX:', error);
        }
    });
}











function purchase() {
    const checkboxes = document.querySelectorAll('.product-checkbox');
    const ar_data = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const row = checkbox.closest('tr');
            const hiddenInfoCell = row.querySelector('.hidden-info');
            
            if (hiddenInfoCell) {
                const spans = hiddenInfoCell.querySelectorAll('span');
                const data = {};
                spans.forEach(span => {
                    const key = span.classList[0];
                    const value = span.textContent.trim();
                    data[key] = value;
                });
                data['So_luong'] = parseInt(row.querySelector('input[type="number"]').value);
                ar_data.push(data);
            }
        }
    });

    // Sử dụng promise
    const sendDataPromise = new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: '/pay',
            data: {
                ar_data: ar_data
            },
            success: function(response) {
                resolve(response); // Trả về kết quả thành công
            },  
            error: function(xhr, status, error) {
                reject(error); // Trả về lỗi
            }
        });
    });

    // Xử lý kết quả từ promise
    sendDataPromise.then(response => {
        if (response.success) {
            alert('Xác nhận thanh toán!');
            window.location.href = '/checkout';
        } else {
            alert('Bạn chưa chọn bất kỳ sản phẩm nào!');
        }
    }).catch(error => {
        console.error('Lỗi AJAX:', error);
    });
}



