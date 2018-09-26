isc.defineClass("Users", "myWindow").addProperties({
	title: "Users",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.UsersLG = isc.myListGrid2.create({
			parent: this,
			name: "Users",
			dataSource: isc.Shared.usersDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.UsersLG
		});
		this.addItem(isc.myVLayout.create({members: [this.UsersLG]}));
	}
});
