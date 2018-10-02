isc.defineClass("Cards", "myWindow").addProperties({
	title: "Cards",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.cardDS = isc.myDataSource.create({
			dataURL: serverPath + "Cards.php",
			fields:[
				{name: "cardID", primaryKey: true, type: "sequence", detail: true, canEdit: false, width: 75},
				{name: "projectID",
					displayField: "projectName",
					fetchMissingValues: true,
					optionCriteria: {active: "Y"},
					optionDataSource: isc.Shared.projectsDS,
					pickListFields: [{name: "projectCode", width: 75}, {name: "projectName", width: "*"}],
					pickListProperties: {showFilterEditor: true},
					pickListWidth: 250,
					required: true,
					title: "Project",
					type: "integer",
					valueField: "projectID",
					width: 150
				},
				{name: "listID",
					displayField: "listName",
					fetchMissingValues: true,
					optionCriteria: {active: "Y"},
					optionDataSource: isc.Shared.listDS,
					required: true,
					showGridSummary: false,
					title: "List",
					type: "integer",
					valueField: "listID",
					width: 120
				},
				{name: "cardWeight", type: "integer", width: 100},
				{name: "card", type: "text", width: "*"},
				{name: "lastChangeDate", width: 120, canEdit: false, detail: true}
			]
		});

		this.CardsLG = isc.myListGrid2.create({
			parent: this,
			name: "Cards",
			dataSource: this.cardDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.CardsLG
		});
		this.addItem(isc.myVLayout.create({members: [this.CardsLG]}));
	}
});
