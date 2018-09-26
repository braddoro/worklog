// Read up on: ViewLoader
//
isc.defineClass("htmlViewer", "myWindow").addProperties({
	title: "HTML Viewer",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.viewerHF = isc.HTMLFlow.create({contentsType: "page", contentsURL: initData.paneURL});
		this.addItem(isc.myVLayout.create({members: [this.viewerHF]}));
	}
});
