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

function updateQuantity(element, change) {
    const input = element.parentNode.querySelector('input[type="number"]');
    let newValue = parseInt(input.value) + change;
    if (newValue < 1) newValue = 1;
    input.value = newValue;
    updateRowTotal(element);
    calculateTotal();
}

function updateRowTotal(element) {
    const row = element.closest('tr');
    const price = parseFloat(row.children[2].innerText.replace(' đ', '').replace(/\./g, ''));
    const quantity = parseInt(row.querySelector('input[type="number"]').value);
    const total = price * quantity;
    row.children[4].innerText = total.toLocaleString('vi-VN') + ' đ';
}

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

function removeProduct(element) {
    const row = element.closest('tr');
    row.parentNode.removeChild(row);
    updateSelectAll();
    calculateTotal();
}

