isc.defineClass("Categories", "myWindow").addProperties({
	title: "Categories",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.CategoriesLG = isc.myListGrid2.create({
			parent: this,
			name: "Categories",
			dataSource: isc.Shared.categoriesDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.CategoriesLG
		});
		this.addItem(isc.myVLayout.create({members: [this.CategoriesLG]}));
	}
});
