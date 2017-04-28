/**
 * 联通怎样识别流失用户
 * */
jQuery.noConflict();
var count = 1;
var strTime;
var _style = ['background-color:#00538a; font-family: 微软雅黑;font-weight: bold;color:#9ed9ff;padding: 15px 15px 15px 15px;text-align: left;', '#00538a'];
var _style2 = ['background-color:#00538a; font-family: 微软雅黑;color:#9ed9ff;padding: 5px 10px 10px 10px;text-align: left;', '#00538a'];
var imgStartIndex = -1;

function startInterval() {
    stopInterval();
    strTime = setInterval("imgStart()", 2000);
}

function stopInterval() {
    if (undefined != strTime) {
        strTime = clearInterval(strTime);
    }
}

function imgStart() {
    layer.close(imgStartIndex);
    var strObject = "#liStart" + count;
    var strCount = count - 1;
    var strObject2 = "#liStart" + strCount;
    jQuery(strObject).stop();
    jQuery(strObject2).stop();
    jQuery(strObject).animate({ fontSize: '16px' });
    if (count > 1) {
        jQuery(strObject2).removeClass();
        jQuery(strObject2).addClass("liStart" + strCount);
        jQuery(strObject).removeClass("liStart" + count);
        jQuery(strObject).addClass("liStart" + count + "_" + count);
        jQuery(strObject2).animate({ fontSize: '10px' });
    } else {
        jQuery("#liStart9").removeClass();
        jQuery("#liStart9").addClass("liStart9");
        jQuery("#liStart9").animate({ fontSize: '10px' });
        jQuery(strObject).removeClass("liStart" + count);
        jQuery(strObject).addClass("liStart" + count + "_" + count);

    }
    imgStartIndex = layer.tips(jQuery(strObject).find("b").html(), strObject, {
        guide: 2,
        style: ['background-color:#00538a; font-family: 微软雅黑;font-weight: bold;color:#9ed9ff;text-align:left;padding: 15px 15px 15px 15px;', '#00538a'],
        maxWidth: 220
    });

    count++;
    if (count > 9) {
        count = 1;
    }
}
/**
 * 
 * 流失用户模型由什么组成
 */
function addFloorSelectedStatus(jqObj) {
    var parentObj = jqObj.parent();
    var floor = parentObj.attr("floor");
    var clsName = "floor" + floor + "Selected";
    var animateObj = jqObj.find(".floor" + floor + "Container");
    animateObj.stop(true, true).animate({ 'height': 0, 'top': '24px' }, 200, function() {
        animateObj.addClass(clsName);
        var nsSpan = animateObj.find(".n-selected");
        nsSpan.removeClass("show");
        nsSpan.addClass("hide");
        var sSpan = animateObj.find(".selected");
        sSpan.removeClass("hide");
        sSpan.addClass("show");
    }).animate({ 'height': '49px', 'top': 0 }, 200);

}

function removeFloorSelectedStatus(jqObj) {
    var parentObj = jqObj.parent();
    var floor = parentObj.attr("floor");
    var clsName = "floor" + floor + "Selected";
    var animateObj = jqObj.find(".floor" + floor + "Container");
    animateObj.stop(true, true).animate({ 'height': 0, 'top': '24px' }, 200, function() {
        animateObj.removeClass(clsName);
        var nsSpan = animateObj.find(".n-selected");
        nsSpan.removeClass("hide");
        nsSpan.addClass("show");
        var sSpan = animateObj.find(".selected");
        sSpan.removeClass("show");
        sSpan.addClass("hide");
    }).animate({ 'height': '49px', 'top': 0 }, 200);

}

jQuery(document).ready(function() {

    var divRightTipIndex = -1;
    jQuery("#divRight li").hover(
        function() {
            stopInterval();
            var strCount = jQuery(this).find("s").text();
            jQuery(this).removeClass("liStart" + strCount);
            jQuery(this).addClass("liStart" + strCount + "_" + strCount);
            jQuery(this).stop();
            jQuery(this).animate({ fontSize: '16px' });
            divRightTipIndex = layer.tips(jQuery(this).find("b").html(), this, {
                guide: 2,
                style: ['background-color:#00538a;font-family: 微软雅黑;font-weight: bold; color:#9ed9ff;text-align:left;padding: 15px 15px 15px 15px;', '#00538a'],
                maxWidth: 220
            });
        },
        function() {
            layer.close(divRightTipIndex);
            var strCount = jQuery(this).find("s").text();
            jQuery(this).removeClass();
            jQuery(this).addClass("liStart" + strCount);
            jQuery(this).stop();
            jQuery(this).animate({ fontSize: '10px' });
            startInterval();
        });
    jQuery(".floor[floor] > div[class^=floor]").hover(
        function() {
            addFloorSelectedStatus(jQuery(this));
        },
        function() {
            removeFloorSelectedStatus(jQuery(this));
        });

    jQuery('#divPageAwayBody').fullpage({
        verticalCentered: false,
        anchors: ['page1', 'page2', 'page3', 'page4'],
        navigation: true,
        navigationPosition: 'right',
        /*navigationTooltips: ['为什么要判别流失用户', '视觉', '交互', '皮肤'],*/
        afterLoad: function(anchorLink, index) {
            if (index == 2) {
                startInterval();
            } else {
                layer.closeTips();
                /**
 * 联通怎样识别流失用户
 * */
jQuery.noConflict();
var count = 1;
var strTime;
var _style = [ 'background-color:#00538a; font-family: 微软雅黑;font-weight: bold;color:#9ed9ff;padding: 15px 15px 15px 15px;text-align: left;', '#00538a' ];
var _style2 = [ 'background-color:#00538a; font-family: 微软雅黑;color:#9ed9ff;padding: 5px 10px 10px 10px;text-align: left;', '#00538a' ];
var imgStartIndex = -1;

function startInterval() {
	stopInterval();
	strTime = setInterval("imgStart()", 2000);
}

function stopInterval() {
	if (undefined != strTime) {
		strTime = clearInterval(strTime);
	}
}

function imgStart() {
	layer.close(imgStartIndex);
	var strObject="#liStart" + count;
	var strCount=count-1;
	var strObject2="#liStart" + strCount;
	jQuery(strObject).stop();
	jQuery(strObject2).stop();
	jQuery(strObject).animate({ fontSize: '16px' }); 
	if (count > 1) {
		jQuery(strObject2).removeClass();
		jQuery(strObject2).addClass("liStart"+strCount);
		jQuery(strObject).removeClass("liStart"+count);
		jQuery(strObject).addClass("liStart"+count+"_"+count);
		jQuery(strObject2).animate({ fontSize: '10px' }); 
	}else {
		jQuery("#liStart9").removeClass();
		jQuery("#liStart9").addClass("liStart9");
		jQuery("#liStart9").animate({ fontSize: '10px' }); 
		jQuery(strObject).removeClass("liStart"+count);
		jQuery(strObject).addClass("liStart"+count+"_"+count);

	}
	imgStartIndex = layer.tips(jQuery(strObject).find("b").html(), strObject, {
			guide : 2,
			style : [ 'background-color:#00538a; font-family: 微软雅黑;font-weight: bold;color:#9ed9ff;text-align:left;padding: 15px 15px 15px 15px;', '#00538a' ],
			maxWidth : 220
		});
	
	count++;
	if(count>9){
		count=1;
	}
}
/**
 * 
 * 流失用户模型由什么组成
 */
function addFloorSelectedStatus(jqObj) {
	var parentObj = jqObj.parent();
	var floor = parentObj.attr("floor");
	var clsName = "floor" + floor + "Selected";
	var animateObj = jqObj.find(".floor" + floor + "Container");
	animateObj.stop(true,true).animate({'height' : 0, 'top' : '24px'}, 200, function() {
		animateObj.addClass(clsName);
		var nsSpan = animateObj.find(".n-selected");
		nsSpan.removeClass("show");
		nsSpan.addClass("hide");
		var sSpan = animateObj.find(".selected");
		sSpan.removeClass("hide");
		sSpan.addClass("show");
	}).animate({'height' : '49px', 'top' : 0}, 200);
	
}

function removeFloorSelectedStatus(jqObj) {
	var parentObj = jqObj.parent();
	var floor = parentObj.attr("floor");
	var clsName = "floor" + floor + "Selected";
	var animateObj = jqObj.find(".floor" + floor + "Container");
	animateObj.stop(true,true).animate({'height' : 0, 'top' : '24px'}, 200, function() {
		animateObj.removeClass(clsName);
		var nsSpan = animateObj.find(".n-selected");
		nsSpan.removeClass("hide");
		nsSpan.addClass("show");
		var sSpan = animateObj.find(".selected");
		sSpan.removeClass("show");
		sSpan.addClass("hide");
	}).animate({'height' : '49px', 'top' : 0}, 200);
	
}

jQuery(document).ready(function(){
	
	var divRightTipIndex = -1;
	jQuery("#divRight li").hover(  
	  function () {
	    stopInterval();
	    var strCount=jQuery(this).find("s").text();
	    jQuery(this).removeClass("liStart"+strCount);
	    jQuery(this).addClass("liStart"+strCount+"_"+strCount);
	    jQuery(this).stop();
	    jQuery(this).animate({ fontSize: '16px' }); 
	    divRightTipIndex = layer.tips(jQuery(this).find("b").html(), this, {
			guide : 2,
			style : [ 'background-color:#00538a;font-family: 微软雅黑;font-weight: bold; color:#9ed9ff;text-align:left;padding: 15px 15px 15px 15px;', '#00538a' ],
			maxWidth : 220
		});
	  },
	  function () {
		  layer.close(divRightTipIndex);
		  var strCount=jQuery(this).find("s").text();
		  jQuery(this).removeClass();
		  jQuery(this).addClass("liStart"+strCount);
		  jQuery(this).stop();
		  jQuery(this).animate({ fontSize: '10px' }); 
		  startInterval();
	  });
	jQuery(".floor[floor] > div[class^=floor]").hover(
		function(){
			addFloorSelectedStatus(jQuery(this));
		},
		function(){
			removeFloorSelectedStatus(jQuery(this));
	});
	 
	jQuery('#divPageAwayBody').fullpage({
		verticalCentered: false,
		anchors: ['page1', 'page2', 'page3', 'page4'],
		navigation:true,
		navigationPosition: 'right',
		/*navigationTooltips: ['为什么要判别流失用户', '视觉', '交互', '皮肤'],*/
		afterLoad: function(anchorLink, index) {
			if(index == 2) {
				startInterval();
			} else {
				layer.closeTips();
				stopInterval();
			}
		}
	});
	
	var strategyModelLayer = -1;
	jQuery("#strategyModel").hover(function() {
		strategyModelLayer = layer.tips(
				jQuery(this).find("span[class='hide']").text(), 
				this, 
				{
					guide : 2,
					style : _style,
					maxWidth : 320
				}
			);
		},
		function() {
			layer.close(strategyModelLayer);
		}
	);

	jQuery("#moreTrigger").hover(
		function() {
			strategyModelLayer = jQuery.layer({
				type: 4,
				closeBtn: [0, false],
				fix: true,
				btns: 0,
				shade: [0],
				bgcolor: '#00538a',
				tips : {
				    msg: jQuery("#moreWeights").html(),
				    follow: jQuery(this).parent().parent()[0],
					guide: 3,
					isGuide: false,
				    more: true,
					style: _style2
				}
			});
		}, 
		function() {
			layer.close(strategyModelLayer);
		}
	);
	
});();
            }
        }
    });

    var strategyModelLayer = -1;
    jQuery("#strategyModel").hover(function() {
            strategyModelLayer = layer.tips(
                jQuery(this).find("span[class='hide']").text(),
                this, {
                    guide: 2,
                    style: _style,
                    maxWidth: 320
                }
            );
        },
        function() {
            layer.close(strategyModelLayer);
        }
    );

    jQuery("#moreTrigger").hover(
        function() {
            strategyModelLayer = jQuery.layer({
                type: 4,
                closeBtn: [0, false],
                fix: true,
                btns: 0,
                shade: [0],
                bgcolor: '#00538a',
                tips: {
                    msg: jQuery("#moreWeights").html(),
                    follow: jQuery(this).parent().parent()[0],
                    guide: 3,
                    isGuide: false,
                    more: true,
                    style: _style2
                }
            });
        },
        function() {
            layer.close(strategyModelLayer);
        }
    );

});
