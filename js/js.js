// Jquery
jQuery(function( $ ){
	$.localScroll.defaults.axis = 'xy';
	$.localScroll.hash({
		target: 'body', // Could be a selector or a jQuery object too.
		queue:true,
		duration:1500,
		onAfter:function( anchor, settings ) {
			contentHeight();	
		}
	});
	
	$.localScroll({
		target: 'body', // could be a selector or a jQuery object too.
		queue:true,
		duration:1500,
		hash:true,
		onAfter:function( anchor, settings ){contentHeight();}
	});	
	
});


// Various Functions
// Set Content Hieght
function contentHeight() {
    	var height = $(window).height();
	if (height > 800) {
		$(".content").css('height',height);
    	} else {
		$(".content").css('height', 800); 
    	}
}
// Shuffle Portfolio Divs
function shuffle(e) {              // pass the divs to the function
	var replace = $('<li>');
	var size = e.size();
	
	while (size >= 1) {
	var rand = Math.floor(Math.random() * size);
	var temp = e.get(rand);      	// grab a random div from our set
	replace.append(temp);        	// add the selected div to our new set
	e = e.not(temp); 			// remove our selected div from the main set
	size--;
	}
	$('#portfolio-list').html(replace.html() );     // update our container div with the new, randomized divs
			// 
}
shuffle( $('#portfolio-list li') );

// Close overlay
function close_box()
{
	$('.backdrop, .box').animate({'opacity':'0'}, 300, 'linear', function(){
		$('.backdrop, .box').css('display', 'none');
	});
}

$(function() {
        // create custom animation algorithm for jQuery called "bouncy"
    $.easing.bouncy = function (x, t, b, c, d) {
        var s = 1.70158;
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    }

    // create custom tooltip effect for jQuery Tooltip
    $.tools.tooltip.addEffect(
        "bouncy",

	// opening animation
	function(done) {
	    this.getTip().animate({top: '+=15'}, 500, 'bouncy', done).show();
	},

	// closing animation
	function(done) {
	    this.getTip().animate({top: '-=15'}, 500, 'bouncy', function()  {
		$(this).hide();
		done.call();
	    });
	}
    );
    
        $(".table .icon[title]").tooltip({effect: 'bouncy'});
   });

// Doc Ready
$(document).ready(function() {
    contentHeight();
    $('#portfolio-list').filterable();
    $(window).bind('resize', contentHeight);
    $('.navigation').css({'top': -60});
    
    
    // Window resize
    $(window).scroll(function () {
	    var height = $(window).height();
		if ($(window).scrollTop() >= height) {
			$('.navigation').css({
				'position': 'fixed',
				'top': 0
			});

			$('.navigation').stop().animate({'opacity': '1'},250)
			$('.introgo').stop().animate({'opacity': '0'},250)
		} else if ($(window).scrollTop() < height) {
			$('.navigation').stop().animate({'opacity': '0'},250)
			$('.introgo').stop().animate({'opacity': '1'},250, function() {
				$('.navigation').css({
					'position': 'fixed',
					'top': -60
				});	
			})
			
		}
		
	});  
	
	// Light box 
	$(".lightbox").css({
            "cursor": "pointer"
     });
	$('.lightbox').click(function(){
		$('.backdrop, .box').animate({'opacity':'.90'}, 500, 'linear');
		$('.box').animate({'opacity':'1.00'}, 500, 'linear');
		$('.backdrop, .box').css('display', 'block');
	});

	$('.close').click(function(){
		close_box();
	});

	$('.backdrop').click(function(){
		close_box();
	});
	
	$(".fancyboxbranding").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none',
		helpers : {
    			title : {
    				type : 'over'
    			}
    		}
	});
	
	$(".fancyboxprint").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none',
		helpers : {
    			title : {
    				type : 'over'
    			}
    		}
	});
	
	$(".fancyboxdigital").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none',
		helpers : {
    			title : {
    				type : 'over'
    			}
    		}
	});
});