/*
 *
 *   Copyright (c) by Tanveer Iqbal

 *   Charts *__)()
 *
 *
 *
 */

          var g1 = new JustGage({
				id: "g1",
                //gaugeColor: "#404040",
                valueFontColor: "#bfbfbf",
				value: 0,
				min: 0,
				max: 250,
				pointer: true,
				title: "System Threads",
				levelColors: ["#00ff00", "#ff0000"]
			});

			var g2 = new JustGage({
				id: "g2",
                //gaugeColor: "#404040",
                valueFontColor: "#bfbfbf",
				value: 0,
				min: 0,
				max: 100,
				symbol: '%',
				title: "Used Memory",
				levelColors: ["#00ff00", "#ff0000"]
			});
			var g3 = new JustGage({
				id: "g3",
                //gaugeColor: "#404040",
                valueFontColor: "#bfbfbf",
				value: 0,
				min: 0,
				max: 100,
				title: "Service Instance",
				//label: "Service Instance"
			});
			
			var g4 = new JustGage({
				id: "g4",
				value: 0,
				min: 0,
				max: 50,
				donut: true,
				gaugeWidthScale: 0.6,
				counter: true,
				hideInnerShadow: true,
				title: "Users Sesssions"
        });

