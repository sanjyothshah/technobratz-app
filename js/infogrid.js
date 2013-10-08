/* @author Sanjyot Shah
*/
$(function() {

    // Set up variables
    var $el, $parentWrap, $otherWrap, 
        $allTitles = $(".image").css({
            padding: 0, // setting the padding here prevents a weird situation, where it would start animating at 0 padding instead of 5
            "cursor": "pointer" // make it seem clickable
        }),
        $allCells = $("dt").css({
            position: "relative",
		  padding: 0,
            //display: "none", // info cells are just kicked off the page with CSS (for accessibility)
        	  width: 140
	   });
    
    // clicking image of inactive column just opens column, doesn't go to link   
    $("#page-wrap").delegate(".image","click", function(e) { 
        
        if ( !$(this).parent().hasClass("curCol") ) {         
            e.preventDefault(); 
            $(this).next().find('dt:first').click(); 
        } 
        
    });
    
    // clicking on titles does stuff
    $("#page-wrap").delegate("dt", "click", function() {
        
        // cache this, as always, is good form
        $el = $(this);
        
        // if this is already the active cell, don't do anything
        if (!$el.hasClass("current")) {
        
            $parentWrap = $el.parent().parent();
            $otherWraps = $(".info-col").not($parentWrap);
		  //$currentImg = $el(".image");
            
            // remove current cell from selection of all cells
            $allTitles = $("dt").not(this);
            
            // close all info cells
            //$allCells.slideUp();
            
		  $(".image").animate ({
				width:220,
			}).addClass("curCol");
		  
            // return all titles (except current one) to normal size
            $allTitles.animate({
                fontSize: "1px",
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 20
            });
            
            // animate current title to larger size            
            $el.animate({
                "font-size": "20px",
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 20
            });
            
            // make the current column the large size
            $parentWrap.animate({
                width: 630
            }).addClass("curCol");
            
            // make other columns the small size
            $otherWraps.animate({
                width: 44
            }).removeClass("curCol");
            
		  $allCells.css({
                  width: 350
	   	});
		  
            // make sure the correct column is current
            $allTitles.removeClass("current");
            $el.addClass("current");  
        
        }
        
    });
    
    $("#starter").trigger("click");
    
});