/*=============== Search product ===============*/
const search = document.querySelector('.search-box input');
let table_rows = document.querySelectorAll('tbody tr');
const table_headings = document.querySelectorAll('thead th');

search.addEventListener('input', searchTable);

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })
    document.querySelectorAll('.product-table tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

/*=============== SORT TABLE ===============*/
window.onload = function () {
    document.querySelectorAll('th').forEach((element) => { // Table headers
        element.addEventListener('click', function () {
            let table = this.closest('table');

            // If the column is sortable
            if (this.querySelector('span')) {
                let order_icon = this.querySelector('span');
                let order = encodeURI(order_icon.innerHTML).includes('%E2%86%91') ? 'desc' : 'asc';
                let separator = '-----'; // Separate the value of it's index, so data keeps intact

                let value_list = {}; // <tr> Object
                let obj_key = []; // Values of selected column

                let string_count = 0;
                let number_count = 0;

                // <tbody> rows
                table.querySelectorAll('tbody tr').forEach((line, index_line) => {
                    // Value of each field
                    let key = line.children[element.cellIndex].textContent.toUpperCase();

                    // Check if value is date, numeric or string
                    if (line.children[element.cellIndex].hasAttribute('data-timestamp')) {
                        // if value is date, we store it's timestamp, so we can sort like a number
                        key = line.children[element.cellIndex].getAttribute('data-timestamp');
                    }
                    else if (key.replace('-', '').match(/^[0-9,.]*$/g)) {
                        number_count++;
                    }
                    else {
                        string_count++;
                    }

                    value_list[key + separator + index_line] = line.outerHTML.replace(/(\t)|(\n)/g, ''); // Adding <tr> to object
                    obj_key.push(key + separator + index_line);
                });
                if (string_count === 0) { // If all values are numeric
                    obj_key.sort(function (a, b) {
                        return a.split(separator)[0] - b.split(separator)[0];
                    });
                }
                else {
                    obj_key.sort();
                }

                if (order === 'desc') {
                    obj_key.reverse();
                    order_icon.innerHTML = '   &darr;';
                }
                else {
                    order_icon.innerHTML = '   &uarr;';
                }

                let html = '';
                obj_key.forEach(function (chave) {
                    html += value_list[chave];
                });
                table.getElementsByTagName('tbody')[0].innerHTML = html;

                // Reinitialize select check functionality after sorting
                initializeSelectCheck();

                // Reapply search functionality
                table_rows = document.querySelectorAll('tbody tr');
                searchTable();
            }
        });
    });

    // Initialize select check functionality on load
    initializeSelectCheck();
}

/* ========== CHECKED SELECT PRODUCT ==========*/
function initializeSelectCheck() {
    var main = document.getElementById('SelectAll');
    var select = document.getElementsByClassName('select');

    for (let i = 0; i < select.length; i++) {
        var count = 0;
        select[i].onclick = () => {
            if (select[i].checked == true) {
                count += 1;
            }
            else {
                count -= 1;
            }

            if (count > 0) {
                main.checked = true;
                document.querySelector('.disabled').style.cursor = 'pointer';
                document.querySelector('.disabled').style.opacity = '1';
                document.querySelector('.disabled').removeAttribute('disabled');
            }
            if (count <= 0) {
                main.checked = false;
                document.querySelector('.disabled').style.cursor = 'not-allowed';
                document.querySelector('.disabled').style.opacity = '0.6';
                document.querySelector('.disabled').setAttribute('disabled', '');
            }
        }
    }

    main.onclick = () => {
        if (main.checked == true) {
            for (let i = 0; i < select.length; i++) {
                select[i].checked = true;
                count = i + 1;
                document.querySelector('.disabled').style.cursor = 'pointer';
                document.querySelector('.disabled').style.opacity = '1';
                document.querySelector('.disabled').removeAttribute('disabled');
            }
        }
        else {
            for (let i = 0; i < select.length; i++) {
                select[i].checked = false;
                count = 0;
                document.querySelector('.disabled').style.cursor = 'not-allowed';
                document.querySelector('.disabled').style.opacity = '0.6';
                document.querySelector('.disabled').setAttribute('disabled', '');
            }
        }
    }
}

/*========== CHỌN ẢNH MODAL THÊM SẢN PHẨM ==========*/
let fileInput = document.getElementById("file-input_product");
let imageContainer = document.getElementById("upload_product_images");
let numOfFiles = document.getElementById("num-of-files_product");

function preview() {
    imageContainer.innerHTML = "";
    numOfFiles.textContent = `${fileInput.files.length} ảnh được chọn`;

    for (i of fileInput.files) {
        let reader = new FileReader();
        let figure = document.createElement("figure");
        let figCap = document.createElement("figcaption");
        figCap.innerText = i.name;
        figure.appendChild(figCap);
        reader.onload = () => {
            let img = document.createElement("img");
            img.setAttribute("src", reader.result);
            figure.insertBefore(img, figCap);
        }
        imageContainer.appendChild(figure);
        reader.readAsDataURL(i);
    }
}

/*========== CHỌN ẢNH MODAL CHỈNH SỬA SẢN PHẨM ==========*/
let fileInput_edit = document.getElementById("file-input_product-edit");
let imageContainer_edit = document.getElementById("upload_product_images-edit");
let numOfFiles_edit = document.getElementById("num-of-files_product-edit");

function preview_edit() {
    imageContainer_edit.innerHTML = "";
    numOfFiles_edit.textContent = `${fileInput_edit.files.length} ảnh được chọn`;

    for (i of fileInput_edit.files) {
        let reader = new FileReader();
        let figure = document.createElement("figure");
        let figCap = document.createElement("figcaption");
        figCap.innerText = i.name;
        figure.appendChild(figCap);
        reader.onload = () => {
            let img = document.createElement("img");
            img.setAttribute("src", reader.result);
            figure.insertBefore(img, figCap);
        }
        imageContainer_edit.appendChild(figure);
        reader.readAsDataURL(i);
    }
}

/*========== MODAL THÊM SẢN PHẨM & BẪY LỖI SẢN PHẨM ==========*/
// Function to open the modal
function openModal() {
    document.getElementById("add_product_Modal").style.display = "block";
}

// Function to close the modal
function closeModal() {
    document.getElementById("add_product_Modal").style.display = "none";
}

// Event listener for the close button
document.querySelector('.close').addEventListener('click', closeModal);

/*========== MODAL SỬA SẢN PHẨM & BẪY LỖI SẢN PHẨM ==========*/
// Function to open the modal
function openModal_edit(Ma_san_pham, Ten_san_pham, Mo_ta_san_pham, Hinh_anh, Don_gia, So_luong, Ma_danh_muc) {
    
    
    // Hiển thị modal
    document.getElementById("edit_product_Modal").style.display = "block";
    
    // Cập nhật giá trị vào các input và textarea
    document.getElementById("product_code-edit").value = Ma_san_pham;
    document.getElementById("product_name-edit").value = Ten_san_pham;
    document.getElementById("product_price-edit").value = Don_gia;
    document.getElementById("product_quantity-edit").value = So_luong;
    document.getElementById("productDescription-edit").value = Mo_ta_san_pham;
    
    // Cập nhật danh mục sản phẩm
    document.getElementById("productCategory-edit").value = Ma_danh_muc;
    document.getElementById("old_images").value = Hinh_anh;
    
    // Cập nhật ảnh sản phẩm
    var uploadImagesContainer = document.getElementById("upload_product_images-edit");
    uploadImagesContainer.innerHTML = ''; // Xóa các ảnh hiện tại
    
    // Tách chuỗi Hinh_anh thành mảng các tên tệp ảnh
    var images = Hinh_anh.split(',');
    images.forEach(function(src) {
        var imgElement = document.createElement("img");
        imgElement.src = '/product_img/' +  src.trim();
        imgElement.alt = "";
        uploadImagesContainer.appendChild(imgElement);
    });
}

// Function to close the modal
function closeModal_edit() {
    document.getElementById("edit_product_Modal").style.display = "none";
}

// Event listener for the close button
document.querySelector('.close').addEventListener('click', closeModal_edit);

/*========== MODAL XEM CHI TIẾT SẢN PHẨM ==========*/
// Function to open the modal
function openModal_view() {
    document.getElementById("view_product_Modal").style.display = "block";
}

// Function to close the modal
function closeModal_view() {
    document.getElementById("view_product_Modal").style.display = "none";
}

// Event listener for the close button
document.querySelector('.close').addEventListener('click', closeModal_view);

/*========== MODAL XÓA SẢN PHẨM ==========*/
// Function to open the modal


// Function to close the modal
function closeModal_delete() {
    document.getElementById("delete_product_Modal").style.display = "none";
}

// Event listener for the close button
document.querySelector('.close').addEventListener('click', closeModal_delete);







/* ===== BẪY LỖI THÊM SẢN PHẨM ===== */
document.getElementById("addProductForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => el.innerText = "");
    document.querySelectorAll("input, textarea").forEach(el => el.classList.remove("error-input"));

    // Validate product code
    const productCode = document.getElementById("product_code");
    if (!productCode.value.trim()) {
      valid = false;
      productCode.classList.add("error-input");
      document.getElementById("error_product_code").innerText = "Mã không được để trống";
    }

    // Validate product name
    const productName = document.getElementById("product_name");
    if (!productName.value.trim()) {
      valid = false;
      productName.classList.add("error-input");
      document.getElementById("error_product_name").innerText = "Tên sản phẩm không được để trống";
    }

    // Validate product price
    const productPrice = document.getElementById("product_price");
    if (!productPrice.value.trim() || isNaN(productPrice.value)) {
      valid = false;
      productPrice.classList.add("error-input");
      document.getElementById("error_product_price").innerText = "Giá bán không được để trống và chỉ có thể nhập số";
    }

    // Validate product quantity
    const productQuantity = document.getElementById("product_quantity");
    if (!productQuantity.value.trim() || isNaN(productQuantity.value)) {
      valid = false;
      productQuantity.classList.add("error-input");
      document.getElementById("error_product_quantity").innerText = "Số lượng không được để trống và chỉ có thể nhập số";
    }

    // Validate product images
    const productImages = document.getElementById("file-input_product");
    if (productImages.files.length === 0) {
      valid = false;
      productImages.classList.add("error-input");
      document.getElementById("error_file_input").innerText = "Phải chọn ít nhất một hình ảnh";
    }

    if (valid) {
        addProduct();
        alert("Đã thêm sản phẩm");
    }
  });


  

  /* ===== BẪY LỖI CHỈNH SỬA SẢN PHẨM ===== */
  document.getElementById("editProductForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => el.innerText = "");
    document.querySelectorAll("input, textarea").forEach(el => el.classList.remove("error-input"));

    // Validate product name
    const productName_edit = document.getElementById("product_name-edit");
    if (!productName_edit.value.trim()) {
      valid = false;
      productName_edit.classList.add("error-input");
      document.getElementById("error_product_name-edit").innerText = "Tên sản phẩm không được để trống";
    }

    // Validate product price
    const productPrice_eidt = document.getElementById("product_price-edit");
    if (!productPrice_eidt.value.trim() || isNaN(productPrice_eidt.value)) {
      valid = false;
      productPrice_eidt.classList.add("error-input");
      document.getElementById("error_product_price-edit").innerText = "Giá bán chỉ có thể nhập số và không thể để trống";
    }

    // Validate product quantity
    const productQuantity_eidt = document.getElementById("product_quantity-edit");
    if (!productQuantity_eidt.value.trim() || isNaN(productQuantity_eidt.value)) {
      valid = false;
      productQuantity_eidt.classList.add("error-input");
      document.getElementById("error_product_quantity-edit").innerText = "Số lượng chỉ có thể nhập số và không thể để trống";
    }

    // Validate product images
    const productImages_edit = document.getElementById("file-input_product-edit");
    if (productImages_edit.files.length === 0) {
      valid = false;
      productImages_edit.classList.add("error-input");
      document.getElementById("error_file_input-edit").innerText = "Phải chọn ít nhất một hình ảnh";
    }

    if (valid) {
      alert("Đã cập nhật sản phẩm.");
    }
  });
