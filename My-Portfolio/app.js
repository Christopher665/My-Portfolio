// Sticky Navigation Menu Js

let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");

let val;

window.onscroll = function() {
  if(document.documentElement.scrollTop > 20){
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  }else{
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }
}

// Side Navigation Menu Js
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");

menuBtn.onclick = function() {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflowX = "hidden";
  scrollBtn.style.pointerEvents = "none";
}

cancelBtn.onclick = function() {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflowX = "auto";
  scrollBtn.style.pointerEvents = "auto";
}

// Side Navigation Bar Close While We click On Navigation Links

let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click" , function() {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}

(function () {
  
  class ImageViewer {
    
    constructor(parentSelector) {
      if (typeof parentSelector === 'string') {
        this.parentSelector = parentSelector;
      }
      this.imgSelector = this.parentSelector && this.parentSelector + ' .image-viewer .nav img';
      this.navSelector = this.parentSelector && this.parentSelector + ' .image-viewer .nav';
      this.nav = document.querySelector(this.navSelector);
      this.pics = document.querySelectorAll(this.imgSelector) || [];
      this.activeIndex = -1; // 0-based
      if (this.pics.length > 0) {
        this.setupEventHandler();
        this.activeIndex = 0;
      }
    }
    
    /**
     * set the specified index picture to be actived
     */
    active(index) {
      if (typeof index === 'number' && this.pics.length >= index) {
          this.clearActive();
        
          setTimeout(() => this.moveNav(index), 500);
          this.pics[index].classList.add('active');
          this.activeIndex = index;
      }
    }
    
    activePrev() {
      if (this.activeIndex > 0) {
          this.active(this.activeIndex -1);
      }
    }
    
    activeNext() {
      if (this.pics.length > 0 && this.activeIndex < (this.pics.length - 1)) {
          this.active(this.activeIndex +1);
      }
    }
    
    clearActive() {
      if (this.pics.length > 0 && this.activeIndex >= 0)
      this.pics[this.activeIndex].classList.remove('active');
    }
    
    setupEventHandler() {
      this.pics.forEach((elem, index) => {
        elem.addEventListener('mousedown', () => {
          this.active(index);
        });
        elem.addEventListener('touchstart', () => {
          this.active(index);
        });
      });
      // active by keyboard left-arrow and right-arrow
      if (this.nav) {
        document.body.addEventListener('keydown', (ev) => {
          if (ev.keyCode === 37)
            this.activePrev();
          if (ev.keyCode === 39)
            this.activeNext();
        });
      }
    }
    
    /**
     * Compute the left offset of the nav area
     */
    moveNav(activeIndex) {
      this.nav = document.querySelector(this.navSelector);
      if (!this.nav || activeIndex < 0 || !this.pics[activeIndex]) return;
      let navWidth = parseInt(window.getComputedStyle(this.nav, null).getPropertyValue('width'));
      let activeOffset = this.pics[activeIndex].offsetLeft;
      let activeWidth = parseInt(window.getComputedStyle(this.pics[activeIndex], null).getPropertyValue('width'));
      
      let newLeft = navWidth / 2 - activeWidth / 2 - activeOffset;
      this.nav.style.left = newLeft + 'px';
    }
  }
  
  let imgViewer = new ImageViewer('.container');
  imgViewer.active(0);
  let prevBtn = document.querySelector('#activePrevBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => imgViewer.activePrev());
  }
  let nextBtn = document.querySelector('#activeNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => imgViewer.activeNext());
  }
}());
