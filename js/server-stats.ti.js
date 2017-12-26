


var serverStats = {
	ping: function(){
		return true
	},

   // Render Server Memory Charts (line2d) version 1
	getServerMemoryStats_v1: function(URL){
        // ajax call function to Integration Server to fetch stats
         $.ajax({
           type: "GET",
        /** For authentitication to the server */
            crossDomain: true,
            xhrFields: {
              withCredentials: true
            },
           beforeSend: function (xhr) {
             //xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Server.username:Server.password)); //Get username and password from ServerProperties.js file
             xhr.setRequestHeader('Authorization', 'Basic ' + btoa('STC_BRM:STC_BRM00'));
           },
        /** End of authentication code */
           url: URL,
           accept:"application/json",
           contentType: "application/json",
           dataType: 'json',
           success: function (resp) {
           var instanceList = resp.timePlotXies.TimePlotXY;
		   var average = resp.timePlotXies.average;
			
			// chart Area2D   
			var myJsonObj = {

			"chart": {
				"caption": "Real-time Server Used memory",
				"subCaption": "In Percentage",
				"xAxisName": "Time",
				"yAxisName": "Memory %",
				"yaxisminvalue": "20",
				"lineThickness": "2",
				"paletteColors": "#0075c2",
				"baseFontColor": "#333333",
				"baseFont": "Helvetica Neue,Arial",
				"captionFontSize": "14",
				"subcaptionFontSize": "14",
				"subcaptionFontBold": "0",
				"showBorder": "0",
				"bgColor": "#ffffff",
				"showShadow": "0",
				"canvasBgColor": "#ffffff",
				"canvasBorderAlpha": "0",
				"divlineAlpha": "100",
				"divlineColor": "#999999",
				"divlineThickness": "1",
				"divLineDashed": "1",
				"divLineDashLen": "1",
				"showXAxisLine": "1",
				"xAxisLineThickness": "1",
				"xAxisLineColor": "#999999",
				"showAlternateHGridColor": "0",
				"showLabels": "0"
			},
			"data": [],
			"trendlines": [
             {
               "line": [
		                  {
		                    "startvalue": "70",
		                    "endvalue": "",
		                    "istrendzone": "",
		                    "valueonright": "1",
		                    "color": "fda813",
		                    "displayvalue": "High",
		                    "showontop": "1",
		                    "thickness": "1",
		                    "origText": "High"
		                },
		                {
		                    "startvalue": "90",
		                    "endvalue": "",
		                    "istrendzone": "",
		                    "valueonright": "1",
		                    "color": "f77027",
		                    "displayvalue": "Very High",
		                    "showontop": "1",
		                    "thickness": "1",
		                    "origText": "Very High"
		                },
						{
		                    "startvalue": average,
		                    "color": "#1aaf5d",
		                    "displayvalue": "Average "+average+"%",
		                    "valueOnRight": "1",
		                    "thickness": "1"
		                }
                       ]
             }
                        ]
            };
			   
			   
	   
			var myJsonObj;
			jQuery.each(instanceList, function(i, input) {
				  myJsonObj.data[i] = {
				  //"label": input.readingTime,
				  "label": moment(Number(input.readingTime)).format("hh:mm:ss a"),
				  "value": input.reading,
				  "stepSkipped": false
				  //"toolText": new Number(input.reading).toFixed(0) + "% Used Memory<br/>" + moment(Number(input.readingTime)).format("MMM DD, YYYY<br/>hh:mm:ss a")
				};
			  });


			var myChart = getChartFromId('serviceVolumesChartId');

				   if(!myChart) {
						  myChart = new FusionCharts("line", "serviceVolumesChartId", "100%", "300");
						  myChart.setJSONData(myJsonObj);
						  myChart.render("serviceVolumesChartContainer");
						 flag = true;
					  } else {
						   var chart = FusionCharts("serviceVolumesChartId");
						   chart.setJSONData(myJsonObj);
						   chart.render("serviceVolumesChartContainer");
				 }
            
        },
            error: function (request, status, error) {
                   var errorDump = request.responseText;
                   var errorText = errorDump.substring(0,300);
                   
                            swal(
                           'Failure!',
                            errorText,
                           'error'
                            )
                        }
            });     
	},

   // Render Server Memory Charts (area2d) version 2
	getServerMemoryStats_v2: function(URL){
       
         // ajax call function to Integration Server to fetch stats
         $.ajax({
            type: "GET",
            /** For authentitication to the server */
            crossDomain: true,
            xhrFields: {
              withCredentials: true
            },
           beforeSend: function (xhr) {
             //xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Server.username:Server.password)); //Get username and password from ServerProperties.js file
             xhr.setRequestHeader('Authorization', 'Basic ' + btoa('STC_BRM:STC_BRM00'));
           },
           /** End of authentication code */
           url: URL,
           accept:"application/json",
           contentType: "application/json",
           dataType: 'json',
           success: function (resp) {
           var instanceList = resp.timePlotXies.TimePlotXY;
			
			// chart Area2D   
			var myJsonObj = {

			"chart": {
				    "caption": "Real-time Server Used memory",
                    "subCaption": "In Percentage",
                    "xAxisName": "Time",
                    "yAxisName": "Memory %",
					//"numberPrefix": "$",
					"refreshinterval": "5",
					"yaxisminvalue": "35",
					"yaxismaxvalue": "36",
					"numdisplaysets": "10",
					"showValues": "0",
					"showRealTimeValue": "0",

					 //Cosmetics
					"paletteColors" : "#0075c2,#1aaf5d",
					"baseFontColor" : "#333333",
					"baseFont" : "Helvetica Neue,Arial",
					"captionFontSize" : "14",
					"subcaptionFontSize" : "14",
					"subcaptionFontBold" : "0",
					"showBorder" : "0",
					"bgColor" : "#ffffff",
					"showShadow" : "0",
					"canvasBgColor" : "#ffffff",
					"canvasBorderAlpha" : "0",
					"divlineAlpha" : "100",
					"divlineColor" : "#999999",
					"divlineThickness" : "1",
					"divLineIsDashed" : "1",
					"divLineDashLen" : "1",
					"divLineGapLen" : "1",
					"usePlotGradientColor" : "0",
					"showplotborder" : "0",
					"showXAxisLine" : "1",
					"xAxisLineThickness" : "1",
					"xAxisLineColor" : "#999999",
					"showAlternateHGridColor" : "0",
                  },
			   "data": [],
			   "styles": {
			   "definition": [
				 {
				   "name": "Bevel",
				   "type": "bevel",
				   "distance": "4",
				   "blurx": "2",
				   "blury": "2"
				 },
				 {
				   "name": "DataValuesFont",
				   "type": "font",
				   "bordercolor": "1D8BD1",
				   "bgcolor": "1D8BD1",
				   "color": "153E7E"
				 },
				 {
				   "name": "myAnim",
				   "type": "animation",
				   "param": "_alpha",
				   "start": "0",
				   "duration": "1"
				 },
				 {
				   "name": "dummyShadow",
				   "type": "Shadow",
				   "alpha": "0"
				  }
			     ]
			   }
             };
			   
			   
	   
			var myJsonObj;
			jQuery.each(instanceList, function(i, input) {
				  myJsonObj.data[i] = {
				  //"label": input.readingTime,
				  "label": moment(Number(input.readingTime)).format("hh:mm:ss a"),
				  "value": input.reading,
				  "toolText": new Number(input.reading).toFixed(0) + "% Used Memory<br/>" + moment(Number(input.readingTime)).format("MMM DD, YYYY<br/>hh:mm:ss a")
				};
			  });


			var myChart = getChartFromId('serviceVolumesChartId');

				   if(!myChart) {
						  myChart = new FusionCharts("Area2D", "serviceVolumesChartId", "100%", "200");
						  myChart.setJSONData(myJsonObj);
						  myChart.render("serviceVolumesChartContainer");
						 flag = true;
					  } else {
						   var chart = FusionCharts("serviceVolumesChartId");
						   chart.setJSONData(myJsonObj);
						   chart.render("serviceVolumesChartContainer");
				 }
            
            },
            error: function (request, status, error) {
                   var errorDump = request.responseText;
                   var errorText = errorDump.substring(0,300);
                   
                            swal(
                           'Failure!',
                            errorText,
                           'error'
                            )
                        }
            });     
	},

    // Render charts for System threads and user sessions
	getSysThreadsAndSessions: function(URL){
        // ajax call function to Integration Server to fetch stats
       $.ajax({
           type: "GET",
           /** For authentitication to the server */
            crossDomain: true,
            xhrFields: {
              withCredentials: true
            },
            beforeSend: function (xhr) {
             //xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Server.username:Server.password)); //Get username and password from ServerProperties.js file
             xhr.setRequestHeader('Authorization', 'Basic ' + btoa('STC_BRM:STC_BRM00'));
            },
            /** End of authentication code */
            url: URL,
             // data: JSON.stringify(input),
            accept:"application/json",
            contentType: "application/json",
            dataType: 'json',
            success: function (resp) {
            var sysThreads = resp.ServerThreads.System;
		    var srvThreads = resp.ServerThreads.Service;
			
			 var INTERVAL_1MIN = 1000 * 60;
			 var INTERVAL_5MIN = INTERVAL_1MIN * 5;
			 var INTERVAL_1HOUR = INTERVAL_1MIN * 60;
			 var INTERVAL_4HOUR = INTERVAL_1HOUR * 4;
			 var INTERVAL_24HOUR = INTERVAL_1HOUR * 24;
	 
             var myJsonObj = {
            
               "chart": {
				   "caption": "System Threads and Users sessions Graph",
                   //"subCaption": "In Percentage",
                   "showvalues": "0",
                   "pyaxisname":"System Threads",
                   "syaxisname":"Service Threads",
                   "reverseLegend":"1",
                   "interactiveLegend":"1",
                   "bgAlpha": "0",
                   "showBorder": "0",
                   "labelDisplay": "STAGGER",
                   "useEllipsesWhenOverflow": "0",
                   "decimals": "3",
                   "setadaptiveymin": "1",
                   "setadaptivesymin": "1",
                   "linethickness": "2"
               },
               "categories": [
                   {
                       "category": []
                   }
                ],
               "dataset": [   
                   {
                       "parentyaxis": "S",
                       "seriesname": "Service Threads",
                       "renderas": "Line",
                       "data": []
                   },
                   {
                      "parentyaxis": "P",
                      "seriesname": "System Threads",
                      "renderas": "Line",
                      "data": []
                   }
                   
                ]
            
              };
     
            var dataExists = false;

		 
			var getCategoryFormatString = function(sysThreads) {
		      if(sysThreads.length < 2) {
		         return "MMM DD, YYYY hh:mm:ss a";
		      }
		      var interval = sysThreads[1].readingTime - sysThreads[0].readingTime;
		      var formatString = ":mm";
		      
		      if(interval < INTERVAL_1MIN) {
		         formatString = ":mm";
		      }
		      else if(interval < INTERVAL_5MIN) {
		         formatString = ":mm";
		      }
		      else if(interval < INTERVAL_1HOUR) {
		         formatString = ":mm";
		      }
		      else if(interval < INTERVAL_4HOUR) {
		         formatString = "hha";
		      }
		      else if(interval < INTERVAL_24HOUR) {
		         formatString = "hha";
		      } else {
		         formatString = "M/D";
		      }
		      return formatString;
		   };
         
          if (sysThreads === undefined) {
           console.log('There were no system threads to add.' + sysThreads);
           }
          else {
            if (sysThreads.length === undefined) {
               sysThreads = new Array(sysThreads);
            } 
            if (srvThreads === undefined) {
               srvThreads = new Array();
            }
            else if (srvThreads.length === undefined) {
                  srvThreads = new Array(srvThreads);
            }
        

			var cycleTimeMin = 0;
			var cycleTimeMax = 0;

			dataExists = true;
			var categoryFormatString = getCategoryFormatString(sysThreads);
		    var categoryFormatString = getCategoryFormatString(srvThreads);
            
            jQuery.each(sysThreads, function(i, input) {
               
               var intervalMoment = moment(Number(input.readingTime));
               var formattedString = intervalMoment.format(categoryFormatString);
               var toolTextString = intervalMoment.format("MMM DD, YYYY<br/>hh:mm:ss a");
               
               myJsonObj.categories[0].category[i] = {
                  "name": formattedString,
                  "toolText": toolTextString
               };
               
               var cycleReadingExists = false;
               if (srvThreads && srvThreads.length && srvThreads.length > 0) {
                  jQuery.each(srvThreads, function(j, cycleTime) {
                     if (cycleTime && cycleTime.readingTime == input.readingTime) {
                        cycleReadingExists = true;
                        myJsonObj.dataset[0].data[i] = {
                              "value": cycleTime.reading,
                              "toolText": new Number(cycleTime.reading).toFixed(0) + " Service Threads<br/>" + moment(Number(cycleTime.readingTime)).format("MMM DD, YYYY<br/>hh:mm:ss a")
                        };

                     }
                  });
               }
               if (!cycleReadingExists) {
                  myJsonObj.dataset[0].data[i] = {
                        "value": 0,
                        "toolText": "no reading<br/>" + moment(Number(input.readingTime)).format("MMM DD, YYYY<br/>hh:mm:ss a")
                  };
                  if (0 < cycleTimeMin) {
                     cycleTimeMin = 0; 
                  }
               }
               
               myJsonObj.dataset[1].data[i] = {
                     "value": input.reading,
                     "toolText": new Number(input.reading).toFixed(0) + " Sys Threads<br/>" + moment(Number(input.readingTime)).format("MMM DD, YYYY<br/>hh:mm:ss a")
               };

            });
            
         }
      
		     var myMSCombiDY2D = getChartFromId('processInstanceMetricsChartId');

		      if (dataExists) {
		         jQuery(interfaceInstanceMetricsChartContainer).show();
		         jQuery(interfaceInstanceMetricsNoData).hide();
				 var myMSCombiDY2D;
		         if (!myMSCombiDY2D) {
		            myMSCombiDY2D = new FusionCharts("MSCombiDY2D", "processInstanceMetricsChartId", "1000px", "300px");
		            myMSCombiDY2D.setJSONData(myJsonObj);
		            myMSCombiDY2D.render("interfaceInstanceMetricsChartContainer");
		          } else {
		            var chart = FusionCharts("processInstanceMetricsChartId");
		            chart.setJSONData(myJsonObj);
		          }
		      } else {
		         jQuery(interfaceInstanceMetricsChartContainer).hide();
		         jQuery(interfaceInstanceMetricsNoData).show();
		      }
            
        },
            error: function (request, status, error) {
                   var errorDump = request.responseText;
                   var errorText = errorDump.substring(0,300);
                   
                            swal(
                           'Failure!',
                            errorText,
                           'error'
                            )
                        }
            });     
	},
    // Retrive previous reports and display
	listReports: function(URL){
		$.ajax({
                   type: "GET",
			 
			       /** For authentitication to the server */
					crossDomain: true,
						xhrFields: {
						  withCredentials: true
						},
					beforeSend: function (xhr) {
						 //xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Server.username:Server.password)); //Get username and password from ServerProperties.js file
						 xhr.setRequestHeader('Authorization', 'Basic ' + btoa('STC_BRM:STC_BRM00'));
					   },
                   /** End of authentication code */
                   url: URL,
                   accept:"application/json",
                   contentType: "application/json",
                   dataType: 'json',
                   success: function (result) {
                   //var fileList=result.Files;
					   var fileList = result.Files;
					   $.each(fileList,function(i,obj)
						{
							//alert(obj.name+":"+obj.name);
							var div_data="<option value="+obj.name+">"+obj.display+"</option>";
							//alert(div_data);
							$(div_data).appendTo('#dropdown'); 
						}); 
					
				
                },
                        error: function (request, status, error) {
                            var errorDump = request.responseText;
                            var errorText = errorDump;
                   
                            swal(
                           'Failure!',
                            errorText,
                           'error'
                            )
                        }
            }); 
	},

	//Update IS schedulers which pull stats data and send to UM

	configTask: function(input, URL){

        $.ajax({
               type: "POST",
            /** For authentitication to the server */
               crossDomain: true,
               xhrFields: {
                  withCredentials: true
               },
               beforeSend: function (xhr) {
                 //xhr.setRequestHeader('Authorization', 'Basic ' + btoa(Server.username:Server.password)); //Get credentials from ServerProperties.js file
                   xhr.setRequestHeader('Authorization', 'Basic ' + btoa('STC_BRM:STC_BRM00'));
              },
            /** End of authentication code */
               url: URL,
               data: JSON.stringify(input),
               accept:"application/json",
               contentType: "application/json",
               dataType: 'json',
               success: function (resp) {
						var str = resp.status.result;
				        var msg = resp.status.message;
						var status = str.toLowerCase();
                        if(status=='success'){
							swal(
							  'Success',
							  'Successfully updated !!',
							  'success',
							)
						} else {
							
							swal(
							  'Service Error',
							   msg,
							  'error'
							)
							
						}
						

                },
                 error: function (request, status, error) {
                       var errorDump = request.responseText;
                       var errorIndex = errorDump.indexOf('$errorInfo');
                       var errorText = errorDump.substr(errorIndex,300);;
                        swal(
                       'Service Error',
                        errorText,
                       'error'
                        )
                        }
                    }); 
	}
}