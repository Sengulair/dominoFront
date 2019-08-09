$(function() {
	$(document).ready(function () {

		$('.left .wrapper-full-slider').slick({
			arrows: true,
			prevArrow: $('.left .wrapper-full-slider').prev(),
			nextArrow: $('.left .wrapper-full-slider').next(),
		});

		$('.right .wrapper-full-slider').slick({
			arrows: true,
			prevArrow: $('.right .wrapper-full-slider').prev(),
			nextArrow: $('.right .wrapper-full-slider').next(),
		});

		const options = {
			separation: 90,
			horizonOffset: 0,
			sizeMultiplier: 0.9,
			separationMultiplier: 1,
			forcedImageWidth: 600,
			forcedImageHeight: 400,
			opacityMultiplier: 1,
		}
		$('#order-popup .office-name')[0].innerText = '';
		
		$('.list-areas li .wrapper-area').on('click', function() {
			$(this).parent().toggleClass('opened');
		})

		$('.list-areas .popup-button').on('click', function() {
			$('#order-popup .office-name')[0].innerText = $(this).parent().parent().find('.area-name')[0].innerText;
		})

		$('.wrapper-header .popup-button').on('click', function() {
			$('#order-popup .office-name')[0].innerText = '';
		})

		$('.mapplic-popup-link').click(function() {
			let id = $(this).attr('href').slice(1);
			if ($('.mapplic-fullscreen')[0]) {
				$('.mapplic-element.mapplic-fullscreen').removeClass('mapplic-fullscreen');
				$(document).resize();
			}
			!document.getElementById(id).classList.contains('opened') && document.getElementById(id).firstElementChild.click();
		})

		$('.list-areas li .wrapper-area').one('click', function() {
			let slider;
			const $slider = $(this).parent().children('.wrapper-content-item').children('.waterwheel-carousel');
			if (window.innerWidth > 1199) {
				slider = $slider.waterwheelCarousel(options);
			} else if (window.innerWidth <= 1199 && window.innerWidth > 991) {
				slider = $slider.waterwheelCarousel(Object.assign({}, options, {separation: 60, forcedImageWidth: 530, forcedImageHeight: 360}))
			} else if (window.innerWidth <= 991 && window.innerWidth > 767) {
				slider = $slider.waterwheelCarousel(Object.assign({}, options, {separation: 40, forcedImageWidth: 350, forcedImageHeight: 270}))
			} else if (window.innerWidth > 575) {
				slider = $slider.waterwheelCarousel(Object.assign({}, options, {separation: 30, forcedImageWidth: 310, forcedImageHeight: 220}))
			} else {
				slider = $slider.waterwheelCarousel(Object.assign({}, options, {separation: 0, forcedImageWidth: 205, forcedImageHeight: 275}))
			}
			$(this).parent().children('.wrapper-content-item').children('.prev-slide').click(function() {
				slider.prev();
			})
			$(this).parent().children('.wrapper-content-item').children('.next-slide').click(function() {
				slider.next();
			})
			$(this).click(() => {
				$(this).parent().hasClass('opened') && recalculateSlider(slider)
			})
			$(window).resize(() => {
				$(this).parent().hasClass('opened') && recalculateSlider(slider)
			})
		})

		function recalculateSlider(slider) {
			if (window.innerWidth > 1199) {
				slider.reload(options);
			} else if (window.innerWidth <= 1199 && window.innerWidth > 991) {
				slider.reload(Object.assign({}, options, {separation: 60, forcedImageWidth: 530, forcedImageHeight: 360}))
			} else if (window.innerWidth <= 991 && window.innerWidth > 767) {
				slider.reload(Object.assign({}, options, {separation: 40, forcedImageWidth: 350, forcedImageHeight: 270}))
			} else if (window.innerWidth > 575) {
				slider.reload(Object.assign({}, options, {separation: 30, forcedImageWidth: 310, forcedImageHeight: 220}))
			} else {
				slider.reload(Object.assign({}, options, {separation: 0, forcedImageWidth: 205, forcedImageHeight: 275}))
			}
		}

		$('.popup-button').click(function() { 
			$('#order-popup').fadeIn().addClass('active-popup');
		});

		$(document).mouseup(function (e) {
			var popup = $('.active-popup').children();
			if (e.target!=popup[0] && popup.has(e.target).length === 0){
				popup.parent().fadeOut().removeClass('active-popup');
			}
		});

		$('.wrapper-item:first-child .more').click(function() {
			$('.wrapper-item.with-map.right').toggleClass('opened');
			if ($('.wrapper-item.with-map.right').hasClass('opened')) {
				$(this).html('скрыть');
			} else {
				$(this).html('подробнее');
			}
			$('.wrapper-slider-outer.left').toggleClass('opened');
		})
		$('.wrapper-item:last-child .more').click(function() {
			$('.wrapper-item.with-map.left').toggleClass('opened');
			if ($('.wrapper-item.with-map.left').hasClass('opened')) {
				$(this).html('скрыть');
			} else {
				$(this).html('подробнее');
			}
			$('.wrapper-slider-outer.right').toggleClass('opened');
		})
	});
});
