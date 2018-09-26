isc.defineClass("Projects", "myWindow").addProperties({
	title: "Projects",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.ProjectsLG = isc.myListGrid2.create({
			parent: this,
			name: "Projects",
			dataSource: isc.Shared.projectsDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.ProjectsLG
		});
		this.addItem(isc.myVLayout.create({members: [this.ProjectsLG]}));
	}
});
