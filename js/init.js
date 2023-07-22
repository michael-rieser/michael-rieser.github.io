/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
   $('#flexslider1').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });

   /*----------------------------------------------------*/
   /*	Flexslider - TEST
   /* SEE: (DOCS): https://woocommerce.com/flexslider/
   /* SEE: https://jsfiddle.net/solodev/fxqLqs4a/
   /* SEE: http://flexslider.woothemes.com/index.html
   /*----------------------------------------------------*/
   $('#flexslider2').flexslider({
      animation: 'slide',
      controlNav: false,
      directionNav: true,
      prevText: '',
      nextText: '',
      slideshow: false
      // controlsContainer: ".flexslider-test-controls-container",
      // customDirectionNav: $(".custom-navigation a"),
      // namespace: 'flextest-',
      // controlsContainer: '.flexslider-test-controls-container',
      // directionNav: false,
      // smoothHeight: true,
      // slideshowSpeed: 7000,
      // animationSpeed: 600,
      // randomize: false,
   });
   /* --- Portfolio Modal Flexsliders --- */
   // TODO: looping through adds last listener to all click events ?
   // var modalIds = [
   //    '#web-dev-modal-01',
   //    '#web-dev-modal-02'
   // ];
   // for (var i = 0; i < modalIds.length; i++) {
   //    var tgtModalId = modalIds[i];
      
   //    $('a[href="' + tgtModalId + '"]').click(function() {
         
   //       $(tgtModalId + '-flexslider').flexslider({
   //          animation: 'slide',
   //          controlNav: false,
   //          directionNav: true,
   //          prevText: '',
   //          nextText: '',
   //          slideshow: false
   //          // start: function() {
   //             // console.log('*flexslider start()');
   //          // }
   //       });
   //    });
   // }
   $('a[href="#web-dev-modal-01"]').click(function() {
      $('#web-dev-modal-01-flexslider').flexslider({
         animation: 'slide',
         controlNav: false,
         directionNav: true,
         prevText: '',
         nextText: '',
         slideshow: false,
         smoothHeight: true
      });
   });
   $('a[href="#web-dev-modal-02"]').click(function() {
      $('#web-dev-modal-02-flexslider').flexslider({
         animation: 'slide',
         controlNav: false,
         directionNav: true,
         prevText: '',
         nextText: '',
         slideshow: false,
         smoothHeight: true
      });
   });
   $('a[href="#web-dev-modal-03"]').click(function() {
      $('#web-dev-modal-03-flexslider').flexslider({
         animation: 'slide',
         controlNav: false,
         directionNav: true,
         prevText: '',
         nextText: '',
         slideshow: false,
         smoothHeight: true
      })
   });
   $('a[href="#web-dev-modal-04"]').click(function() {
      $('#web-dev-modal-04-flexslider').flexslider({
         animation: 'slide',
         controlNav: false,
         directionNav: true,
         prevText: '',
         nextText: '',
         slideshow: false,
         smoothHeight: true
      })
   });
/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

   $('form#contactForm button.submit').click(function() {

      $('#image-loader').fadeIn();

      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
               '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

      $.ajax({

	      type: "POST",
	      url: "inc/sendEmail.php",
	      data: data,
	      success: function(msg) {

            // Message was sent
            if (msg == 'OK') {
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-success').fadeIn();   
            }
            // There was an error
            else {
               $('#image-loader').fadeOut();
               $('#message-warning').html(msg);
	            $('#message-warning').fadeIn();
            }

	      }

      });
      return false;
   }); 

});

