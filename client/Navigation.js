isc.defineClass("Navigation", "Menu").addProperties({
	initWidget: function(initData){
		this.miscMenu = isc.myMenu.create({
			title: "Task Entry",
			items: [
				{title: "Categories", click: "isc.Categories.create()"},
				{title: "Lists", click: "isc.Lists.create()"},
				{title: "Projects", click: "isc.Projects.create()"},
				{title: "Quotes", click: "isc.Quotes.create()"},
				{title: "Statuses", click: "isc.Statuses.create()"},
				{title: "Users", click: "isc.Users.create()"}
			]
		});
		this.reportMenu = isc.myMenu.create({
			title: "Task Entry",
			items: [
				{title: "Reports", click: "isc.Reports.create();"},
				{title: "Open Tasks", click: "isc.htmlViewer.create({width: 800, height: 350, title: \"Open Tasks\", paneURL: \"http://untrust3d.com/work/shell/app/reports/Tasks.php?u=\" + isc.userData.userID})"},
				{title: "Status", click: "isc.htmlViewer.create({width: 1000, height: 600, top: 0, left: 150, title: \"Status Report\", paneURL: \"http://untrust3d.com/work/shell/app/reports/Status.php?u=\" + isc.userData.userID + \"&s=2018-04-16&e=2018-04-20\"})"}
			]
		});
		this.mainMenu = isc.myMenu.create({
			title: "...",
			showShadow: true,
			items: [
				{title: "Log Work", click: "isc.Work.create({width: 500, height: 600, top: 25, left: 5})"},
				{title: "Task History", click: "isc.Tasks.create({width: 800, height: 600,  top: 5, left: 200, currUserID: isc.userData.userID})"},
				{isSeparator: true},
				{title: "Agile Cards", click: "isc.Cards.create({width: 800, height: 350, top: 1, left: 360})"},
				{title: "To Do Items", click: "isc.Items.create({width: 800, height: 350, top: 1, left: 360})"},
				{title: "Brew Log", click: "isc.BrewLog.create({width: \"95%\", height: \"50%\"})"},
				{isSeparator: true},
				{title: "Reports", submenu: this.reportMenu},
				{title: "Misc Tables", submenu: this.miscMenu}
			]
		});
		this.menuBar = isc.MenuBar.create({
			menus: [this.mainMenu]
		});
	}
});
