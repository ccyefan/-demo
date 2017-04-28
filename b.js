jQuery.noConflict();

function showDataShareObject() {
	jQuery("#dsObjWrapper").css("width", 0).css("left", 242);
	jQuery("#dsObjImg").css("width", 242).css("left", -242);
	jQuery("#dsObjWrapper").css("display", "block").animate({left:0, width:242}, 2000);
	jQuery("#dsObjImg").css("display", "block").animate({left:0, width:242}, 2000);	
}
/**
 * 显示主界面元素
 */
function showMainContent() {
	/*var mainContentMarginTop = 200;
	var mainContentHeight = 670;
	var wHeight = $(window).height();
	var offset = mainContentHeight + mainContentMarginTop - wHeight;
	if (offset > 0) {
		var marginTop = 20;
		if (wHeight > 670) {
			marginTop = (wHeight - 670) / 2;
		}
		$("html, body").animate({scrollTop: mainContentMarginTop - marginTop}, 1);
		
	}*/
	jQuery("#leftTip").css("width", "0").css("display", "block").animate({width: 184}, 2000, function() {
		jQuery("#collection2process").animate({width: 381}, 2500, function() {
			jQuery("#pro_objs").css("height", "0").css("display", "block").animate({height: 100}, 1000, function() {
				jQuery("#dsLight").css("height", "20").css("display", "block").animate({height: 230}, 2000, function() {
					//$("#dsObjImg").css("width", '131px').css("left", "131px").css("display", "block").animate({width: 262, left: 0}, 2000);
				});
				setTimeout("showDataShareObject()", 1900);
			});
			
		});
	});
}
/*
function topShowTest(jqObj) {
	//$("#container").css("top", "0").animate({top:100}, 1000);
	if (jqObj.offset().top < $(document).scrollTop()) {
		$("html, body").animate({scrollTop: jqObj.offset().top - 10}, 1000);
	}
}

function bottomShowTest(jqObj, objHeight) {
	objHeight = objHeight ? objHeight : 150;
	var bottom = jqObj.offset().top + objHeight;
	var windowShow = $(window).height() + $(document).scrollTop();
	var offset = bottom - windowShow;
	if (offset > 0) {
		$("html, body").animate({scrollTop: $(document).scrollTop() + offset + 2}, 1000);
	}
}
*/

jQuery(function(){
	showMainContent();
	//采集性能
	jQuery("#dcPerform").hover(
		function(){
			jQuery("#topTip").show("slow");
		}, function() {
			jQuery("#topTip").finish();
		}
	);
	jQuery("#topTip").mouseleave(function(){
		jQuery("#topTip").hide("slow");
	});
	//采集方式
	jQuery("#dcWay").hover(
			function(){
				jQuery("#bottomTip").show("slow");
			}, function() {
				jQuery("#bottomTip").finish();
			}
	);
	jQuery("#bottomTip").mouseleave(function(){
		jQuery("#bottomTip").hide("slow");
	});
	//处理手段
	jQuery("#pro_method").hover(
		function(){
			jQuery("#pro_methods").show("slow");
		}, function() {
			jQuery("#pro_methods").finish();
		}
	);
	jQuery("#pro_methods").mouseleave(function(){
		jQuery("#pro_methods").hide("slow");
	});
	//处理性能
	jQuery("#pro_perform").hover(
		function(){
			jQuery("#pro_performs").show("slow");
		}, function() {
			jQuery("#pro_performs").finish();
		}
	);
	jQuery("#pro_performs").mouseleave(function(){
		jQuery("#pro_performs").hide("slow");
	});
	//输出性能
	jQuery(".lbValue3").hover(
		function(){
			jQuery("#dataShareRight").show("slow");
		}, function() {
			jQuery("#dataShareRight").finish();
		}
	);
	jQuery("#dataShareRight").mouseleave(function(){
		jQuery("#dataShareRight").hide("slow");
	});
	//分享方式
	jQuery(".lbValue2").hover(
		function(){
			jQuery("#dataShareBottomDown").show("slow");
		}, function() {
			jQuery("#dataShareBottomDown").finish();
		}
	);
	jQuery("#dataShareBottomDown").mouseleave(function(){
		jQuery("#dataShareBottomDown").hide("slow");
	});
	jQuery('#container').fullpage({paddingTop:80});
});