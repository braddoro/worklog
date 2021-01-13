isc.defineClass("Items", "myWindow").addProperties({
	title: "Items",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.ItemsDS = isc.myDataSource.create({
			dataURL: serverPath + "Item_ado.php",
			fields:[
				{name: "itemID", primaryKey: true, type: "sequence", detail: true, canEdit: false},
				{name: "userID",
					type: "integer",
					optionDataSource: isc.Shared.usersDS,
					optionCriteria: {active: "Y"},
					displayField: "userName",
					valueField: "userID",
					fetchMissingValues: true,
					required: true,
					width: 100,
					defaultValue: isc.userData.userID,
					detail: true
				},
				{name: "rank", type: "integer", width: 80, editorType: "spinner", defaultValue: 0},
				{name: "projectID",
					displayField: "projectName",
					fetchMissingValues: true,
					optionCriteria: {active: "Y"},
					optionDataSource: isc.Shared.projectsDS,
					pickListFields: [
						{name: "projectCode", title: "Code", width: 75},
						{name: "projectName", width: "*"},
						{name: "active", width: "50"}
						],
					pickListProperties: {showFilterEditor: true},
					pickListWidth: 250,
					required: true,
					type: "integer",
					valueField: "projectID",
					width: 150
				},
				{name: "statusID", type: "integer", optionDataSource: isc.Shared.statusDS, displayField: "status", valueField: "statusID", fetchMissingValues: true, required: true, width: 120},
				{name: "ticketKey",
					title: "Ticket",
					width: 70,
					type: "text",
					formatCellValue: function (value) {
						var formatted;
						if (value) {
							formatted = "<a href='http://jira.prod.icd/browse/" + value + "' target='_blank'>" + value + "</a>";
						}
						return formatted;
					}
				},
				{name: "itemDate", editorType: "DateItem", inputFormat: "toUSShortDate", displayFormat: "toSerializeableDate", useTextField: true, width: 100},
				{name: "item", type: "text", width: "*"},
				{name: "lastChangeDate", canEdit: false, detail: true}
			]
		});
		this.ItemsLG = isc.myListGrid2.create({
			parent: this,
			name: "Items",
			dataSource: this.ItemsDS,
			showRowNumbers: true,
			initialSort: [{property: "rank", direction: "ascending"},{property: "ticketKey", direction: "ascending"}],
			rowContextClick: function(record, rowNum, colNum){
				this.parent.localContextMenu.showContextMenu();
				var now = new Date();
				return false;
			},
			rowDoubleClick: function(record, recordNum, fieldNum, keyboardGenerated) {
				this.startEditing(recordNum);
			},
			startEditingNew: function(newValues, suppressFocus){
				var now = new Date();
				var today = now.toSerializeableDate();
				var moreCriteria = isc.addProperties({}, newValues, {itemDate: today});
				return this.Super("startEditingNew", [moreCriteria, suppressFocus]);
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.ItemsLG
		});
		this.ItemsVL = isc.myVLayout.create({members: [this.ItemsLG]});
		this.addItem(this.ItemsVL);
	}
});
