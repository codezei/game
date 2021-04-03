// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
// window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

document.addEventListener('DOMContentLoaded', () => {

	// Custom JS

	function switchLang() {
		let selectedLang = document.querySelector('.switch-lang__selected')
		let selectedLangInner = document.querySelector('.switch-lang__selected--inner')
		let hiddenList = document.querySelector('.switch-lang__list')
		let parentSwith = document.querySelector('.switch-lang')
		parentSwith.addEventListener('click', function (e) {

			if (e.target === selectedLang || e.target === selectedLangInner) {
				e.currentTarget.classList.toggle('open')
			} else if (e.target.classList.contains('switch-lang__btn')) {
				selectedLangInner.innerHTML = e.target.innerText
				e.currentTarget.classList.remove('open')
			}

		})
	}
	switchLang()


	function mobMenuToggle() {
		let mobMenuBtn = document.querySelector('.mob-menu__btn')
		let mobMenu = document.querySelector('.mob-menu')
		let overlay = document.querySelector('.overlay')
		mobMenuBtn.addEventListener('click', function () {
			mobMenu.style.display = "flex"
			overlay.style.display = "block"
			setTimeout(function () {
				document.body.classList.toggle('menu-open')
			}, 100)


		})
		overlay.addEventListener('click', function (e) {
			if (e.target === e.currentTarget || e.target.classList.contains('mob-menu__close') || e.target.classList.contains('mob-menu__link')) {
				document.body.classList.remove('menu-open')
				setTimeout(function () {
					mobMenu.style.display = ""
					overlay.style.display = ""
				}, 400)
			}
		})
	}
	mobMenuToggle();

	function slider() {
		let sliderList = document.querySelector('.slider__list')
		let nextBtn = document.querySelector('.next-btn');
		nextBtn.addEventListener('click', function (e) {
			moveSlide(sliderList);
		})
		touchMoveSlide(sliderList)


		function createSliderNavigation (slides) {
			let navContainer = document.createElement('ul')
			navContainer.classList.add('slider-nav')
			let slideItems = document.querySelectorAll('.slider__item')
			for (let i = 0; i < slideItems.length; i++) {
				let navItem = document.createElement('li')
				navItem.classList.add('slider-nav__item')
				if (i === 0) {
					navItem.classList.add('active')
				}
				navItem.innerHTML = '<span></span>'
				navContainer.appendChild(navItem)
			}
			slides.insertAdjacentElement('afterEnd', navContainer)
		}
		createSliderNavigation (sliderList)

		function toggleNav () {

			let activeNav = document.querySelector('.slider-nav__item.active')
			activeNav.classList.remove('active')

			if (!activeNav.nextElementSibling) {
				let parent = document.querySelector('.slider-nav')
				parent.firstElementChild.classList.add('active')
			} else {
				activeNav.nextElementSibling.classList.add('active')
			}
			

			
		}




		function moveSlide(slides) {
			toggleNav ()
			let active1 = document.querySelector('.slider__item.active-1');
			let active2 = document.querySelector('.slider__item.active-2');
			let active3 = document.querySelector('.slider__item.active-3');
			active1.classList.remove('active-1');
			active1.nextElementSibling.classList.add('active-1');
			slides.append(active1);
			active2.classList.remove('active-2');
			active2.nextElementSibling.classList.add('active-2');
			active3.classList.remove('active-3');
			active3.nextElementSibling.classList.add('active-3');
			if (!active1.classList.contains('move-slide')) {
				active1.classList.add('move-slide');
			}


		}

		function touchMoveSlide(slides) {
			let startCoord = null;
			let directionLeft = null;
			document.addEventListener('touchstart', function (e) {
				startCoord = e;
				directionLeft = false;
			})
			document.addEventListener('touchmove', function (e) {
				if (e) {
					if (e.touches[0].pageY - startCoord.touches[0].pageY < -10) {
						directionLeft = true;
					} else {
						directionLeft = false;
					}
				}
			})
			document.addEventListener("touchend", function (e) {
				if (e.target.classList.contains('slider__item') && !!directionLeft) {
					moveSlide(slides);
				}
				startCoord = null;

			});
		}
	}
	slider()


	function featuresTabs () {
		let tabsParent = document.querySelector('.features-list')
		let tabsTitles = document.querySelectorAll('.features-list__title')
		let parentSection = document.querySelector('.features')
		
		tabsParent.addEventListener('click', function(e) {
			console.log(e.target)
			if (e.target.classList.contains('features-list__title') && !e.target.classList.contains('active')) {
				parentSection.style.height = parentSection.getBoundingClientRect().height + 'px'
				setTimeout(function () {
					parentSection.style.height = ''
				}, 400)
				tabsTitles.forEach(item=> {
					if (item === e.target) {
						item.parentElement.classList.add('active')
						item.nextElementSibling.getBoundingClientRect().height
						item.nextElementSibling.style.height = item.nextElementSibling.getBoundingClientRect().height + 'px'
						console.log(item.nextElementSibling.getBoundingClientRect())
					} else {
						item.parentElement.classList.remove('active')
						item.nextElementSibling.style.height = ''
					}
				})
			}
		})
	}
	featuresTabs ()
	var linkNav = document.querySelectorAll('[href^="#"]'), 
	V = 0.2;  
	for (var i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
			e.preventDefault(); //отменяем стандартное поведение
			var w = window.pageYOffset,  // производим прокрутка прокрутка
			hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
			t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
			start = null;
			requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
			function step(time) {
				if (start === null) start = time;
				var progress = time - start,
				r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
				window.scrollTo(0,r);
				if (r != w + t) {
					requestAnimationFrame(step)
				} else {
					location.hash = hash  // URL с хэшем
				}
			}
		}, false);
}
             

})
