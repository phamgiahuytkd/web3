let images = Array.from(document.querySelectorAll('#images img'));
let currentIndex = 0;

function showImage(index) {
    const productImage = document.getElementById("productImage");
    productImage.src = images[index].src;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

document.addEventListener("DOMContentLoaded", function() {
    showImage(currentIndex);
});
