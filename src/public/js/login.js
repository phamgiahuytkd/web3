document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelector(".login_forms");
  const pwShowHide = document.querySelectorAll(".eye-icon");
  const links = document.querySelectorAll(".link_to_login");

  // Show password
  pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
      let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
      let cpwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".cPassword");

      pwFields.forEach(password => {
        if (password.type === "password") {
          password.type = "text";
          eyeIcon.classList.replace("bx-hide", "bx-show");
          return;
        }
        password.type = "password";
        eyeIcon.classList.replace("bx-show", "bx-hide");
      });

      cpwFields.forEach(password => {
        if (password.type === "password") {
          password.type = "text";
          eyeIcon.classList.replace("bx-hide", "bx-show");
          return;
        }
        password.type = "password";
        eyeIcon.classList.replace("bx-show", "bx-hide");
      });
    });
  });

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault(); // Ngăn form submit
      forms.classList.toggle("show-signup");
    });
  });

  // Form validation
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let phone = loginForm.querySelector(".phone");
    let password = loginForm.querySelector(".password");

    let isValid = true;

    if (!phone.value.match(/^\d+$/) || phone.value === "") {
      showError(phone, "phone_error");
      isValid = false;
    } else {
      hideError(phone, "phone_error");
    }

    if (!password.value == "") {
      showError(password, "password_error");
      isValid = false;
    } else {
      hideError(password, "password_error");
    }

    if (isValid) {
      // Submit the form
      loginForm.submit();
    }
  });

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = signupForm.querySelector(".name");
    let phone = signupForm.querySelector(".phone");
    let address = signupForm.querySelector(".address");
    let password = signupForm.querySelector(".password");
    let cPassword = signupForm.querySelector(".cPassword");

    let isValid = true;

    if (!name.value) {
      showError(name, "name_error");
      isValid = false;
    } else {
      hideError(name, "name_error");
    }

    if (!phone.value.match(/^\d+$/) || phone.value === "") {
      showError(phone, "phone_error");
      isValid = false;
    } else {
      hideError(phone, "phone_error");
    }

    if (!address.value) {
      showError(address, "address_error");
      isValid = false;
    } else {
      hideError(address, "address_error");
    }

    if (!password.value.match(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/)) {
      showError(password, "password_error");
      isValid = false;
    } else {
      hideError(password, "password_error");
    }

    if (cPassword.value !== password.value) {
      showError(cPassword, "cPassword_error");
      isValid = false;
    } else {
      hideError(cPassword, "cPassword_error");
    }

    if (isValid) {
      // Submit the form
      sign_account();
    }
  });

  function showError(input, errorClass) {
    const errorElement = input.parentElement.parentElement.querySelector(`.${errorClass}`);
    if (errorElement) {
      errorElement.style.display = "flex";
    }
  }

  function hideError(input, errorClass) {
    const errorElement = input.parentElement.parentElement.querySelector(`.${errorClass}`);
    if (errorElement) {
      errorElement.style.display = "none";
    }
  }
});
