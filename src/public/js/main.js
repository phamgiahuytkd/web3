
// HOME MENU
const menuTrigger = document.querySelector('.home_trigger'),
    closeTrigger = document.querySelector('.mini-close'),
    giveClass = document.querySelector('.home_site');

menuTrigger.addEventListener('click', function () {
    giveClass.classList.toggle('showmenu')
})
closeTrigger.addEventListener('click', function () {
    giveClass.classList.remove('showmenu')
})
// SUBMENU
const show_Menu_button = document.querySelectorAll('.has-child > a'),
    modalheight = document.querySelector('.menu_list');

show_Menu_button.forEach((item) => item.parentNode.classList.remove('expand'));
show_Menu_button.forEach((menu) => menu.addEventListener('click', function () {
    let modal = document.querySelector('.menu_list')
    modal.classList.toggle('show_submenu')

    if (this.parentNode.classList != 'expand') {
        this.parentNode.classList.toggle('expand')
    }
    if (!modal.classList.contains('show_submenu')) {
        modal.style.height = modalheight + 'px';
    } else {
        modal.style.height = (this.parentNode.querySelector('ul').offsetHeight + 45) + 'px';
    }

    // back button
    menu.parentNode.querySelector('.menu_back').addEventListener('click', function () {
        modal.style.height = 'auto';
        modal.classList.remove('show_submenu');
        menu.parentNode.classList.remove('expand')
    })
}))

// MINI MENU
// const topMenu = document.querySelectorAll('.top li a');
// for (let i = 0; i < topMenu.length; i++) {
//     topMenu[i].addEventListener('click', function () {
//         let current = document.querySelectorAll('.active');

//         // remove active class
//         if (this.classList.contains('active')) {
//             this.classList.remove('active');
//             document.querySelector(`#${this.className}`).classList.remove('active');
//             return;
//         }
//         // nếu không có active class
//         if (current.length > 0) {
//             current[0].classList.remove('active');
//             document.querySelector(`#${current[0].className}`).classList.remove('active');
//         }
//         // thêm active vào ID
//         document.querySelector(`#${this.className}`).classList.add('active');
//         // thêm active class vào current/clicked btn
//         this.classList.add('active')
//     })
// }

// js code to toggle search box
const searchToggle = document.querySelector(".searchToggle");
searchToggle.addEventListener("click", () => {
    searchToggle.classList.toggle("active");
});


// HIỆU ỨNG CUỘN TRANG
// const sections = document.querySelectorAll("[data-section]");

// const scrollReveal = function () {
//   for (let i = 0; i < sections.length; i++) {
//     if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
//       sections[i].classList.add("active");
//     }
//   }
// }
// scrollReveal();
// addEventOnElem(window, "scroll", scrollReveal);

// header sticky & back top btn active
// const header = document.querySelector("[data-header]");
// const backTopBtn = document.querySelector("[data-back-top-btn]");

// const headerActive = function () {
//     if (window.scrollY > 150) {
//         header.classList.add("active");
//         backTopBtn.classList.add("active");
//     } else {
//         header.classList.remove("active");
//         backTopBtn.classList.remove("active");
//     }
// }

// addEventOnElem(window, "scroll", headerActive);

// let lastScrolledPos = 0;

// const headerSticky = function () {
//     if (lastScrolledPos >= window.scrollY) {
//         header.classList.remove("header-hide");
//     } else {
//         header.classList.add("header-hide");
//     }

//     lastScrolledPos = window.scrollY;
// }

// addEventOnElem(window, "scroll", headerSticky);