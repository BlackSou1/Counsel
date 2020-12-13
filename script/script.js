const body=document.querySelector("body"),root=document.documentElement,style=getComputedStyle(root);let fixedItem;function bodyLock(){fixedItem=document.querySelectorAll(".fixed-item");const e=window.innerWidth-body.offsetWidth+"px";body.style.overflow="hidden",body.style.marginRight=e,fixedItem.forEach(r=>r.style.paddingRight=e)}function bodyUnlock(){body.style.overflow="",body.style.marginRight="",fixedItem.forEach(e=>e.style.paddingRight="")}const hamburger=document.querySelector(".hamburger"),hamburgerWrapper=document.querySelector(".hamburger__wrapper"),hamburgerButton=document.querySelector(".hamburger__button");let hamburgerOpen=!1;function openHamburger(){0==hamburgerOpen&&(bodyLock(),hamburger.classList.add("hamburger--open"),hamburgerWrapper.classList.add("hamburger__wrapper--open"),hamburgerOpen=!0)}null!=hamburgerButton&&(hamburgerButton.onclick=openHamburger),window.onclick=function(e){hamburgerOpen&&e.target==hamburger&&(hamburgerWrapper.classList.remove("hamburger__wrapper--open"),setTimeout((function(){hamburger.classList.remove("hamburger--open"),hamburgerOpen=!1,bodyUnlock()}),200))};const header=document.querySelector(".header"),headerWrapper=document.querySelector(".header__wrapper");function checkHeader(){pageYOffset>=headerWrapper.offsetHeight+headerWrapper.offsetTop-20?(header.classList.add("fixed-item"),header.classList.add("header--sticky"),headerWrapper.classList.add("header__wrapper--sticky")):(header.classList.remove("fixed-item"),header.classList.remove("header--sticky"),headerWrapper.classList.remove("header__wrapper--sticky"))}window.addEventListener("load",checkHeader),window.addEventListener("resize",checkHeader),window.addEventListener("scroll",checkHeader);const anchors=document.querySelectorAll('a[href^="#"]');let hash;window.location.href.indexOf("#")>-1&&(hash=window.location.hash,""!=hash&&("index"==document.querySelector(hash)&&(window.location.href="index"+hash),null!=document.querySelector(""+hash)&&(document.querySelector(""+hash).scrollIntoView({behavior:"auto",block:"start"}),history.replaceState("",document.title,window.location.pathname+window.location.search)))),window.onload=function(){""!=hash&&null!=document.querySelector(""+hash)&&document.querySelector(""+hash).scrollIntoView({behavior:"smooth",block:"start"})};for(let e of anchors)e.addEventListener("click",(function(r){r.preventDefault();let t=e.getAttribute("href");"#"!=t&&(null==document.querySelector(t)&&(window.location.href="index"+t),hamburger.click(),document.querySelector(""+t).scrollIntoView({behavior:"smooth",block:"start"}))}));const numberAnimation=document.querySelectorAll(".number-animation");let numberAnimationValue=new Array,numberAnimationValueBool=new Array,tempNumber=new Array;for(var i=0;i<numberAnimation.length;i++)numberAnimationValue[i]=numberAnimation[i].textContent,numberAnimationValue[i].includes("M")&&(numberAnimationValue[i]=1e6*parseInt(numberAnimationValue[i]),numberAnimationValueBool[i]=!0);const numberAnimationOffset=150;let animationStarted=!1;function numberAnimationCheck(){if(0==animationStarted&&pageYOffset>=numberAnimation[0].offsetTop+150-window.innerHeight){animationStarted=!0;for(var e=0;e<numberAnimation.length;e++)tempNumber[e]=0,numberAnimation[e].classList.remove("number-animation"),numberAnimate(e)}}function numberAnimate(e){tempNumber[e]=Math.floor(tempNumber[e]+numberAnimationValue[e]/500),numberAnimation[e].textContent=tempNumber[e],tempNumber[e]>=numberAnimationValue[e]?(tempNumber[e]=numberAnimationValue[e],numberAnimation[e].textContent=tempNumber[e],numberAnimationValueBool[e]&&(numberAnimation[e].textContent=tempNumber[e]/1e6+"M")):setTimeout(()=>numberAnimate(e),0)}window.onload=()=>numberAnimationCheck(),window.onresize=()=>numberAnimationCheck(),window.onscroll=()=>numberAnimationCheck();const slider=document.querySelectorAll(".slider"),sliderWrapper=document.querySelectorAll(".slider__wrapper"),sliderImg=document.querySelectorAll(".slider__img"),sliderLink=document.querySelectorAll(".slider__link"),sliderPrevBtn=document.querySelectorAll(".slider__prev"),sliderNextBtn=document.querySelectorAll(".slider__next");let sliderWrapperTranslate=[],sliderWrapperDragOffset=[];for(let e=0;e<slider.length;e++)sliderWrapperTranslate[e]=0,sliderWrapperDragOffset[e]=0;const sliderItem=[];for(let e=0;e<slider.length;e++)sliderItem[e]=slider[e].querySelectorAll(".slider__item");let sliderVisibleItems=[];for(let e=0;e<slider.length;e++){const r=window.getComputedStyle(sliderItem[e][0]);sliderVisibleItems[e]=Math.round(sliderWrapper[e].offsetWidth/(sliderItem[e][0].offsetWidth+parseInt(r.marginRight)+parseInt(r.marginRight)))}let currentSlider=[];for(let e=0;e<slider.length;e++)currentSlider[e]=0;for(let e=0;e<slider.length;e++)sliderNextBtn[e].addEventListener("click",()=>sliderNext(e));for(let e=0;e<slider.length;e++)sliderPrevBtn[e].addEventListener("click",()=>sliderPrev(e));function sliderNext(e){currentSlider[e]>=sliderItem[e].length-sliderVisibleItems[e]?(sliderWrapperTranslate[e]=0,sliderWrapper[e].style.transform="translateX(0)",currentSlider[e]=0):(currentSlider[e]++,sliderWrapperTranslate[e]=currentSlider[e]*(-1*sliderWrapper[e].offsetWidth/sliderVisibleItems[e]),sliderWrapper[e].style.transform="translateX("+sliderWrapperTranslate[e]+"px)")}function sliderPrev(e){0==currentSlider[e]?(sliderWrapperTranslate[e]=(sliderItem[e].length-sliderVisibleItems[e])*(-1*sliderWrapper[e].offsetWidth/sliderVisibleItems[e]),sliderWrapper[e].style.transform="translateX("+sliderWrapperTranslate[e]+"px)",currentSlider[e]=sliderItem[e].length-sliderVisibleItems[e]):(currentSlider[e]--,sliderWrapperTranslate[e]=currentSlider[e]*(-1*sliderWrapper[e].offsetWidth/sliderVisibleItems[e]),sliderWrapper[e].style.transform="translateX("+sliderWrapperTranslate[e]+"px)")}function sliderResize(){for(let e=0;e<slider.length;e++){const r=window.getComputedStyle(sliderItem[e][0]);sliderVisibleItems[e]=sliderWrapper[e].offsetWidth/(sliderItem[e][0].offsetWidth+parseInt(r.marginRight)+parseInt(r.marginRight)),sliderWrapperTranslate[e]=currentSlider[e]*(-1*sliderWrapper[e].offsetWidth/sliderVisibleItems[e]),sliderWrapper[e].style.transform="translateX("+sliderWrapperTranslate[e]+"px)"}}window.addEventListener("resize",sliderResize);let draggedSlider,sliderLinkDragged,sliderDragLinkOffset,scrollX,scrollY,scrollYEnabled,scrollXEnabled,sliderDragged=!1,sliderDragOffset=0;for(let e=0;e<slider.length;e++)slider[e].addEventListener("mousedown",r=>sliderDragStart(r,e)),slider[e].addEventListener("touchstart",r=>sliderDragStart(r,e));window.addEventListener("mousemove",sliderDragMove),window.addEventListener("touchmove",sliderDragMove),window.addEventListener("mouseup",sliderDragEnd),window.addEventListener("touchend",sliderDragEnd);for(let e=0;e<slider.length;e++)slider[e].addEventListener("mouseleave",sliderDragEnd);function sliderLinkClick(e){sliderLinkDragged&&e.preventDefault()}function sliderDragStart(e,r){draggedSlider=r,slider[draggedSlider].classList.add("slider--dragged"),sliderWrapper[draggedSlider].classList.add("slider__wrapper--dragged"),sliderDragged=!0,"touchstart"==e.type?sliderDragOffset=e.touches[0].clientX:(e.preventDefault(),sliderDragOffset=e.clientX,sliderLinkDragged=!1,sliderDragLinkOffset=e.clientX),sliderWrapperDragOffset[draggedSlider]=sliderWrapperTranslate[draggedSlider]}function sliderDragMove(e){if(sliderDragged){const r=10;let t;Math.abs(sliderDragLinkOffset-e.clientX)>r&&(sliderLinkDragged=!0),"touchmove"==e.type?(t=e.touches[0].clientX-sliderDragOffset,sliderDragOffset=e.touches[0].clientX):(t=e.clientX-sliderDragOffset,sliderDragOffset=e.clientX),sliderWrapperDragOffset[draggedSlider]+=t,sliderWrapper[draggedSlider].style.transform="translateX("+sliderWrapperDragOffset[draggedSlider]+"px)",sliderDragCheck()}}function sliderDragCheck(){sliderWrapperTranslate[draggedSlider]<0?sliderWrapperTranslate[draggedSlider]+-1*sliderWrapperDragOffset[draggedSlider]<=sliderWrapper[draggedSlider].offsetWidth/sliderVisibleItems[draggedSlider]*-.3?(sliderDragEnd(),sliderPrev(draggedSlider)):sliderWrapperTranslate[draggedSlider]+-1*sliderWrapperDragOffset[draggedSlider]>=sliderWrapper[draggedSlider].offsetWidth/sliderVisibleItems[draggedSlider]*.3&&(sliderDragEnd(),sliderNext(draggedSlider)):sliderWrapperTranslate[draggedSlider]-sliderWrapperDragOffset[draggedSlider]<=sliderWrapper[draggedSlider].offsetWidth/sliderVisibleItems[draggedSlider]*-.3?(sliderDragEnd(),sliderPrev(draggedSlider)):sliderWrapperTranslate[draggedSlider]-sliderWrapperDragOffset[draggedSlider]>=sliderWrapper[draggedSlider].offsetWidth/sliderVisibleItems[draggedSlider]*.3&&(sliderDragEnd(),sliderNext(draggedSlider))}function sliderDragEnd(){sliderDragged&&(slider[draggedSlider].classList.remove("slider--dragged"),sliderWrapper[draggedSlider].classList.remove("slider__wrapper--dragged"),sliderDragged=!1,sliderWrapper[draggedSlider].style.transform="translateX("+sliderWrapperTranslate[draggedSlider]+"px)")}function scrollStart(e){scrollX=e.touches[0].clientX,scrollY=e.touches[0].clientY,scrollXEnabled=!0,scrollYEnabled=!0}function scrollMove(e){scrollXEnabled&&scrollYEnabled&&(Math.abs(scrollX-e.touches[0].clientX)>10?scrollYEnabled=!1:Math.abs(scrollY-e.touches[0].clientY)>10&&(scrollXEnabled=!1)),0==scrollYEnabled?e.preventDefault():0==scrollXEnabled&&sliderDragEnd()}sliderLink.forEach(e=>e.addEventListener("click",sliderLinkClick)),window.addEventListener("click",(function(){sliderLinkDragged=!1})),window.addEventListener("touchstart",scrollStart),window.addEventListener("touchmove",scrollMove,{passive:!1});const submenu=document.querySelectorAll(".submenu"),submenuButton=document.querySelectorAll(".submenu__button");for(let e=0;e<submenu.length;e++)submenuButton[e].addEventListener("click",()=>submenuToggle(e));function submenuToggle(e){submenuButton[e].classList.contains("submenu__button--open")?submenuClose(e):submenuOpen(e)}function submenuOpen(e){submenu[e].classList.add("submenu--open"),submenuButton[e].classList.add("submenu__button--open")}function submenuClose(e){submenu[e].classList.remove("submenu--open"),submenuButton[e].classList.remove("submenu__button--open")}window.addEventListener("click",(function(e){for(let r=0;r<submenu.length;r++)e.target.closest(".submenu")!=submenu[r]&&e.target.closest(".submenu__button")!=submenuButton[r]&&submenuClose(r)}));