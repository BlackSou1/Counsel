const slider=document.querySelector(".slider"),sliderWrapper=document.querySelectorAll(".slider__content"),sliderPrev=document.querySelector(".slider__prev"),sliderNext=document.querySelector(".slider__next");let sliderItem=0;sliderNext.addEventListener("click",(function(){sliderItem==sliderWrapper.length-1?(slider.style.transform="translateX(0)",sliderItem=0):(sliderItem++,slider.style.transform="translateX("+-100*sliderItem+"%)")})),sliderPrev.addEventListener("click",(function(){0==sliderItem?(slider.style.transform="translateX("+-100*(sliderWrapper.length-1)+"%)",sliderItem=sliderWrapper.length-1):(sliderItem--,slider.style.transform="translateX("+-100*sliderItem+"%)")}));const numberAnimation=document.querySelectorAll(".number-animation");let numberAnimationValue=new Array,numberAnimationValueBool=new Array,tempNumber=new Array;for(var i=0;i<numberAnimation.length;i++)numberAnimationValue[i]=numberAnimation[i].textContent,numberAnimationValue[i].includes("M")&&(numberAnimationValue[i]=1e6*parseInt(numberAnimationValue[i]),numberAnimationValueBool[i]=!0);const numberAnimationOffset=150;let animationStarted=!1;function numberAnimationCheck(){if(0==animationStarted&&pageYOffset>=numberAnimation[0].offsetTop+150-window.innerHeight){animationStarted=!0;for(var e=0;e<numberAnimation.length;e++)tempNumber[e]=0,numberAnimation[e].classList.remove("number-animation"),numberAnimate(e)}}function numberAnimate(e){tempNumber[e]=Math.floor(tempNumber[e]+numberAnimationValue[e]/500),numberAnimation[e].textContent=tempNumber[e],tempNumber[e]>=numberAnimationValue[e]?(tempNumber[e]=numberAnimationValue[e],numberAnimation[e].textContent=tempNumber[e],numberAnimationValueBool[e]&&(numberAnimation[e].textContent=tempNumber[e]/1e6+"M")):setTimeout(()=>numberAnimate(e),0)}window.onload=()=>numberAnimationCheck(),window.onresize=()=>numberAnimationCheck(),window.onscroll=()=>numberAnimationCheck();