/**
 * Created by stefan on 28-03-2019.
 *
 */

(function () {
  'use strict';

  const openBtn = document.querySelector('.hamburger__button');
  const closeBtn = document.querySelector('.close__button');
  const menuOverlay = document.querySelector('.menu-overlay');
  const navTopHidden = document.querySelector('.nav--top');

  // console.log(closeBtn);

  /** 
   *  Functions
  */

  function closeMenu() {
    menuOverlay.classList.remove('menu-overlay--visible');
    navTopHidden.classList.remove('nav--hidden');
  }

  function openMenu() {
    menuOverlay.classList.toggle('menu-overlay--visible');
    navTopHidden.classList.add('nav--hidden');
  }

  openBtn.addEventListener('click', openMenu);

  closeBtn.addEventListener('click', closeMenu);

})();