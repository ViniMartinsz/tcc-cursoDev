/* ----------------- Start Document ----------------- */
(function($){
    "use strict";

    $(document).ready(function(){

/*----------------------------------------------------*/
/*	Main Navigation
/*----------------------------------------------------*/


	var $mainNav    = $('#navigation').children('ul');

	$mainNav.on('mouseenter', 'li', function() {
		var $this    = $(this),
			$subMenu = $this.children('ul');
		if( $subMenu.length ) $this.addClass('hover');
		$subMenu.hide().stop(true, true).slideDown(350);
	}).on('mouseleave', 'li', function() {
		$(this).removeClass('hover').children('ul').stop(true, true).slideUp(150);
	});
		
	
	/* Responsive Menu */
	
	selectnav('nav', {
		label: 'Menu',
		nested: true,
		indent: '-'
	});
				

/*----------------------------------------------------*/
/*	FlexSlider
/*----------------------------------------------------*/

	$(window).load(function() {
		$('.flexslider').flexslider({
			animation : 'slide',
		    controlNav: false,
		    directionNav: true,
		    prevText: "",
		    nextText: ""
		});
	});

    $('.testimonials-slider').flexslider({
        animation: "fade",
        controlsContainer: $(".custom-controls-container"),
        customDirectionNav: $(".custom-navigation a"),
	    controlNav: true,
	    directionNav: false,
	    prevText: "",
	    nextText: ""
    });




/*----------------------------------------------------*/
/*	Image Overlay
/*----------------------------------------------------*/

	
	$('.picture a').hover(function () {
		$(this).find('.image-overlay-zoom, .image-overlay-link').stop().fadeTo('fast', 1);
	},function () {
		$(this).find('.image-overlay-zoom, .image-overlay-link').stop().fadeTo('fast', 0);
	});
	


/*----------------------------------------------------*/
/*	Back To Top Button
/*----------------------------------------------------*/

	$('#scroll-top-top a').click(function(){
		$('html, body').animate({scrollTop:0}, 300); 
		return false; 
	}); 
	
	
/*----------------------------------------------------*/
/*	Accordion
/*----------------------------------------------------*/


	var $container = $('.acc-container'),
		$trigger   = $('.acc-trigger');

	$container.hide();
	$trigger.first().addClass('active').next().show();

	var fullWidth = $container.outerWidth(true);
	$trigger.css('width', fullWidth);
	$container.css('width', fullWidth);
	
	$trigger.on('click', function(e) {
		if( $(this).next().is(':hidden') ) {
			$trigger.removeClass('active').next().slideUp(300);
			$(this).toggleClass('active').next().slideDown(300);
		}
		e.preventDefault();
	});

	// Resize
	$(window).on('resize', function() {
		fullWidth = $container.outerWidth(true)
		$trigger.css('width', $trigger.parent().width() );
		$container.css('width', $container.parent().width() );
	});

	
	
/*----------------------------------------------------*/
/*	Alert Boxes
/*----------------------------------------------------*/

	$(document.body).pixusNotifications({
			speed: 300,
			animation: 'fadeAndSlide',
			hideBoxes: false
	});



/*----------------------------------------------------*/
/*	Tabs
/*----------------------------------------------------*/

	var $tabsNav    = $('.tabs-nav'),
		$tabsNavLis = $tabsNav.children('li'),
		$tabContent = $('.tab-content');

	$tabsNav.each(function() {
		var $this = $(this);

		$this.next().children('.tab-content').stop(true,true).hide()
											 .first().show();

		$this.children('li').first().addClass('active').stop(true,true).show();
	});

	$tabsNavLis.on('click', function(e) {
		var $this = $(this);

		$this.siblings().removeClass('active').end()
			 .addClass('active');
		
		$this.parent().next().children('.tab-content').stop(true,true).hide()
													  .siblings( $this.find('a').attr('href') ).fadeIn();

		e.preventDefault();
	});


	
/*----------------------------------------------------*/
/*	Contact Form
/*----------------------------------------------------*/

	var animateSpeed=300;
	var emailReg = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;

	// Validating
	
	function validateName(name) {
		if (name.val()=='*') {name.addClass('validation-error',animateSpeed); return false;}
		else {name.removeClass('validation-error',animateSpeed); return true;}
	}

	function validateEmail(email,regex) {
		if (!regex.test(email.val())) {email.addClass('validation-error',animateSpeed); return false;}
		else {email.removeClass('validation-error',animateSpeed); return true;}
	}
		
	function validateMessage(message) {
		if (message.val()=='') {message.addClass('validation-error',animateSpeed); return false;}
		else {message.removeClass('validation-error',animateSpeed); return true;}
	}
				
	$('#send').click(function() {
	
		var result=true;
		
		var name = $('input[name=name]');
		var email = $('input[name=email]');
		var message = $('textarea[name=message]');
				
		// Validate
		if(!validateName(name)) result=false;
		if(!validateEmail(email,emailReg)) result=false;
		if(!validateMessage(message)) result=false;
		
		if(result==false) return false;
				
		// Data
		var data = 'name=' + name.val() + '&email=' + email.val() + '&message='  + encodeURIComponent(message.val());
		
		// Disable fields
		$('.text').attr('disabled','true');
		
		// Loading icon
		$('.loading').show();
		
		// Start jQuery
		$.ajax({
		
			// PHP file that processes the data and send mail
			url: "contact.php",	
			
			// GET method is used
			type: "GET",

			// Pass the data			
			data: data,		
			
			//Do not cache the page
			cache: false,
			
			// Success
			success: function (html) {				
			
				if (html==1) {	

					// Loading icon
					$('.loading').fadeOut('slow');	
						
					//show the success message
					$('.success-message').slideDown('slow');
											
					// Disable send button
					$('#send').attr('disabled',true);
					
				}
				
				else {
					$('.loading').fadeOut('slow')
					alert('Sorry, unexpected error. Please try again later.');				
				}
			}		
		});
	
		return false;
		
	});
		
	$('input[name=name]').blur(function(){validateName($(this));});
	$('input[name=email]').blur(function(){validateEmail($(this),emailReg); });
	$('textarea[name=message]').blur(function(){validateMessage($(this)); });


/*----------------------------------------------------*/
/*	Isotope Portfolio Filter
/*----------------------------------------------------*/
	$(window).load(function(){
		$('#portfolio-wrapper').isotope({
			  itemSelector : '.portfolio-item, .isotope-item',
				layoutMode : 'fitRows'
		});
		$('#filters a.selected').trigger("click");
	});
	$('#filters a').click(function(e){
		e.preventDefault();

		var selector = $(this).attr('data-option-value');
		$('#portfolio-wrapper').isotope({ filter: selector });

		$(this).parents('ul').find('a').removeClass('selected');
		$(this).addClass('selected');
	});





/*----------------------------------------------------*/
/*  Counters
/*----------------------------------------------------*/

    $('.counter').counterUp({
        delay: 10,
        time: 900
    });


	
/*----------------------------------------------------*/
/*	Fancybox
/*----------------------------------------------------*/
 	$('[rel=image]').fancybox({
		type        : 'image',
		openEffect  : 'fade',
		closeEffect	: 'fade',
		nextEffect  : 'fade',
		prevEffect  : 'fade',
		helpers     : {
			title   : {
				type : 'inside'
			}
		}
	});
	
	$('[rel=image-gallery]').fancybox({
		nextEffect  : 'fade',
		prevEffect  : 'fade',
		helpers     : {
			title   : {
				type : 'inside'
			},
			buttons  : {},
			media    : {}
		}
	});


// ------------------ End Document ------------------ //
});

})(this.jQuery);

  



(function()
{
	$.fn.pixusNotifications = function(options)
	{
		var defaults = {
			speed: 200,
			animation: 'fade',
			hideBoxes: false
		};
		
		var options = $.extend({}, defaults, options);
		
		return this.each(function()
		{
			var wrapper = $(this),
				notification = wrapper.find('.notification'),
				content = notification.find('p'),
				title = content.find('strong'),
				closeBtn = $('<a class="close" href="#"></a>');
			
			$(document.body).find('.notification').each(function(i)
			{
				var i = i+1;
				$(this).attr('id', 'notification_'+i);
			});
			
			notification.filter('.closeable').append(closeBtn);
			
			closeButton = notification.find('> .close');
			
			closeButton.click(function()
			{
				hideIt( $(this).parent() );
				return false;
			});			
			
			function hideIt(object)
			{
				switch(options.animation)
				{
					case 'fade': fadeIt(object);     break;
					case 'slide': slideIt(object);     break;
					case 'box': boxAnimIt(object);     break;
					case 'fadeAndSlide': fadeItSlideIt(object);     break;
					default: fadeItSlideIt(object);
				}
			};
			
			function fadeIt(object)
			{	object
				.fadeOut(options.speed);
			}			
			function slideIt(object)
			{	object
				.slideUp(options.speed);
			}			
			function fadeItSlideIt(object)
			{	object
				.fadeTo(options.speed, 0, function() { slideIt(object) } );
			}			
			function boxAnimIt(object)
			{	object
				.hide(options.speed);
			}
			
			if (options.hideBoxes){}
			
			else if (! options.hideBoxes)
			{
				notification.css({'display': 'block', 'visiblity': 'visible'});
			}
			
		});
	};
})();