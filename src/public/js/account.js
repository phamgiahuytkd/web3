// Get all tabs and tab contents
const tabs = document.querySelectorAll('.account__tab');
const tabContents = document.querySelectorAll('.tab__content');

// Show "Tổng quan" content initially
const overviewContent = document.querySelector('#dashboard');
overviewContent.classList.add('active-tab');

// Add event listener to each tab
tabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    // Get the target tab content ID
    const targetId = e.target.getAttribute('data-target');

    // Remove active class from all tabs and tab contents
    tabs.forEach((t) => t.classList.remove('account_active'));
    tabContents.forEach((tc) => tc.classList.remove('active-tab'));

    // Add active class to the current tab and tab content
    e.target.classList.add('account_active');
    document.querySelector(targetId).classList.add('active-tab');

  });
});


// Pop up show box sửa thông tin cá nhân
document.getElementById('changeAddressBtn').onclick = function() {
  document.getElementById('modal').style.display = 'block';
}

document.querySelector('.close').onclick = function() {
  document.getElementById('modal').style.display = 'none';
}

document.getElementById('cancelBtn').onclick = function() {
  document.getElementById('modal').style.display = 'none';
}

// Show password

document.addEventListener('DOMContentLoaded', () => {
  const toggleOldPassword = document.getElementById('toggleOldPassword');
  const toggleNewPassword = document.getElementById('toggleNewPassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

  toggleOldPassword.addEventListener('click', () => {
      const oldPassword = document.getElementById('oldPassword');
      togglePasswordVisibility(oldPassword, toggleOldPassword);
  });

  toggleNewPassword.addEventListener('click', () => {
      const newPassword = document.getElementById('newPassword');
      togglePasswordVisibility(newPassword, toggleNewPassword);
  });

  toggleConfirmPassword.addEventListener('click', () => {
      const confirmPassword = document.getElementById('confirmPassword');
      togglePasswordVisibility(confirmPassword, toggleConfirmPassword);
  });

  function togglePasswordVisibility(passwordField, toggleIcon) {
      if (passwordField.type === 'password') {
          passwordField.type = 'text';
          toggleIcon.classList.remove('bx-hide');
          toggleIcon.classList.add('bx-show');
      } else {
          passwordField.type = 'password';
          toggleIcon.classList.remove('bx-show');
          toggleIcon.classList.add('bx-hide');
      }
  }
});
