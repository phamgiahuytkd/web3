document.getElementById('changeAddressBtn').onclick = function() {
    document.getElementById('modal').style.display = 'block';
}

document.querySelector('.close').onclick = function() {
    document.getElementById('modal').style.display = 'none';
}

document.getElementById('cancelBtn').onclick = function() {
    document.getElementById('modal').style.display = 'none';
}

