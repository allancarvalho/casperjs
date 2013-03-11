$(function() {
	$("ul.ppt").carouFredSel({
		circular: false,
		infinite: false,
		auto    : false,
		height: 'auto',
		items: {
			visible: 1,
			width: 1000,
			height: 'variable'
		},
		prev    : {
			key     : "left"
		},
		next    : {
			key     : "right"

		},
		scroll: {
			onBefore: function() {
				$(this).trigger("currentPosition",function(a) {
					if(a !== 0) {
						$(".navigation").addClass("fixed").fadeIn().animate({top: '200px'});
					}
					else {
						$(".navigation").removeClass("fixed").fadeOut().animate({top: '-100%'});
					}
				});
			}
		}
	});
});