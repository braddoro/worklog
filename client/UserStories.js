isc.defineClass("UserStories", "myWindow").addProperties({
	title: "User Stories",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.UserStoriesDS = isc.myDataSource.create({
			dataURL: serverPath + "UserStories.php",
			fields:[
				{name: "userStoryID", primaryKey: true, type: "sequence", detail: true, canEdit: false},
				{name: "projectID",
					type: "integer",
					optionDataSource: isc.Shared.taskProjectsDS,
					optionCriteria: {active: "Y"},
					displayField: "projectName",
					valueField: "projectID",
					required: true,
					pickListWidth: 250,
					pickListProperties: {showFilterEditor: true},
					pickListFields: [{name: "projectCode", width: 75}, {name: "projectName", width: "*"}],
					width: 150
				},
				{name: "userID",
					type: "integer",
					optionDataSource: isc.Shared.taskUsersDS,
					optionCriteria: {active: "Y"},
					displayField: "userName",
					valueField: "userID",
					required: true,
					width: 100
				},
				{name: "statusID", width: 80, type: "integer", optionDataSource: isc.Shared.statusDS, displayField: "status", valueField: "statusID", required: true},
				{name: "sprintID", type: "integer", width: 80, editorType: "Spinner"},
				{name: "storyName", width: 150},
				{name: "role", width: 120, title: "As a"},
				{name: "something", width: "25%", title: "I want"},
				{name: "benefit", width: "25%", title: "So that"},
				{name: "lastChangeDate", width: 120, canEdit: false, detail: true}
			]
		});
		this.UserStoriesLG = isc.myListGrid2.create({
			parent: this,
			name: "Stories",
			dataSource: this.UserStoriesDS,
			rowContextClick: function(record, rowNum, colNum){
				this.parent.localContextMenu.showContextMenu();
				return false;
			},
			rowDoubleClick: function(record, recordNum, fieldNum, keyboardGenerated) {
				this.startEditing(recordNum);
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.UserStoriesLG
		});
		this.addItem(isc.myVLayout.create({members: [this.UserStoriesLG]}));
	}
});
