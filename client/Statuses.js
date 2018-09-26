isc.defineClass("Statuses", "myWindow").addProperties({
	title: "Statuses",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.StatusLG = isc.myListGrid2.create({
			parent: this,
			name: "Status",
			dataSource: isc.Shared.statusDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.StatusLG
		});
		this.addItem(isc.myVLayout.create({members: [this.StatusLG]}));
	}
});
