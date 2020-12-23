// ----- status_slider-------------------------------------------------------
$.widget("sv.status_roundslider", $.sv.widget, {

	initSelector: 'div[data-widget="status.roundslider"]',

	options: {
		radius : 80,
		startangle : 315,
		handlesize:20,
		step:1,
		scale_interval:10, 
		scale_min: 0, 
		scale_max: 100, 
		width:15, 
		thickness:0.1,
		circleshape:"pie", 
		slidertype:"min-range",
		icon:"",
	},

	_create: function() {
	this._super();
	},
	
	_update: function(response) {
		//item trigger-> gibt value vor
		//item_array mit bildern
		//item wohin value geschickt werden soll
		
		var id = this.element.attr('id');
		console.log(id);
		var user_value = response[0];
		var user_value_length = 0;
		var user_data_send = response[1];
		//eventuell fixed width?! 
		this.options.handlesize = this.options.width +15;
		if (Array.isArray(user_value)){
			user_value_length = user_value.length;
			user_value= user_value_length;
			console.log("Array übergeben mit länge",user_value_length);
		};
		
		var user_value_item = this.options.item.explode();
		var unit = this.element.attr('data-values').explode()[0];
		var pre_value = this.element.attr('data-values').explode()[1];
		var to_value = this.element.attr('data-values').explode()[2];
		var scale = this.element.attr('data-values').explode()[3];
		var scale_interval = this.options.scale_interval;

		
		//get colours from css theme
		var bg_color = $('.ui-bar-b').css('background-color');
		var font_color = $('.ui-content').css('color');
		var track_color = $('.ui-bar-a').css('background-image');
		var path_color = $(".ui-bar-a").css('background-color');
		var border_color = $(".ui-bar-b").css('border-bottom-color');
		var handle_color = $(".ui-page-theme-a.ui-btn").css('background-image');
		
		
		console.log("###################DEBUG:");
		console.log("Scale min  ",this.options.scale_min);
		console.log("Scale min  ",this.options.scale_max);
		console.log("Scale  ?  ",scale);
		console.log("Value1 ",response[0]);
		console.log("Value2 ",response[1]);
		console.log("Value length ",user_value_length);
		console.log("Value item ",user_value_item);
		console.log("Value send ",response[1] );
		console.log("bg color ",bg_color );
		console.log("track color ",track_color );
		console.log("path color ",path_color );
		console.log("handle color ",handle_color );
		console.log("border color ",border_color );
		console.log("font color ", font_color );
		
		// generiert die scale-nummern
		if (scale == "true"){
			//scala ungerade striche (lang)
			$.fn.roundSlider.prototype.defaults.create = function() {
			  
			  console.log("create numbers!");
			  var o = this.options;
			  for (var i = o.min; i <= o.max; i += scale_interval) {
				var angle = this._valueToAngle(i);
				var numberTag = this._addSeperator(angle, "rs-custom");
				var number = numberTag.children();
				number.clone().css({
				  "width": o.width + this._border(),
				  "margin-top": this._border(true) / -2,
				  "margin-right": '10px',
				}).appendTo(numberTag);
				number.removeClass().addClass("rs-number").html(i).rsRotate(-angle);
				$(".rs-number").css("color",font_color); 
				$(".rs-seperator").css("border-color",border_color );
				$(".rs-seperator").css("border-width","2px");
				$(".rs-seperator").css("width","10px");
				$(".rs-seperator").css("margin-left","-10px"); 
				
			  };
			  //scala gerade striche (kurz)
			  var interval = scale_interval/2;
			  for (var i = o.min; i <= o.max; i += interval) {
				var angle = this._valueToAngle(i);
				var numberTag = this._addSeperator(angle, "rs-custom_1");
				numberTag.addClass( "rs-seperator_1" );
				$("rs-seperator_1").css("border-color",border_color );
				$("rs-seperator_1").css("border-width","2px");
				$("rs-seperator_1").css("width","5px");
				$("rs-seperator_1").css("height","1px");
				$("rs-seperator_1").css("margin-left","-10px"); 
				
			  };
			};
		};
		
		
		//$(".rs-path").addClass("ui-bar-inherit");
		//falls trigger= array und value gesetzt
		//dann müssen 2 items übermittelt werden, 1 das triggeritem bzw die daten 
		//und das 2te , an welches der ausgewählte wert gesendet werden soll
		//man kann dann das bild wählen, welches dann im kreis angezeigt wird
		// if (Array.isArray(user_value)){
			// console.log("Value ist array, länge ", user_trigger.length);
			// if (Number.isInteger(user_value)){
				// console.log("Value numerisch und index des arrays", user_index);
				// var val = $("div#"+id).roundSlider("option", "value");
				// console.log(val);
				// $(this).find("rs-tooltip").prepend("<img src="+user_trigger[val]+" width='1em' style='border-radius: 100%;-webkit-border-radius: 100%;-moz-border-radius: 100%;>");
				
			// };
		// };
	//eigentlicher Aufruf roundslider	
	$("div#"+id).roundSlider({
		circleShape: this.options.circleshape,
		sliderType: this.options.slidertype,
		editableTooltip: false,
		showTooltip: true,
		handleSize: this.options.handlesize,
		radius: this.options.radius,
		width: this.options.width,
		thickness: this.options.thickness,
		min: this.options.scale_min,
		max: this.options.scale_max,
		step: this.options.step,
		value: user_value,
		
		startAngle: this.options.startangle,
		svgMode: true,
			tooltipFormat://'changeTooltip',
				function (args) {
					return "<div id='rs_value_pre' style='font-size:0.4em; '>"+ pre_value +"</div><div id='value' style='font-weight:bold;font-size:0.8em;'>" + args.value + unit +"</div><div id='rs_value_to' style='font-size:0.4em;'>"+to_value+"</div>";
				},
			
			drag: function (args) {

				//user_trigger =  array mit bildern
				//user_data_send = item welches beschrieben werden soll
				// if (Array.isArray(user_value)){
					// console.log("Value",args.value);
					// console.log("Item",user_value_item[1]);
					// io.write(user_value_item[1], args.value);
					// $("#"+id).find("img").append("<img  src="+user_value[args.value]+" style='width: 2em; clip-path: circle(); '>")
				// }else{
					//console.log("Value",args.value);
					//console.log("Item",user_value_item[0]);
					io.write(user_value_item[0], args.value);
				//}
					
			},
			change: function (args) {
				io.write(user_value_item[0], args.value);
			},
			
			beforeCreate: function (args) {
				//$("#"+id+" rs-handle").css('box-shadow', '0px 0px 15px #875009');
				//$("#"+id).find("rs-handle").css('box-shadow', handle_color );
				//$("#"+id).find("rs-handle").css('background-image', handle_color );
				//$("#"+id).find("rs-range").css('background-image', track_color );
				//$("#"+id+" .rs-handle").css('box-shadow', '0px 0px 15px #875009');
				//$("#"+id).find(".rs-handle").css('box-shadow', handle_color );
				//$("#"+id).find(".rs-handle").css('background-image', handle_color );
				//$("#"+id).find(".rs-range").css('background-image', track_color );
			},
			tooltipColor: function (args) {
				return font_color;
			},
			rangeColor: function (args) {
				return bg_color;
			},
			pathColor: function (args) {
				return path_color;
			},
			borderColor: function (args) {
				return border_color;
			}//,
			//create: function(args){
				//$(".rs-path").addClass("ui-bar-inherit");//css('box-shadow:', '0px 0px 15px  red');
			//	$(".rs-handle").css('box-shadow:', '0px 0px 15px  red');
			//}
		});
		//window.onSliderCreate = function (args) {
			//$("div#"+id).find(".rs-tooltip").html("<div id='rs_value_pre' style='font-size:0.4em; '>"+ pre_value +"</div><div id='value' style='font-weight:bold;font-size:0.8em;'>" + args.value + unit +"</div><div id='rs_value_to' style='font-size:0.4em;'>"+to_value+"</div>");
		//	return "<div id='rs_value_pre' style='font-size:0.4em; '>"+ pre_value +"</div><div id='value' style='font-weight:bold;font-size:0.8em;'>" + args.value + unit +"</div><div id='rs_value_to' style='font-size:0.4em;'>"+to_value+"</div>";
				
		//	};
		$("#"+id+" .rs-handle").css('box-shadow', '0px 0px 15px #875009');
		$("#"+id+" .rs-handle").css('box-shadow', handle_color );
		$("#"+id+" .rs-handle").css('background-image', handle_color );
		$("#"+id+" .rs-range").css('background-image', track_color );
		
		
		
		//$("div[aria-label|='"+id+"_handle']").css('box-shadow', '0px 0px 15px #875009');
		//$("div[aria-label|='"+id+"_handle']").css('box-shadow', handle_color );
		//$("div[aria-label|='"+id+"_handle']").css('background-image', handle_color );
		//$(".rs-range").css('background-image', track_color );


		
		window.changeTooltip = function (args) {
				var val = args.value;
				var icon = $("div#"+id).attr('data-icon');
				console.log("icon übergebn", icon);
				// if (Array.isArray(user_value)){
					
					// return "<img src="+user_value[val] +" style='width:1em; margin:auto; margin-bottom: 0em; border-radius: 30%; -webkit-border-radius: 50%; -moz-border-radius: 50%;display:block !important;'>";
				// }else if (icon != ''){
					// //add default path if icon has no path
					// if(icon.indexOf('.') == -1){
						// icon = icon+'.svg';
					// };
					// if(icon.indexOf('/') == -1){
						// icon = 'icons/ws/'+icon;
					// }else{
						// icon = icon;	
					// };
					// return "<img src="+icon +" style='width:2em; margin:auto; margin-bottom: 0em; margin-top:-2em; clip-path: circle(); display:block !important;'><div id='value' style='font-weight:bold;font-size:1em;'>" + args.value + unit +"</div><div id='rs_value_to' style='font-size:0.5em;'>"+to_value+"</div>";;
				// }else{
					//$("div#"+id).find(".rs-tooltip").html("<div id='rs_value_pre' style='font-size:0.4em; '>"+ pre_value +"</div><div id='value' style='font-weight:bold;font-size:0.8em;'>" + args.value + unit +"</div><div id='rs_value_to' style='font-size:0.4em;'>"+to_value+"</div>");
					return "<div id='rs_value_pre' style='font-size:0.4em; '>"+ pre_value +"</div><div id='value' style='font-weight:bold;font-size:0.8em;'>" + args.value + unit +"</div><div id='rs_value_to' style='font-size:0.4em;'>"+to_value+"</div>";
				//}
			
			}

	},
	
	_events: {
	}
});

// ----- status_rtr_slider-------------------------------------------------------
$.widget("sv.status_rtr_slider", $.sv.widget, {

	initSelector: 'div[data-widget="status.rtr_slider"]',

	options: {
		radius : 120,
		startangle : 315,
		handlesize:20,
		step:0.1,
		scale_interval:10, 
		scale_min:5, 
		scale_max:30, 
		width:20, 
		thickness:0.1,
		circleshape:"full", 
		slidertype:"min-range",
		icon:"",
	},

	_create: function() {
	this._super();

	},
	
	_update: function(response) {
		console.log("RTR SLIDER");
		var id = this.element.attr('id');
		var scale_min = this.element.attr('data-values').explode()[0];
		var scale_max = this.element.attr('data-values').explode()[1];
		var step = this.element.attr('data-values').explode()[2];
		var value = this.element.attr('data-values').explode()[3];
		var unit = this.element.attr('data-values').explode()[4];
		var pre_value = this.element.attr('data-values').explode()[5];
		var to_value = this.element.attr('data-values').explode()[6];
		var scale_interval = 5;
		var radius = 120;
		var startangle = 315;
		var handlesize = 20;
		var endangle= 225;
		//$("div#"+id).append("<div class ='slider'></div><div id= 'innerslider'><div>");
		console.log('items', response);
		//item_value, item_actual, item_set, item_comfort, item_night, item_frost, item_state
		//console.log('value', response[0]);
		//console.log('actual',response[1]);
		//console.log('set',response[2]);
		//console.log('comfort',response[3]);
		//console.log('night',response[4]);
		//console.log('frost',response[5]);
		//console.log('state',response[6]);
		// item_actual =ist
		// a item for the actual temperature
		// item_set = soll
		// a item for the set temperature
		// item_comfort
		// a item for comfort / standby (3x bit or 1x byte)
		// item_night
		// a item for night (3x bit or 1x byte)
		// item_frost
		// a item for frost (3x bit or 1x byte)
		// item_state  = on/off from the actor
		// a item for the current state of the actor
		//get colours from css theme
		var bg_color = $('.ui-bar-b').css('background-color');
		var font_color = $('.ui-content').css('color');
		var track_color = $('.ui-bar-a').css('background-image');
		var path_color = $(".ui-bar-a").css('background-color');
		var border_color = $(".ui-bar-b").css('border-bottom-color');
		var handle_color = $(".ui-page-theme-a.ui-btn").css('background-image');
		
		
		

		
	
		
		// Displays the outer Slider
		// is the SOLL Value
		$.fn.roundSlider.prototype.defaults.create = function() {
			  
			  console.log("create numbers!");
			  var o = this.options;
			  for (var i = o.min; i <= o.max; i += scale_interval) {
				var angle = this._valueToAngle(i);
				var numberTag = this._addSeperator(angle, "rs-custom");
				var number = numberTag.children();
				number.clone().css({
				  "width": o.width + this._border(),
				  "margin-top": this._border(true) / -2,
				  "margin-right": '10px',
				}).appendTo(numberTag);
				number.removeClass().addClass("rs-number").html(i).rsRotate(-angle);
				$(".rs-number").css("color",font_color); 
				$(".rs-seperator").css("border-color",border_color );
				$(".rs-seperator").css("border-width","2px");
				$(".rs-seperator").css("width","10px");
				$(".rs-seperator").css("margin-left","-10px"); 
				
			  };
			  //scala gerade striche (kurz)
			  var interval = scale_interval/2;
			  for (var i = o.min; i <= o.max; i += interval) {
				var angle = this._valueToAngle(i);
				var numberTag = this._addSeperator(angle, "rs-custom_1");
				numberTag.addClass( "rs-seperator_1" );
				$("rs-seperator_1").css("border-color",border_color );
				$("rs-seperator_1").css("border-width","2px");
				$("rs-seperator_1").css("width","5px");
				$("rs-seperator_1").css("height","1px");
				$("rs-seperator_1").css("margin-left","-10px"); 
				
			  };
			};
			
		$("#"+id+".outerslider").roundSlider({
								//scala ungerade striche (lang)
			
			
		  sliderType: "min-range",
		  radius: 120,
		  showTooltip: false,
		  value: response[0],
		  circleShape: "full",
		  startAngle: "315",
		  endAngle: "225",
		  min: "5",
		  max: "30",
		  handleShape: "square",
		  handleSize: "20,0",

			svgMode: true,
			///  create: function() {
			//	this._editTooltip();
			//	this._handles().append("<div class='inner-handle rs-transition'></div>");
			//	this._handles().children().html(this.options.value.toFixed(1) + "&deg").rsRotate(-this._handle2.angle);
			//  },
			  change: "valueChange",
			  drag: "valueChange",
			  
			tooltipColor: function (args) {
				return font_color;
			},
			rangeColor: function (args) {
				return track_color;
			},
			pathColor: function (args) {
				return path_color;
			},
			borderColor: function (args) {
				return border_color;
			}
			});

		
	$("#"+id+".innerslider").roundSlider({
		   step: "0.1",
		  min: "5",
		  max: "30",
		  sliderType: "min-range",
		  radius: 100,
		  showTooltip: true,
		  value: 20.0,
		  circleShape: "full",
		  startAngle: "315",
		  endAngle: "225",
		  handleShape: "square",
		  handleSize: "60,10",
		  tooltipFormat: "changeTooltip",
		  editableTooltip: false,
		  svgMode: true,
		tooltipColor: function (args) {
			return "white";
		},
		rangeColor: function (args) {
			return "transparent";
		},
		pathColor: function (args) {
			return "transparent";
		},
		borderColor: function (args) {
			return "transparent";
		},
		// create: function() {
			 // $("#"+id).find(".inner-handle").css({
				 // 'position': 'absolute',
					// 'left': '-35px'}
				 // );
			
			// var icon1 = $("<img class='icon icon0 cold ' style='position:absolute; top: 55%; margin-bottom:20px; left: 20px;' src='icons/ws/sani_cooling.svg'/>");
			// var icon2  = $("<img class='icon icon0 on_off' style='position: absolute; top: 55%; margin-bottom:20px; left: 75px;' src='icons/ws/sani_floor_heating.svg'/>");
			// var icon3  = $("<img class='icon icon0 hot' style='position: absolute; top: 55%; margin-bottom:20px; right: 20px;' src='icons/ws/sani_floor_heating.svg'/>");
			
			// $("#"+id+".innerslider").find(".rs-inner-container").append(icon1, icon2, icon3);
			// var btn1 = $("<button id='sub' class='ui-btn ui-mini ui-corner-all ui-btn-inline' style='position: absolute; top: 75%;  left: 35px;'>&#9660</button>");
			// var btn2 = $("<button id='onoff' class='ui-btn ui-mini ui-corner-all ui-btn-inline' style='position: absolute; top: 75%;  left: 78px;'>on/off</button>");
			// var btn3 = $("<button id='add' class='ui-btn ui-mini ui-corner-all ui-btn-inline' style='position: absolute; top: 75%; right: 35px;'>&#9650</button>");
			// $("#"+id+".innerslider").find(".rs-inner-container").append(btn1, btn2, btn3);
		
			// btn1.click(function() {
			  // //this.setValue(this.options.value - 0.1);
			  // console.log("minus");
			// });
			// btn2.click(function() {
			  // console.log("öln-öff");
			// });
					
			
			// icon1.click(function() {
				  // //this.setValue(this.options.value - 0.1);
				  // console.log("freeze");
				  
			// });
			// icon2.click(function() {
				  // //this.setValue(this.options.value - 0.1);
				  // console.log("freeze");
			// });
			// icon3.click(function() {
				  // //this.setValue(this.options.value - 0.1);
				  // console.log("freeze");
				  
			// });
		  //}
		});
		
		$("#"+id+" .rs-handle").css('box-shadow', '0px 0px 15px #875009');
		$("#"+id+" .rs-handle").css('box-shadow', handle_color );
		$("#"+id+" .rs-handle").css('background-image', handle_color );
		$("#"+id+" .rs-range").css('background-image', track_color );
	},
	
	_events: {
	}
});
// ----- status_rtr_slider-------------------------------------------------------
$.widget("sv.status_rtr_slider2", $.sv.widget, {

	initSelector: 'div[data-widget="status.rtr_slider2"]',
	options: {
		radius : 120,
		startangle : 315,
		step:1,
		scale_interval:2, 
		scale_min:5, 
		scale_max:30, 
		width:20, 
		thickness:0.1,
		circleshape:"full", 
		slidertype:"min-range",
	},

	_create: function() {
	this._super();
	},
	
	_update: function(response) {
		console.log("RTR SLIDER");
		var items = response;
		var item_names = this.options.item.explode();
		var istwert = items[0];
		var sollwert = items[1];
		var id = this.element.attr('id');
		var scale_min = this.options.scale_min;//20;
		var scale_max = this.options.scale_max;//28;
		var step = this.options.step; //0.2;
		var value = this.element.attr('data-values').explode()[3];
		var unit = "°C";
		var pre_value = this.element.attr('data-values').explode()[5];
		var to_value = this.element.attr('data-values').explode()[6];
		var scale_interval = this.options.scale_interval;
		var radius = 120;
		var startangle = 315;
		var handlesize = 20;
		var endangle= 225;
		var width=15;
		
		
		//Variablen 
		var state;
		var freeze;
		var comfort;
		var night; 
		
		
		//DEBUG
		//ist
		//soll
		//comfort
		//night
		//frost
		//state
		
		
		console.log('items', items);
		console.log('item_names', item_names);
		
		//get colors
		var bg_color = $('.ui-bar-b').css('background-color');
		var font_color = $('.ui-content').css('color');
		var track_color = $('.ui-bar-a').css('background-image');
		var path_color = $(".ui-bar-a").css('background-color');
		var border_color = $(".ui-bar-b").css('border-bottom-color');
		var handle_color = $(".ui-page-theme-a.ui-btn").css('background-image');
			
		//draw numers
			$.fn.roundSlider.prototype.defaults.create = function() {
			  console.log("create numbers!");
			  var o = this.options;
			  for (var i = o.min; i <= o.max; i += scale_interval) {
				var angle = this._valueToAngle(i);
				var numberTag = this._addSeperator(angle, "rs-custom");
				var number = numberTag.children();
				number.clone().css({
				  "width": o.width + this._border(),
				  "margin-top": this._border(true) / -2,
				  "margin-right": '10px',
				}).appendTo(numberTag);
				number.removeClass().addClass("rs-number").html(i).rsRotate(-angle);
				$("#"+id+".outerslider .rs-number").css("color",font_color); 
				$("#"+id+".outerslider .rs-seperator").css("border-color",border_color );
				$("#"+id+".outerslider .rs-seperator").css("border-width","2px");
				$("#"+id+".outerslider .rs-seperator").css("width","15px");
				$("#"+id+".outerslider rs-seperator_1").css("height","1px");
				$("#"+id+".outerslider .rs-seperator").css("margin-left","-10px"); 
				
			  };
			  //scala gerade striche (kurz)
			  var interval = scale_interval/2;
			  for (var i = o.min; i <= o.max; i += interval) {
				var angle = this._valueToAngle(i);
				var numberTag = this._addSeperator(angle, "rs-custom_1");
				numberTag.addClass( "rs-seperator_1" );
				$("#"+id+".outerslider rs-seperator_1").css("border-color",border_color );
				$("#"+id+".outerslider rs-seperator_1").css("border-width","2px");
				$("#"+id+".outerslider rs-seperator_1").css("width","10px");
				$("#"+id+".outerslider rs-seperator_1").css("height","1px");
				$("#"+id+".outerslider rs-seperator_1").css("margin-left","-25px"); 
				
			  };
			};
		
	//Sollwert
	$("div#"+id+".outerslider").roundSlider({
		  step:this.options.step,  
		  sliderType: "min-range",
		  radius: 110,
		  showTooltip: true,
		  editableTooltip: false,
		  value: sollwert,
		  circleShape: "full",
		  startAngle: "315",
		  endAngle: "225",
		  min: scale_min,
		  max: scale_max,
		  handleShape: "round",
		  handleSize: "20,0",
		width:width,
		
		startAngle: this.options.startangle,
		svgMode: true,
			tooltipFormat:function (args){
				//$("#"+id+".outerslider").find(".rs-tooltip").empty();
				//$("#"+id+".outerslider").html("<span id='rs_value_to' style='font-size:1em;color:"+font_color+";'>Soll: "+args.value+"</span>");
				console.log("Funktion change sollwert aufgerufen");
				return"<span style='top:-2em; font-size:0.4em;color:"+font_color+";'>Soll: "+args.value+"°C</span> <div id='icons' style='z-index: 2; position: absolute; left:-1.0em; top: 0.8em; width:4em;'> </div> <div id='btns' style='z-index: 2; position: absolute; left:-1em; top: 1.8em; width:4em;'></div>"
			},
			drag: function (args) {
				io.write(response[1], args.value);	
			},
			change: function (args) {
				io.write(response[1], args.value);
			},
			
			beforeCreate: function (args) {
				
				$("#"+id+".outerslider .rs-handle").css('box-shadow', '0px 0px 15px #875009');
				$("#"+id+".outerslider .rs-handle").css('box-shadow', handle_color );
				$("#"+id+".outerslider .rs-handle").css('background-image', handle_color );
				$("#"+id+".outerslider .rs-range").css('background-image', track_color );
				
			},
			

			rangeColor: function (args) {
				return border_color;
			},
			pathColor: function (args) {
				//return 'transparent';
				return path_color;
			},
			borderColor: function (args) {
				return border_color;
			}
			
		});
		//function changeSollwert(args){
		///	$("#"+id+".outerslider").find(".rs-tooltip").empty();
		//	$("#"+id+".outerslider").find(".rs-tooltip").append("<span style='top:-2em; font-size:0.4em;color:"+font_color+";'>Soll: "+args.value+"°C</span> <div id='icons' style='z-index: 2; position: absolute; left:-1.0em; top: 0.8em; width:4em;'> </div> <div id='btns' style='z-index: 2; position: absolute; left:-1em; top: 1.8em; width:4em;'></div>");
			
		//}
		
		//add tooltip symbols
		var icon1 = $("<img class='icon icon0 comfort' style='width:36px; position: relative;  ' src='icons/ws/user_away.svg' alt='user_away'/>");
		var icon2  = $("<img class='icon icon0 night' style='width:36px; position: relative; ' src='icons/ws/scene_night.svg' alt='scene_night'/>");
		var icon3  = $("<img class='icon icon0 freeze' style='width:36px; position: relative; ' src='icons/ws/weather_frost.svg' alt='weather_frost'/>");
		//var icon3 = $('<svg class="freeze fx-icon icon" style="width:36px; position: relative;"  viewBox="20 20 321 321" role="img" aria-label="weather_frost" alt="weather_frost" ><g><path d="m175.642,93.244c0,29.179 0,58.358 0,87.538 0,6.449 10,6.449 10,0 0-29.179 0-58.358 0-87.538 .001-6.449-10-6.449-10,0z"></path><path d="m152.646,106.373c8.507,4.912 17.014,9.823 25.521,14.734 5.595,3.23 10.628-5.413 5.047-8.635-8.507-4.912-17.014-9.823-25.521-14.734-5.595-3.23-10.629,5.413-5.047,8.635z"></path><path d="m203.301,97.738c-8.507,4.912-17.014,9.823-25.521,14.734-5.582,3.222-.548,11.865 5.047,8.635 8.507-4.912 17.014-9.823 25.521-14.734 5.581-3.222 .548-11.865-5.047-8.635z"></path><path d="m102.005,140.322c25.27,14.59 50.54,29.18 75.81,43.769 5.595,3.23 10.628-5.412 5.047-8.634-25.27-14.59-50.54-29.18-75.81-43.77-5.594-3.23-10.628,5.412-5.047,8.635z"></path><path d="m101.947,166.788c8.507-4.911 17.014-9.823 25.521-14.734 5.582-3.222 .548-11.865-5.047-8.635-8.507,4.911-17.014,9.823-25.521,14.734-5.581,3.222-.547,11.865 5.047,8.635z"></path><path d="m119.752,118.602c0,9.823 0,19.646 0,29.468 0,6.449 10,6.449 10,0 0-9.823 0-19.646 0-29.468 0-6.449-10-6.449-10,0z"></path><path d="m107.245,227.8c25.271-14.59 50.541-29.18 75.811-43.771 5.581-3.222 .548-11.865-5.047-8.634-25.271,14.59-50.541,29.18-75.811,43.77-5.582,3.223-.548,11.865 5.047,8.635z"></path><path d="m130.089,241.135c0-9.823 0-19.646 0-29.469 0-6.448-10-6.448-10,0 0,9.823 0,19.646 0,29.469 0,6.448 10,6.448 10,0z"></path><path d="m97.238,201.584c8.507,4.911 17.014,9.823 25.521,14.734 5.595,3.23 10.628-5.412 5.047-8.635-8.507-4.911-17.014-9.823-25.521-14.734-5.595-3.23-10.629,5.412-5.047,8.635z"></path><path d="m185.545,267.566c0-29.18 0-58.359 0-87.539-.001-6.449-10-6.449-10,0 0,29.179 0,58.359 0,87.539 0,6.449 10,6.449 10,0z"></path><path d="m208.541,254.437c-8.507-4.911-17.014-9.823-25.521-14.734-5.595-3.23-10.628,5.412-5.047,8.635 8.507,4.911 17.014,9.823 25.521,14.734 5.595,3.23 10.628-5.413 5.047-8.635z"></path><path d="m157.886,263.071c8.507-4.911 17.014-9.823 25.521-14.734 5.581-3.223 .548-11.865-5.047-8.635-8.507,4.911-17.014,9.823-25.52,14.734-5.583,3.223-.549,11.866 5.046,8.635z"></path><path d="m259.182,219.821c-25.271-14.59-50.541-29.18-75.811-43.769-5.595-3.23-10.629,5.413-5.047,8.634 25.27,14.59 50.541,29.18 75.811,43.77 5.594,3.231 10.628-5.412 5.047-8.635z"></path><path d="m259.238,193.355c-8.507,4.911-17.014,9.823-25.52,14.734-5.581,3.223-.548,11.865 5.047,8.635 8.507-4.911 17.014-9.823 25.52-14.734 5.581-3.222 .548-11.865-5.047-8.635z"></path><path d="m241.435,241.541c0-9.822 .001-19.645 .001-29.467 0-6.448-10-6.448-10,0 0,9.822-.001,19.645-.001,29.467 0,6.448 10,6.448 10,0z"></path><path d="m253.941,132.344c-25.271,14.59-50.54,29.18-75.81,43.77-5.582,3.223-.548,11.865 5.047,8.634 25.27-14.589 50.54-29.179 75.81-43.769 5.581-3.223 .548-11.865-5.047-8.635z"></path><path d="m231.098,119.007c0,9.823 0,19.646 0,29.469 0,6.449 10,6.449 10,0 0-9.823 0-19.646 0-29.469 0-6.448-10-6.448-10,0z"></path><path d="m263.948,158.559c-8.507-4.912-17.014-9.823-25.521-14.735-5.595-3.23-10.628,5.412-5.047,8.635 8.507,4.912 17.014,9.823 25.521,14.735 5.595,3.23 10.628-5.412 5.047-8.635z"></path></g></svg>');
		var icon4  = $("<img class='icon icon0 state' style='width:36px; position: relative; ' src='icons/ws/sani_heating.svg' alt='sani_heating'/>");
		$("#"+id+".outerslider").find("#icons").append(icon1, icon2, icon3, icon4);
		
		var btn1 = $("<button id='sub' class='ui-btn ui-micro ui-corner-all ui-btn-inline ui-nodisc-icon' style='position: relative; left:-1.0em'>-</button>");
		var btn2 = $("<button id='add' class='ui-btn ui-micro ui-corner-all ui-btn-inline ui-nodisc-icon' style='position: relative; right:-1.0em'>+</button>");
		$("#"+id+".outerslider").find("#btns").append(btn1, btn2);
		
		btn1.click(function() {
		  //this.setValue(this.options.value - 0.1);
		  sollwert = sollwert-step;
		  console.log("minus");
		  io.write(items[1], sollwert);
		});
		btn2.click(function() {
		  console.log("plus");
		  sollwert = sollwert+step;
		  io.write(items[1], sollwert);
		});
				
		
		icon1.click(function() {
			  //this.setValue(this.options.value - 0.1);
			  console.log("comfort");
			  comfort = !comfort;
			  if (comfort == true){
				icon1.addClass("icon1");  
			  }else{
				icon1.removeClass("icon1");  
			  }
		});
		icon2.click(function() {
			  //this.setValue(this.options.value - 0.1);
			  console.log("night");
			  night = !night;
			  if (night == true){
				icon2.addClass("icon1");  
			  }else{
				icon2.removeClass("icon1");  
			  }
		});
		
		icon3.click(function() {
			  //this.setValue(this.options.value - 0.1);
			  console.log("frost");
			  freeze = !freeze;
			  if (freeze == true){
				$("div#"+id+".freeze").addClass("icon1");  
			  }else{
				$("div#"+id+".freeze").removeClass("icon1");  
			  }
		});
		icon4.click(function() {
			  //this.setValue(this.options.value - 0.1);
			  console.log("state");
			  state = !state;
			  if (state == true){
				icon4.addClass("icon1");  
			  }else{
				icon4.removeClass("icon1");  
			  }
		});
		
		
		
	//ISTWERT
	$("#"+id+".innerslider").roundSlider({
		  step: this.options.step, 
		  min: this.options.scale_min,
		  max: this.options.scale_max,
		  width: width,
		  sliderType: "min-range",
		  radius: 100,
		  showTooltip: true,
		  value: istwert,
		  circleShape: "full",
		  startAngle: "315",
		  endAngle: "225",
		  handleShape: "round",
		  handleSize: "20,0",
		  tooltipFormat: function(args){
			  	return"<span style='position: relative;top:-2.2em;font-size:0.4em;color:"+font_color+"; '>Ist: </span></br><span style='position: relative;top:-1.7em;font-weight:bold;font-size:0.8em;color:"+font_color+";'>" + args.value + unit +"</span>";
		  },
		  editableTooltip: false,
		  svgMode: true,
		  
			tooltipColor: function (args) {
				return font_color;
			},
			rangeColor: function (args) {
				//return track_color;
				return bg_color;
			},
			pathColor: function (args) {
				return path_color;
				//return "transparent";
			},
			borderColor: function (args) {
				return border_color;
				//return "transparent";
			},
			
		create: function() {
			 $("#"+id).find(".inner-handle").css({
				 'position': 'absolute',
					'left': '-35px'}
				 );
		  }
		});
		
		//function changeIstwert(args){
		//	$("#"+id+".innerslider").find(".rs-tooltip").empty();
		//	$("#"+id+".innerslider").find(".rs-tooltip-text").append("<span style='position: relative;top:-2.2em;font-size:0.4em;color:"+font_color+"; '>Ist: </span></br><span style='position: relative;top:-1.7em;font-weight:bold;font-size:0.8em;color:"+font_color+";'>" + args.value + unit +"</span>");
		  //},
		//};
		
		$("#"+id+".innerslider .rs-tooltip").css('height', "1em");
		$("#"+id+".innerslider").removeClass("rs-seperator rs-seperator_1");
		$("#"+id+".innerslider .rs-handle").css('box-shadow', '0px 0px 15px #875009');
		$("#"+id+".innerslider .rs-handle").css('box-shadow', "red" );
		$("#"+id+".innerslider .rs-handle").css('background-image', "red" );
		$("#"+id+".innerslider .rs-range").css('background-image', "red");
		
	},
	
	_events: {
	}
});
