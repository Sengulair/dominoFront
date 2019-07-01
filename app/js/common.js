$(function() {

	$(document).ready(function () {

		$('.wrapper-full-slider').slick({
			arrows: true,
			prevArrow: $('.wrapper-full-slider').prev(),
			nextArrow: $('.wrapper-full-slider').next(),
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

		$('.list-areas li .wrapper-area').on('click', function() {
			$(this).parent().toggleClass('opened');
		})

		$('.list-areas li .wrapper-area').one('click', function() {
			const $slider = $(this).parent().children('.wrapper-content-item').children('.waterwheel-carousel');
			let slider;
			$(this).parent().children('.wrapper-content-item').children('.prev-slide').click(function() {
				slider.prev();
			})
			$(this).parent().children('.wrapper-content-item').children('.next-slide').click(function() {
				slider.next();
			})
			
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
			
			$(this).click(function() {
				recalculateSlider(slider);
			})
			$(window).resize(function() {
				recalculateSlider(slider);
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

	});

});
