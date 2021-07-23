// =================================
// ======= Registration form =======
// =================================
const form = document.getElementById('reg');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	checkInputs();
	const regControls = document.querySelectorAll('.reg__control.success');

	if (regControls.length == 4) {
		const regChecks = document.querySelectorAll('.reg__check');
		const regComplete = document.getElementById('reg__complete');

		form.className = 'reg hidden';
		for (regCheck of regChecks) {
			regCheck.className = 'reg__check hidden';
			regComplete.className = 'reg__complete block';
		}
	}

	if (regCompleteClass.classList.contains('block')) {
		feedbackUsername.value = username.value.trim();
		feedbackEmail.value = email.value.trim();
	}
});

const checkInputs = () => {
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();

	if (usernameValue === '') {
		setErrorFor(username);
	} else {
		setSuccessFor(username);
	}

	if (emailValue === '') {
		setErrorFor(email);
	} else if (!isEmail(emailValue)) {
		setErrorFor(email);
	} else {
		setSuccessFor(email);
	}

	if (passwordValue === '') {
		setErrorFor(password);
	} else {
		setSuccessFor(password);
	}

	if (password2Value === '') {
		setErrorFor(password2);
	} else if (passwordValue !== password2Value) {
		setErrorFor(password2);
	} else {
		setSuccessFor(password2);
	}
};

const setErrorFor = (input) => {
	const formControl = input.parentElement;

	formControl.className = 'reg__control error';
};

const setSuccessFor = (input) => {
	const formControl = input.parentElement;

	formControl.className = 'reg__control success';
};

const isEmail = email => {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};



// =============================
// ======= Feedback form =======
// =============================
const feedbackForm = document.getElementById('connectionForm');
const feedbackUsername = document.getElementById('usernameCon');
const feedbackEmail = document.getElementById('emailCon');
const regCompleteClass = document.querySelector('.reg__complete');

feedbackForm.addEventListener('submit', (e) => {
	e.preventDefault();

	feedbackCheckInputs();
});

const feedbackCheckInputs = () => {
	const feedbackUsernameValue = feedbackUsername.value.trim();
	const feedbackEmailValue = feedbackEmail.value.trim();

	if (feedbackUsernameValue === '') {
		feedbackSetErrorFor(feedbackUsername);
	} else {
		feedbackSetSuccessFor(feedbackUsername);
	}

	if (feedbackEmailValue === '') {
		feedbackSetErrorFor(feedbackEmail);
	} else if (!feedbackIsEmail(feedbackEmailValue)) {
		feedbackSetErrorFor(feedbackEmail);
	} else {
		feedbackSetSuccessFor(feedbackEmail);
	}
};

const feedbackSetErrorFor = (input) => {
	const formControl = input.parentElement;

	formControl.className = 'connection__control error';
};

const feedbackSetSuccessFor = (input) => {
	const formControl = input.parentElement;

	formControl.className = 'connection__control success';
};

const feedbackIsEmail = email => {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};



$(function () {
	// ========================
	// ========= Modal ========
	// ========================
	const modalCall = $("[data-modal]");
	const modalCompleteCall = $("[data-complete]");
	const modalCancelCall = $("[data-cancel]");
	const modalClose = $("[data-close]");
	const modalCloseComplete = $("[data-closeCC]");
	const modalCloseCancel = $("[data-closeCCC]");

	modalCompleteCall.on("click", function (e) {
		e.preventDefault();

		if ($('.reg__complete').hasClass('block')) {
			let $this = $(this);
			let CompleteId = $this.data(`complete`);

			$(CompleteId).addClass('flex');
		}
	});

	modalCancelCall.on("click", function (e) {
		e.preventDefault();

		if (!$('.reg__complete').hasClass('block')) {
			let $this = $(this);
			let cancelId = $this.data(`cancel`);

			$(cancelId).addClass('flex');
		}
	});

	modalCloseComplete.on("click", function (e) {
		e.preventDefault();

		let $this = $(this);
		let completeParent = $this.parents('.modal__complete');

		completeParent.removeClass('flex');
	});

	modalCloseCancel.on("click", function (e) {
		e.preventDefault();

		let $this = $(this);
		let cancelParent = $this.parents('.modal__cancel');

		cancelParent.removeClass('flex');
	});

	modalCall.on("click", function (e) {
		e.preventDefault();

		let $this = $(this);
		let modalId = $this.data(`modal`);

		$(modalId).addClass('show');
		$("body").addClass('no-scroll');

		setTimeout(function () {
			$(modalId).find(".modal__dialog").css({
				transform: "rotateY(0)"
			});
		}, 200);

		$("[data-slider='modalSlider']").slick('setPosition');
	});

	modalClose.on("click", function (e) {
		e.preventDefault();

		let $this = $(this);
		let modalParent = $this.parents('.modal');

		modalParent.find(".modal__dialog").css({
			transform: "rotateY(90deg)"
		});

		setTimeout(function () {
			modalParent.removeClass('show');
			$("body").removeClass('no-scroll');
		}, 200);
	});

	$(".modal").on("click", function (e) {
		let $this = $(this);

		$this.find(".modal__dialog").css({
			transform: "rotateY(90deg)"
		});

		setTimeout(function () {
			$this.removeClass('show');
			$("body").removeClass('no-scroll');
		}, 200);
	});

	$(".modal__dialog").on("click", function (e) {
		e.stopPropagation();
	});



	// ========================================================================
	// ======== Slider for modal: https://kenwheeler.github.io/slick/ =========
	// ========================================================================
	$("[data-slider='modalSlider']").slick({
		infinite: true,
		slidesToShow: 1,
		fade: true,
		dots: true,
		arrows: false,
	});

	$('.slickPrev').on("click", function (e) {
		e.preventDefault();

		let currentSlider = $(this).parents('.modal').find("[data-slider='modalSlider']");

		currentSlider.slick("slickPrev");
	});

	$('.slickNext').on("click", function (e) {
		e.preventDefault();

		let currentSlider = $(this).parents('.modal').find("[data-slider='modalSlider']");

		currentSlider.slick("slickNext");
	});



	//===========================================================================
	// ======== Slider for riviews: https://kenwheeler.github.io/slick/ =========
	// ==========================================================================
	$("[data-slider='reviewsSlider']").slick({
		infinite: true,
		slidesToShow: 1,
		dots: false,
		arrows: false
	});

	$('.slickPrev').on("click", function (e) {
		e.preventDefault();

		let currentSlider = $(this).parents('.reviews').find("[data-slider='reviewsSlider']");

		currentSlider.slick("slickPrev");
	});

	$('.slickNext').on("click", function (e) {
		e.preventDefault();

		let currentSlider = $(this).parents('.reviews').find("[data-slider='reviewsSlider']");

		currentSlider.slick("slickNext");
	});



	// ===============================
	// ======== Fixed header =========
	// ===============================
	const header = $("#header");
	let introH = $("#intro").innerHeight() - 73;
	let catalogH = $("#catalog").innerHeight() + introH;
	let aboutH = $("#about").innerHeight() + catalogH;
	let reviewsH = $("#reviews").innerHeight() + aboutH;
	let connectionH = $("#connection").innerHeight() + reviewsH;
	let scrollOffset = $(window).scrollTop();

	console.log(aboutH);

	cheskScroll(scrollOffset);

	$(window).on("scroll", function () {
		scrollOffset = $(this).scrollTop();

		cheskScroll(scrollOffset);
	});

	function cheskScroll(scrollOffset) {
		if (scrollOffset >= introH) {
			header.addClass("fixed");
		} else {
			header.removeClass("fixed");
		}

		// Подсвечивание ссылки до каталога
		if (scrollOffset <= introH) {
			$('#toIntro').addClass('select');
		} else {
			$('#toIntro').removeClass('select');
		}

		// Подсвечивание ссылки до агентства
		if (scrollOffset > introH && scrollOffset <= catalogH) {
			$('#toCatalog').addClass('select');
		} else {
			$('#toCatalog').removeClass('select');
		}

		// Подсвечивание ссылки до отзывов
		if (scrollOffset > catalogH && scrollOffset <= aboutH) {
			$('#toAbout').addClass('select');
		} else {
			$('#toAbout').removeClass('select');
		}

		// Подсвечивание ссылки до формы обратной связи
		if (scrollOffset > aboutH && scrollOffset <= reviewsH) {
			$('#toReviews').addClass('select');
		} else {
			$('#toReviews').removeClass('select');
		}

		// Подсвечивание ссылки до футера
		if (scrollOffset > reviewsH && scrollOffset <= connectionH) {
			$('#toConnection').addClass('select');
		} else {
			$('#toConnection').removeClass('select');
		}
	}



	// ================================
	// ======== Smooth scroll =========
	// ================================
	$("[data-scroll]").on("click", function (e) {
		e.preventDefault();

		let blockId = $(this).data(`scroll`);
		let blockOffset = $(blockId).offset().top;

		$("html, body").animate({
			scrollTop: blockOffset - 69,
		}, 500);
	});

});