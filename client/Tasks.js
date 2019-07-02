isc.defineClass("Tasks", "myWindow").addProperties({
	title: "Work History",
	currUserID: 0,
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.TasksDS = isc.myDataSource.create({
			dataURL: serverPath + "Tasks.php",
			parent: this,
			fields:[
				{name: "taskID",
					canEdit: false,
					detail: true,
					primaryKey: true,
					type: "sequence"
				},
				{name: "taskDate",
					editorType: "DateItem",
					title: "Date",
					validators: [{type: "isDate"}],
					width: 120
				},
				{name: "userID",
					defaultValue: isc.userData.userID,
					displayField: "userName",
					fetchMissingValues: true,
					includeInRecordSummary: false,
					optionCriteria: {active: "Y"},
					optionDataSource: isc.Shared.usersDS,
					required: true,
					title: "User",
					type: "text",
					valueField: "userID",
					width: 100
				},
				{name: "duration",
					type: "float",
					required: true,
					title: "Time",
					width: 50
				},
				{name: "taskCategoryID",
					type: "integer",
					showGridSummary: false,
					optionDataSource: isc.Shared.categoriesDS,
					optionCriteria: {active: "Y"},
					displayField: "categoryName",
					valueField: "categoryID",
					fetchMissingValues: true,
					required: true,
					title: "Category",
					width: 100
				},
				{name: "projectID",
					displayField: "projectName",
					fetchMissingValues: true,
					// optionCriteria: {active: "Y"},
					optionDataSource: isc.Shared.projectsDS,
					pickListFields: [{name: "projectCode", width: 75},{name: "projectName", width: "*"}],
					pickListProperties: {showFilterEditor: true},
					pickListWidth: 250,
					required: true,
					showGridSummary: false,
					title: "Project",
					type: "integer",
					valueField: "projectID",
					width: 120
				},
				{name: "ticketCode",
					title: "Project Ticket",
					type: "text",
					width: 70,
					canEdit: false,
					formatCellValue: function (value) {
						var formatted;
						if (value) {
							formatted = "<a href='http://jira.prod.icd/browse/" + value + "' target='_blank'>" + value + "</a>";
						}
						return formatted;
					}
				},
				{name: "ticketKey",
					title: "Ticket",
					type: "text",
					width: 80,
					formatCellValue: function (value) {
						var formatted;
						if (value) {
							formatted = "<a href='http://jira.prod.icd/browse/" + value + "' target='_blank'>" + value + "</a>";
						}
						return formatted;
					}
				},
				{name: "description",
					type: "text",
					width: "*"
				},
				{name: "lastChangeDate",
					canEdit: false,
					detail: true
				}
			]
		});
		this.TasksLG = isc.myListGrid2.create({
			parent: this,
			name: "Work History",
			dataSource: this.TasksDS,
			showGridSummary: true,
			rowDoubleClick: function(record, recordNum, fieldNum, keyboardGenerated) {
				this.startEditing(recordNum);
			},
			startEditingNew: function(newValues, suppressFocus){
				var today = new Date();
				var rowDefaults = {duration: .25, taskDate: today, userID: this.currUserID};
				var newCriteria = isc.addProperties({}, newValues, rowDefaults);
				return this.Super("startEditingNew", [newCriteria, suppressFocus]);
			},
			rowEditorEnter: function(record, editValues, rowNum){
				this.focusInFilterEditor("taskCategoryID");
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.TasksLG
		});
		this.addItem(isc.myVLayout.create({members: [this.TasksLG]}));
		this.TasksDS.filterData({userID: this.currUserID});
	}
});
