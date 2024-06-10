document.addEventListener('DOMContentLoaded', function () {
    // Hàm chuyển đổi ký tự có dấu thành không dấu
    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    // Tìm kiếm trong bảng product table
    const productSearchInput = document.getElementById('product-search-input');
    let productTableRows = document.querySelectorAll('.product-table tbody tr');

    if (productSearchInput) {
        productSearchInput.addEventListener('input', searchProductTable);
    }

    function searchProductTable() {
        productTableRows.forEach((row, i) => {
            let tableData = removeAccents(row.textContent.toLowerCase());
            let searchData = removeAccents(productSearchInput.value.toLowerCase());

            row.classList.toggle('hide', tableData.indexOf(searchData) < 0);
            row.style.setProperty('--delay', i / 25 + 's');
        });
        document.querySelectorAll('.product-table tbody tr:not(.hide)').forEach((visibleRow, i) => {
            visibleRow.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
        });
    }

    // Tìm kiếm trong bảng dis-table
    const disSearchInput = document.getElementById('dis-search-input');
    let disTableRows = document.querySelectorAll('.dis-table tbody tr');

    if (disSearchInput) {
        disSearchInput.addEventListener('input', searchDisTable);
    }

    function searchDisTable() {
        disTableRows.forEach((row, i) => {
            let tableData = removeAccents(row.textContent.toLowerCase());
            let searchData = removeAccents(disSearchInput.value.toLowerCase());

            row.classList.toggle('hide', tableData.indexOf(searchData) < 0);
            row.style.setProperty('--delay', i / 25 + 's');
        });
        document.querySelectorAll('.dis-table tbody tr:not(.hide)').forEach((visibleRow, i) => {
            visibleRow.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
        });
    }

    // Sắp xếp bảng product table
    document.querySelectorAll('.product-table th').forEach((element) => {
        element.addEventListener('click', function () {
            let table = this.closest('table');

            if (this.querySelector('span')) {
                let orderIcon = this.querySelector('span');
                let order = encodeURI(orderIcon.innerHTML).includes('%E2%86%91') ? 'desc' : 'asc';
                let separator = '-----';

                let valueList = {};
                let objKey = [];

                table.querySelectorAll('tbody tr').forEach((line, indexLine) => {
                    let key = line.children[element.cellIndex].textContent.toUpperCase();
                    valueList[key + separator + indexLine] = line.outerHTML.replace(/(\t)|(\n)/g, '');
                    objKey.push(key + separator + indexLine);
                });

                objKey.sort();
                if (order === 'desc') {
                    objKey.reverse();
                    orderIcon.innerHTML = '   &darr;';
                } else {
                    orderIcon.innerHTML = '   &uarr;';
                }

                let html = '';
                objKey.forEach(function (key) {
                    html += valueList[key];
                });
                table.getElementsByTagName('tbody')[0].innerHTML = html;

                // Reapply search functionality
                productTableRows = document.querySelectorAll('.product-table tbody tr');
                searchProductTable();
            }
        });
    });

    // Sắp xếp bảng dis-table
    document.querySelectorAll('.dis-table th').forEach((element) => {
        element.addEventListener('click', function () {
            let table = this.closest('table');

            if (this.querySelector('span')) {
                let orderIcon = this.querySelector('span');
                let order = encodeURI(orderIcon.innerHTML).includes('%E2%86%91') ? 'desc' : 'asc';
                let separator = '-----';

                let valueList = {};
                let objKey = [];

                table.querySelectorAll('tbody tr').forEach((line, indexLine) => {
                    let key = line.children[element.cellIndex].textContent.toUpperCase();
                    valueList[key + separator + indexLine] = line.outerHTML.replace(/(\t)|(\n)/g, '');
                    objKey.push(key + separator + indexLine);
                });

                objKey.sort();
                if (order === 'desc') {
                    objKey.reverse();
                    orderIcon.innerHTML = '   &darr;';
                } else {
                    orderIcon.innerHTML = '   &uarr;';
                }

                let html = '';
                objKey.forEach(function (key) {
                    html += valueList[key];
                });
                table.getElementsByTagName('tbody')[0].innerHTML = html;

                // Reapply search functionality
                disTableRows = document.querySelectorAll('.dis-table tbody tr');
                searchDisTable();
            }
        });
    });

    // Ensure radio buttons work after sorting
    document.addEventListener('click', function (event) {
        if (event.target.name === 'product-radio') {
            document.querySelectorAll('input[name="product-radio"]').forEach((radio) => {
                radio.checked = false;
            });
            event.target.checked = true;
        }
    });
});






//Chọn mã sản phẩm
const radioButtons = document.querySelectorAll('input[name="product-radio"]');
    const productCodeInput = document.getElementById('product_code');

    // Add a change event listener to each radio button
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            // When a radio button is selected, update the text input with its value
            if (radio.checked) {
                productCodeInput.value = radio.value;
            }
        });
    });