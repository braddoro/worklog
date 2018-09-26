isc.defineClass("Quotes", "myWindow").addProperties({
	title: "Quotes",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.QuotesDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "Quotes.php",
			fields:[
				{name: "quoteID", primaryKey: true, type: "sequence", canEdit: false, detail: true},
				{name: "quote", type: "text", width: "*"},
				{name: "attribution", type: "text", width: "25%"},
				{name: "lastChangeDate", canEdit: false, detail: true}
			]
		});
		this.QuotesLG = isc.myListGrid2.create({
			parent: this,
			name: "Quotes",
			dataSource: this.QuotesDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.QuotesLG
		});
		this.addItem(isc.myVLayout.create({members: [this.QuotesLG]}));
	}
});
