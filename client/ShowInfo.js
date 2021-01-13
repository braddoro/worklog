isc.defineClass("ShowInfo", "myWindow").addProperties({
	autoCenter: true,
	showHeader: false,
	border: "0px solid black",
	dynamicContents: true,
	contents: "The slider value is.",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.ShowInfoLabel = isc.Label.create({
			autoDraw: false,
			height: "100%",
			width: "100%",
			margin: 10,
			align: "center",
			valign: "center",
			baseStyle: "font-family: monospace;font-size: 10px;"
		});
		this.ShowInfoVL = isc.myVLayout.create({members: [this.ShowInfoLabel]});
		this.addItem(this.ShowInfoVL);
		this.ShowInfoLabel.contents = initData.text;
	}
});
