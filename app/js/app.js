// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
// window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

document.addEventListener('DOMContentLoaded', () => {

	// Custom JS

	function switchLang () {
		let selectedLang = document.querySelector('.switch-lang__selected')
		let selectedLangInner = document.querySelector('.switch-lang__selected--inner')
		let hiddenList = document.querySelector('.switch-lang__list')
		let parentSwith = document.querySelector('.switch-lang')
		parentSwith.addEventListener('click', function(e) {

			if (e.target === selectedLang || e.target === selectedLangInner) {
				e.currentTarget.classList.toggle('open')
			} else if (e.target.classList.contains('switch-lang__btn')) {
				selectedLangInner.innerHTML = e.target.innerText
				e.currentTarget.classList.remove('open')
			}
			
		})
	}
	switchLang ()
})
