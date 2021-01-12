isc.defineClass("Entry", "myWindow").addProperties({
	title: "Time Sheet Entry",
	currUserID: 0,
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.EntryDS = isc.myDataSource.create({
			allowAdvancedCriteria: false,
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
					dateDisplayFormat: "toJapanShortDate",
					title: "Date",
					// useTextField: true,
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
					required: true,
					title: "Time",
					type: "float",
					width: 50
				},
				{name: "taskCategoryID",
					displayField: "categoryName",
					fetchMissingValues: true,
					optionCriteria: {active: "Y"},
					optionDataSource: isc.Shared.categoriesDS,
					required: true,
					showGridSummary: false,
					title: "Category",
					type: "integer",
					valueField: "categoryID",
					width: 100
				},
				{name: "projectID",
					displayField: "projectName",
					fetchMissingValues: true,
					optionCriteria: {active: "Y"},
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
					canEdit: false,
					title: "Project Ticket",
					type: "text",
					width: 70,
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
		this.EntryLG = isc.myListGrid2.create({
			dataSource: this.EntryDS,
			name: "Time Sheet Entry",
			parent: this,
			showGridSummary: true,
			filterData: function(criteria, callback, requestProperties){
				this.invalidateCache();
				return this.Super("filterData", [criteria, callback, requestProperties]);
			},
			rowEditorEnter: function(record, editValues, rowNum){
				if(record.taskDate == ""){
					var today = new Date();
					var yyyy = today.getFullYear();
					var mm = today.getMonth();
					var dd = today.getDate();
					var today = '' + yyyy + '-' + mm + '-' + dd;
					record.taskDate = today;
				}
				return record;
			},
			startEditingNew: function(newValues, suppressFocus){
				var today = new Date();
				var yyyy = today.getFullYear();
				var mm = today.getMonth();
				var dd = today.getDate();
				var today = '' + yyyy + '-' + mm + '-' + dd;
				if(this.anySelected()){
					data = this.getSelectedRecord();
					today = data.taskDate;
				}
				var rowDefaults = {duration: 1, taskDate: today, userID: this.currUserID};
				var newCriteria = isc.addProperties({}, newValues, rowDefaults);
				return this.Super("startEditingNew", [newCriteria, suppressFocus]);
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.EntryLG
		});
		this.addItem(isc.myVLayout.create({members: [this.EntryLG]}));
		this.EntryDS.filterData({userID: this.currUserID});
	}
});
