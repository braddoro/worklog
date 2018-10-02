isc.defineClass("Lists", "myWindow").addProperties({
	title: "Lists",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.ListsLG = isc.myListGrid2.create({
			parent: this,
			name: "Lists",
			dataSource: isc.Shared.listDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.ListsLG
		});
		this.addItem(isc.myVLayout.create({members: [this.ListsLG]}));
	}
});
