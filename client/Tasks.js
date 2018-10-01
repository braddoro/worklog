isc.defineClass("Tasks", "myWindow").addProperties({
	title: "Task List",
	currUserID: 0,
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.TasksDS = isc.myDataSource.create({
			dataURL: serverPath + "Tasks.php",
			parent: this,
			fields:[
				{name: "taskID",
					primaryKey: true,
					type: "sequence",
					canEdit: false,
					detail: true
				},
				{name: "taskDate",
					title: "Date",
					editorType: "DateItem",
					validators: [{type: "isDate"}],
					width: 120
				},
				{name: "userID",
					type: "text",
					optionDataSource: isc.Shared.usersDS,
					optionCriteria: {active: "Y"},
					displayField: "userName",
					valueField: "userID",
					fetchMissingValues: true,
					required: true,
					width: 150,
					includeInRecordSummary: false,
					defaultValue: isc.userData.userID
				},
				{name: "duration",
					type: "float",
					required: true,
					width: 75
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
					width: 120
				},
				{name: "projectID",
					type: "integer",
					optionDataSource: isc.Shared.projectsDS,
					// optionCriteria: {active: "Y"},
					displayField: "projectName",
					valueField: "projectID",
					fetchMissingValues: true,
					required: true,
					showGridSummary: false,
					pickListWidth: 250,
					pickListProperties: {
						showFilterEditor: true
					},
					pickListFields: [
						{name: "projectCode", width: 75},
						{name: "projectName", width: "*"}
					],
					width: 150
				},
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
			name: "Tasks",
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
