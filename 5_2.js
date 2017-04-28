// 百度地图API功能
var map = new BMap.Map('map', {enableMapClick:false, minZoom: 16, maxZoom: 19});
// 根据城市进行定位
var point = new BMap.Point(113.276133,23.131791);
map.setMapType(BMAP_PERSPECTIVE_MAP);
map.centerAndZoom(point, 18);
//map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
map.setCurrentCity("广州");
// 覆盖区域图层测试
//map.addTileLayer(new BMap.PanoramaCoverageLayer());
//
//var stCtrl = new BMap.PanoramaControl(); //构造全景控件
//stCtrl.setOffset(new BMap.Size(20, 20));
//map.addControl(stCtrl);//添加全景控件
// 禁止滚动缩放
//map.disableScrollWheelZoom(); 
// 禁止拖动
//map.disableDragging();
map.disableDoubleClickZoom();
map.disablePinchToZoom();

// 定义一个控件类,即function
function MyControl(anchor, offset, html){
  // 默认停靠位置和偏移量
  this.defaultAnchor = anchor || BMAP_ANCHOR_TOP_LEFT;
  this.defaultOffset = offset || new BMap.Size(0, 0);
  this.defaultHtml = html || "";
}

// 通过JavaScript的prototype属性继承于BMap.Control
MyControl.prototype = new BMap.Control();

// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
MyControl.prototype.initialize = function(map){
  // 创建一个DOM元素
  var div = document.createElement("div");
  div.innerHTML = this.defaultHtml;
  // 添加DOM元素到地图中
  map.getContainer().appendChild(div);
  // 将DOM元素返回
  return div;
}
// 创建控件
var radiusControl = new MyControl();
radiusControl.defaultHtml = "<div class='sizeBox'><ul>" + 
  		"<li name='radiusDrap' radius='500' style='left: 0px;' title='500'></li>" +
  		"<li name='radiusDrap' radius='1000' class='hide' style='left: 115px;' title='1000'></li>" +
  		"<li name='radiusDrap' radius='1500' class='hide' style='left: 235px;' title='1500'></li>" +
  		"<li name='radiusDrap' radius='2000' class='hide' style='left: 355px;' title='2000'></li>" +
  		"</ul></div>" +
  		"";
// 添加到地图当中
map.addControl(radiusControl);
// 创建控件
var textControl = new MyControl(BMAP_ANCHOR_TOP_RIGHT, new BMap.Size(0, 25));
textControl.defaultHtml = "<div class='typeBox'>" + 
  		"<ul><li class='type1'>商业中心</li><li class='type2'>公共设施</li><li class='type3'>社区</li></ul>" +
  		"</div>" +
  		"";
// 添加到地图当中
map.addControl(textControl);

var mainCircle;
var mapPoint;
var overlayPathArr = new Array();
var markerStyleArr = new Array();
function changeMap(mapId) {
	$.ajax({
		type : "POST",
//		url : path + "/screen!queryScreenMap.action",
		url : path + "/wo/data.json",
		dataType : 'json',
		cache : false,
		data : {
			mapId : mapId
		},
		success : function(data) {
			
			
			var mapName = data["MAP_NAME"];
			var mapZoom = data["ZOOM"];
			var mapCenterPoint = data["CENTER_POINT"];
			var mapCityName = data["CITY_NAME"];
			var mapCenterPointArr = mapCenterPoint.split(",");
 			mapPoint = new BMap.Point(mapCenterPointArr[0], mapCenterPointArr[1]);
			map.centerAndZoom(mapPoint, 18);
			map.setCurrentCity(mapCityName);
	
			var areaList = data["areaList"];
			overlayPathArr = new Array();
			markerStyleArr = new Array();
			for (var i=0; i<areaList.length; i++) {
				var area = areaList[i];
				var styleOptions = JSON.parse(area["style"]);
				var areaCenterPoint = area["centerPoint"];
				var areaCenterPointArr = areaCenterPoint.split(",");
				var areaPoint = new BMap.Point(areaCenterPointArr[0], areaCenterPointArr[1]);
				var radius = area["radius"];
				var areaType = area["areaType"];
				if (areaType == "1") {
					var icon = new BMap.Icon(path + styleOptions["icon"]["img"], new BMap.Size(	["icon"]["width"], styleOptions["icon"]["height"]));
					var marker = new BMap.Marker(areaPoint, {icon: icon});
					map.addOverlay(marker);
					markerStyleArr.push(styleOptions["style"]);
				} else if (areaType == "2") {
					var circle = new BMap.Circle(areaPoint, radius, styleOptions);
					mainCircle = circle;
					map.addOverlay(circle);
					overlayPathArr.push(JSON.parse(area["svgPath"]));
				}  else if (areaType == "3") {
				}  else if (areaType == "4") {
				} else if (areaType == "5") {
//					var startAngle = area["startAngle"];
//					var endAngle = area["endAngle"];
//					var c = new BMap.Circle(areaPoint, radius);
//					map.addOverlay(c);
//					var s = SectorByStyle(map, c, startAngle, endAngle, styleOptions);
//					overlayPathArr.push(JSON.parse(area["svgPath"]));
				}
			}
			
			map.addEventListener("tilesloaded", function(e) {
				changeSvgPath();
			});
			map.addEventListener("moveend", function(e) {
				changeSvgPath();
			});
			map.addEventListener("zoomend", function(e) {
//				map.centerAndZoom(mapPoint, map.getZoom());
				changeSvgPath();
			});
		}
	});
}

function changeSvgPath() {
	for (var i=0; i<overlayPathArr.length; i++) {
		$("path[stroke-linejoin='round']:eq(" + i + ")").attr("d", overlayPathArr[i][mainCircle.getRadius()][map.getZoom()]);
	}
	var start = markerStyleArr.length;
	var size = $("span.BMap_Marker").size();
	var j=0;
	for (var i=start; i<size; i++) {
		$("span.BMap_Marker:eq(" + i + ")").css(markerStyleArr[j]);
		j++;
	}
}

function changeRadius(radius) {
	mainCircle.setRadius(radius);
	changeSvgPath();
}

function changeZoom() {
	changeSvgPath();
}

changeMap(1);

$(function () {
	initScreen();
	
	$("li[name='radiusDrap']").click(function() {
		$("li[name='radiusDrap']").addClass("hide");
		$(this).removeClass("hide");
		changeRadius($(this).attr("radius"));
		
	});
	
	$("#map").height($(document).height()*0.9);
});

function initScreen(){
	
	$.ajax({
		  type:"POST",
	      dataType:'json',
	      cache:false,
	      url:path+"/screen!queryBySql.action?sql="+getSql_1(),
		  success:function(data) {
		  		if(data !=null && data.length != 0){
		  			var returnId = $("#returnId").val();
		  			var screenHtml = "";
		  			$(data).each(function(i,n){
		  				if(returnId==undefined || returnId == "null" ||returnId == ""){
		  					if(i==0){
			  					$(".selectNenu em").text(n['SCREEN_POSITION']);
			  					$(".selectNenu em").attr("cityName",n['CITY']);
			  					$(".selectNenu em").attr("screenId",n['SCREEN_ID']);
			  					$(".selectNenu em").attr("lon",n['LON']);
			  					$(".selectNenu em").attr("lat",n['LAT']);
			  					$(".screenType").text(n['SCREEN_TYPE']);
			  					$(".screenPath").attr("src","images/screen/"+n['SCREEN_ID']+".jpg")
//			  					loadWeath(n['CITY']);
			  					loadWeath();
			  					loadData(n['SCREEN_ID']);
			  					getScore(n['SCREEN_ID'],1,"201507");
			  				}else{
			  					screenHtml += "<dd style='text-align: left'><a href='#' onclick='switchover(this)' " +
			  							"screenId='"+n['SCREEN_ID']+"' cityName='"+n['CITY']+"' " +
			  							"screenType='"+n['SCREEN_TYPE']+"' lon='"+n['LON']+"' " +
			  							"lat='"+n['LAT']+"'>"+n['SCREEN_POSITION']+"</a></dd>";
			  				}
		  				}else{
		  					if(n['SCREEN_ID'] == returnId){
		  						$(".selectNenu em").text(n['SCREEN_POSITION']);
			  					$(".selectNenu em").attr("cityName",n['CITY']);
			  					$(".selectNenu em").attr("screenId",n['SCREEN_ID']);
			  					$(".selectNenu em").attr("lon",n['LON']);
			  					$(".selectNenu em").attr("lat",n['LAT']);
			  					$(".screenType").text(n['SCREEN_TYPE']);
			  					$(".screenPath").attr("src","images/screen/"+n['SCREEN_ID']+".jpg")
			  					loadWeath();
			  					loadData(n['SCREEN_ID']);
			  					getScore(n['SCREEN_ID'],1,"201507");
		  					}else{
		  						screenHtml += "<dd style='text-align: left'><a href='#' onclick='switchover(this)' " +
			  							"screenId='"+n['SCREEN_ID']+"' cityName='"+n['CITY']+"' " +
			  							"screenType='"+n['SCREEN_TYPE']+"' lon='"+n['LON']+"' " +
			  							"lat='"+n['LAT']+"'>"+n['SCREEN_POSITION']+"</a></dd>";
		  					}
		  						
		  				}
		  				
			  		});
		  			$(".selectNenu dl").append(screenHtml);
		  		}else{
		  			$(".selectNenu em").html("暂无数据");
		  			$(".selectNenu dl").empty();
		  		}
		  }
	});
}

function loadWeath(){
	$.ajax({
		  type:"POST",
	      dataType:'json',
	      cache:false,
	      url:path+"/screen!queryBySql.action?sql="+getWeatherSql(),
		  success:function(data) {
			 
			  var weather = data[0];
			  var imgPath = weather['TYPE'];
			  var Temp1 = weather['NOWTMP'];
			  var weath = weather['TXT'];
			  var dir = weather['DIR'];
			  $(".t").text(""+Temp1+"°C");
			  $(".b").text(weath + " "+ dir);
			  $(".weathImg").attr("src",imgPath);
		  },
		  failure: function() {
		  }
	});
}

function loadData(screenId){
	$.ajax({
		  type:"POST",
	      dataType:'json',
	      cache:false,
	      url:path+"/screen!queryBySql.action?sql="+getSql_2(screenId,"201507"),
		  success:function(data) {
//			 var r1 = ['天气适播指数 60','客流流量指数 88','时段人流指数 82','人口特征指数 70','消费能力指数 87','商品偏好指数 76','传播广度指数 91'];
//			 var r2 = [
//			           	{value:60, name:'天气适播指数 60'},
//			            {value:88, name:'客流流量指数 88'},
//			            {value:82, name:'时段人流指数 82'},
//			            {value:70, name:'人口特征指数 70'},
//			            {value:87, name:'消费能力指数 87'},
//			            {value:76, name:'商品偏好指数 76'},
//			            {value:91, name:'传播广度指数 91'}
//			           ];
			  var r1 = [],r2=[];
			 $(data).each(function(i,n){
//				 r1.push(transform(n['LEVL']));
				 r1.push(n['KPI_NAME']+" "+n['VALUE']);
				 r2.push({value:n['VALUE'], name:n['KPI_NAME']+" "+n['VALUE']});
		  	 });
			 initEchart_2(r1,r2);
		  },
		  failure: function() {
		  }
	});
}

function getScore(screenId,pageType,date){
	$.ajax({
		  type:"POST",
	      dataType:'json',
	      cache:false,
	      url:path+"/screen!queryBySql.action?sql="+getSql_3(screenId,pageType,date),
		  success:function(data) {
			 
			 if(data!=null && data.length!=0){
				 var r = data[0];
				 var value = r["VALUE"];
				 var label = r["SCREEN_LABEL"];
				 var levl = r["LEVL"];
				 initEchart_1(value);
				 $(".labelBox").empty();
				 var l = label.split(",");
				 $(l).each(function(i){
					 var seq = Math.round(Math.random()*4+1);
					 $(".labelBox").append(" <dd class='style"+seq+"'>"+l[i]+"</dd>");
				 });
			 }
		  }
	});
}
function initEchart_1(value){
	var myChart = echarts.init(document.getElementById('echarts1'), 'infographic');
	var dataStyle = {
		    normal: {
		        label: {show:false},
		        labelLine: {show:false}
		    }
		};
		var placeHolderStyle = {
		    normal : {
		        color: 'rgba(0,0,0,0)',
		        label: {show:false},
		        labelLine: {show:false}
		    },
		    emphasis : {
		        color: 'rgba(0,0,0,0)'
		    }
		};
		option = {
		    title: {
		        text: value,
		        subtext: '综合指数',
		        x: 'center',
		        y: 'center',
		        itemGap: 5,
		        textStyle : {
		            color : 'rgba(30,144,255,0.8)',
		            fontFamily : '微软雅黑',
		            fontSize : 40,
		            fontWeight : 'bolder'
		        }
		    },
		    series : [
		        {
		            name:'',
		            type:'pie',
		            clockWise:false,
		            radius : [50, 40],
		            itemStyle : dataStyle,
		            data:[
		                {
		                    value:68,
		                    name:'综合指数'
		                },
		                {
		                    value:32,
		                    name:'invisible',
		                    itemStyle : placeHolderStyle
		                }
		            ]
		        }
		    ]
		};
		myChart.setOption(option);                
}

function initEchart_2(r1,r2){
	require.config({
	    packages: [
	        {
	            name: 'echarts',
	            location: 'js/echarts/src',
	            main: 'echarts'
	        },
	        {
	            name: 'zrender',
	            location: 'js/zrender/src', // zrender与echarts在同一级目录
	            main: 'zrender'
	        }
	    ]
	});
	var option = {
		legend: {
		    orient : 'vertical',
		    x : '75',
			y : '75',
			itemGap:22,
		      textStyle : {
		        color : '#fff',
		        fontSize : 18
		    },
		    data:r1
		},
		calculable : false,
		color:['#f8434a','#ff9434','#f5e40f','#009aca','#12c4cd','#a9d86e','#CDCD00'],
			series : [
			    {
			        name:'综合指数',
			        type:'pie',
			        center : ['65%', '55%'],
		            radius : ['45%', '65%'],
			        itemStyle : {
			            normal : {
			            	label : {
		                        position : 'inner',
		                        formatter : function (params) {                         
		                          return (params.percent - 0).toFixed(0) + '%'
		                        },
								 textStyle : {fontSize : 18}
		                    },
			                labelLine : {
			                    show : false
			                }
			            },
			            emphasis : {
			                label : {
			                    show : true,
			                    position : 'center',
			                    textStyle : {
			                        fontSize : '18',
			                        fontWeight : 'bold'
			                    },
			                    labelLine : {
				                    show : true
				                }
			                }
			            }
			        },
			        data:r2
			    }
			]
		};
		require(  
				[
		            'echarts',
		            'echarts/chart/pie',
		            'echarts/chart/bar'
		        ],
	                function (ec) { 
	                	var myChart = ec.init(document.getElementById('echarts2'));
//	                	var myChart = ec.init(document.getElementById('echarts2'), 'macarons');
	                	myChart.setOption(option);
	                	var ecConfig = require('echarts/config');
	        		    var zrEvent = require('zrender/tool/event');
	        		    var screenId = $(".selectNenu em").attr("screenId");
    				    myChart.on('click', function (param) {
    		                if(param.name.indexOf('适播') != -1)
    		                	location.href = path + '/wo/subpage/shiBo.jsp?screenId='+screenId;
    		                if(param.name.indexOf('流量') != -1)
    		                	location.href = path + '/wo/subpage/liuLiangZhiShu.jsp?screenId='+screenId;
    		                if(param.name.indexOf('时段') != -1)
    		                	location.href = path + '/wo/subpage/shiDuanZhiShu.jsp?screenId='+screenId;
    		                if(param.name.indexOf('特征') != -1)
    		                	location.href = path + '/wo/subpage/teZhengZhiShu.jsp?screenId='+screenId;
    		                if(param.name.indexOf('消费') != -1)
    		                	location.href = path + '/wo/subpage/xiaoFeiNengLi.jsp?screenId='+screenId;
    		                if(param.name.indexOf('偏好') != -1)
    		                	location.href = path + '/wo/subpage/shangPingPianHao.jsp?screenId='+screenId;
    		                if(param.name.indexOf('传播') != -1)
    		                	location.href = path + '/wo/subpage/chuanBoZhiShu.jsp?screenId='+screenId; 
    		                
    				    });
    				    myChart.on(ecConfig.EVENT.LEGEND_SELECTED, function (param){
    				    	myChart.setOption(option,true);
    				    	//myChart.restore();
    				    	if(param.target.indexOf('适播') != -1)
     		                	location.href = path + '/wo/subpage/shiBo.jsp?screenId='+screenId;
     		                if(param.target.indexOf('流量') != -1)
     		                	location.href = path + '/wo/subpage/liuLiangZhiShu.jsp?screenId='+screenId;
     		                if(param.target.indexOf('时段') != -1)
     		                	location.href = path + '/wo/subpage/shiDuanZhiShu.jsp?screenId='+screenId;
     		                if(param.target.indexOf('特征') != -1)
     		                	location.href = path + '/wo/subpage/teZhengZhiShu.jsp?screenId='+screenId;
     		                if(param.target.indexOf('消费') != -1)
     		                	location.href = path + '/wo/subpage/xiaoFeiNengLi.jsp?screenId='+screenId;
     		                if(param.target.indexOf('偏好') != -1)
     		                	location.href = path + '/wo/subpage/shangPingPianHao.jsp?screenId='+screenId;
     		                if(param.target.indexOf('传播') != -1)
     		                	location.href = path + '/wo/subpage/chuanBoZhiShu.jsp?screenId='+screenId; 
    				    });	 
    				    
    				    
    				    var _zr = myChart.getZrender();  //获取zrender示例     
    		            var TextShape = require('zrender/shape/Text');  //调用zrender里面的方法来解决     
    		            var textShape = new TextShape({         
    		            	style: {             
    		            		x: _zr.getWidth() / 2 +95,              
    		            		y: _zr.getHeight() / 2 + 15,   
    		            		color: '#f8434a',              
    		            		text: '天气适播指数 60',              
    		            		textAlign: 'center',  
    		            		textFont : 'bold 18px verdana' 
//    		            		position : 'center',
//    		            		textStyle : {
//    		                        fontSize : '20',
//    		                        fontWeight : 'bold'
//    		                    },
//    		                    color: '#f8434a',              
//    		            		text: '天气适播指数 60'
    		            	}
    		            });
    		            
    		           
    		            
    		            _zr.addShape(textShape); 
    		            
    		            myChart.on(ecConfig.EVENT.HOVER, function (param) {
    		            	_zr.modShape(textShape.id, 
    		                   		{
    		                   			style: {
    		    			                	text:'',
    		    			                	color: '#fff'
    		    		                	}
    		                   		});
    		            });
    		            
    		            myChart.on(ecConfig.EVENT.MOUSEOUT, function (param) {
    		            	
    		           	 var name = param.name;
    		           	 var color = '#fff';
    		           	 if(param.name.indexOf('适播') != -1)
    		           		 color = '#f8434a';
    		                if(param.name.indexOf('流量') != -1)
    		               	 color = '#ff9434';
    		                if(param.name.indexOf('时段') != -1)
    		               	 color = '#f5e40f';
    		                if(param.name.indexOf('特征') != -1)
    		               	 color = '#009aca';
    		                if(param.name.indexOf('消费') != -1)
    		               	 color = '#12c4cd';
    		                if(param.name.indexOf('偏好') != -1)
    		               	 color = '#a9d86e';
    		                if(param.name.indexOf('传播') != -1)
    		               	 color = '#CDCD00';
    		           	
    		               _zr.modShape(textShape.id, 
    		               		{
    		               			style: {
    					                	text:name,
    					                	color: color
    				                	}
    		               		});
    		           });
	                }  
	          )
}

function switchover(self){
	
	var screenId = $(self).attr("screenId");
	var cityName = $(self).attr("cityName");
	var screenType = $(self).attr("screenType");
	var lon = $(self).attr("lon");
	var lat = $(self).attr("lat");
	
	var curText = $(".selectNenu em").text();
	var curScreenId = $(".selectNenu em").attr("screenId");
	var curCityName = $(".selectNenu em").attr("cityName");
	var curLon = $(".selectNenu em").attr("lon");
	var curLat = $(".selectNenu em").attr("lat");
	var curScreenType = $(".screenType").text();
	
	$(".selectNenu em").text($(self).text());
	$(".selectNenu em").attr("screenId",screenId);
	$(".selectNenu em").attr("cityName",cityName);
	$(".selectNenu em").attr("lon",lon);
	$(".selectNenu em").attr("lat",lat);
	
	$(".screenType").text(screenType);
	$(".screenPath").attr("src","images/screen/"+screenId+".jpg")
	
	$(self).text(curText);
	$(self).attr("screenId",curScreenId);
	$(self).attr("cityName",curCityName);
	$(self).attr("lon",curLon);
	$(self).attr("lat",curLat);
	$(self).attr("screenType",curScreenType);
//		loadWeath(cityName);
		loadData(screenId,"201507");
		getScore(screenId,1,"201507");
		$(".selectNenu dl").stop().hide();
		
		if (cityName == "潮州" || cityName == "茂名" || cityName == "佛山" || cityName == "汕头"
			|| cityName == "清远" || cityName == "湛江" || cityName == "惠州" || cityName == "肇庆"
			|| cityName == "阳江" || cityName == "揭阳" || cityName == "梅州") {
			map.setMapType(BMAP_NORMAL_MAP);
			map.centerAndZoom(new BMap.Point(lon, lat), 18);
		} else {
			map.setMapType(BMAP_PERSPECTIVE_MAP);
			map.setCurrentCity(cityName);
			map.centerAndZoom(new BMap.Point(lon, lat), 18);
		}
	
} 


function getSql_1(){
	return "select * from WO_TB_LARGESCREEN";
}

function getSql_2(screenId,date){
	
//	return	"SELECT LEVL,VALUES_1 FROM WO_TB_REPORT_RE " +
//				"WHERE KPI_TYPE=1 AND "+
//					"DEAL_DATE='"+date+"' AND " +
//					"SCREEN_ID='"+screenId+"'";
	
	return "SELECT LEVL,VALUE,KPI_NAME FROM wo_tb_general_info "+
			"WHERE SCREEN_ID = '"+screenId+"' AND PAGE_TYPE <> 1 AND "+
					"DEAL_DATE='"+date+"'  " ;
}

function getSql_3(screenId,pageType,date){
	
	return	"SELECT * FROM WO_TB_GENERAL_INFO WHERE "
				+ "SCREEN_ID='"+screenId+"' AND "
				+ "PAGE_TYPE='"+pageType+"' AND "
				+ "DEAL_DATE='"+date+"' ";
}

function getWeatherSql(){
	//var now = new Date();
	var date = $("#inputDate").val();
	var day = date.substring(0,4)+"-"+date.substring(5,7)+"-"+date.substring(8,10);
//	return	"SELECT * FROM wo_tb_weather WHERE "
//			+ "day='2016-03-30' and hour='"+(now.getHours()-1)+"'";
	return	"SELECT * FROM (SELECT * FROM wo_tb_weather WHERE "
				+ "day='"+day+"' order by lasttime desc) WHERE rownum = 1 ";
}
