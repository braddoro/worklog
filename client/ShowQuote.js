isc.defineClass("ShowQuote", "myWindow").addProperties({
	autoCenter: true,
	showHeader: false,
	border: "0px solid black",
	dynamicContents: true,
	contents: "",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.GetQuotesDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "GetQuote.php",
			fields:[
				{name: "quoteID", primaryKey: true, type: "sequence", canEdit: false, detail: true},
				{name: "quote", type: "text", width: "*"},
				{name: "attribution", type: "text", width: "25%"}
			]
		});
		this.GetQuotes2DS = isc.myDataSource.create({
			parent: this,
			dataFormat: "custom",
			dataURL: serverPath + "GetQuote2.php",
			transformResponse: function(dsResponse, dsRequest, data){
				this.parent.ShowQuoteLabel.setContents(data);
			}
		});
		this.ShowQuoteLabel = isc.Label.create({
			parent: this,
			autoDraw: false,
			height: "100%",
			width: "100%",
			margin: 10,
			align: "center",
			valign: "center",
			baseStyle: "font-family: monospace;font-size: 10px;",
			doubleClick: function(){
				this.parent.GetQuotes2DS.fetchData();
				return true;
			}
		});
		this.ShowQuoteVL = isc.myVLayout.create({members: [this.ShowQuoteLabel]});
		this.addItem(this.ShowQuoteVL);
		this.ShowQuoteLabel.contents = initData.text;
	}
});
