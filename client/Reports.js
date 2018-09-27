Date.setInputFormat("YMD");
isc.defineClass("Reports", "myWindow").addProperties({
	title: "Reports",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.ReportsDF = isc.myDynamicForm.create({
			parent: this,
			fields: [
				{name: "START_DATE", title: "Start", type: "date", editorType: "date"},
				{name: "END_DATE", title: "End", type: "date",	editorType: "date"}
			]
		});
		this.ReportsBT = isc.myIButton.create({
			parent: this,
			title: "Submit",
			align: "center",
			click: function(){this.parent.submitData();}
		});
		this.addItem(isc.myVLayout.create({members: [this.ReportsDF, this.ReportsBT]}));
	},
	submitData: function(){
		var baseurl = "http://localhost/localweb/worklog/reports/Status.php";
		var fd = this.ReportsDF.getValues();

		var sd = fd["START_DATE"].getFullYear() + "-";
		var temp = (fd["START_DATE"].getMonth() + 1);
		if(temp < 10){
			temp = "0" + temp;
		}
		sd += temp + "-";

		temp = fd["START_DATE"].getDate()
		if(temp < 10){
			temp = "0" + temp;
		}
		sd += temp;

		var ed = fd["END_DATE"].getFullYear() + "-";
		var temp = (fd["END_DATE"].getMonth() + 1);
		if(temp < 10){
			temp = "0" + temp;
		}
		ed += temp + "-";

		temp = fd["END_DATE"].getDate()
		if(temp < 10){
			temp = "0" + temp;
		}
		ed += temp;

		var paneurl = baseurl + "?u=" + isc.userData.userID + "&s=" + sd + "&e=" + ed;
		console.log(baseurl);
		console.log(paneurl);
		isc.htmlViewer.create({width: 1000, height: 600, top: 0, left: 150, title: "Status Report", paneURL: paneurl});
	},
	submitData_callback: function(rpcResponse){
	}
});
