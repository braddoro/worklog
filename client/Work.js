isc.defineClass("Work", "myWindow").addProperties({
	title: "Daily Work",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.WorkDS = isc.myDataSource.create({
			dataURL: serverPath + "Work.php",
			fields:[
				{name: "taskID",
					canEdit: false,
					primaryKey: true,
					type: "sequence",
					visible: false
				},
				{name: "taskDate",
					editorType: "DateItem",
					title: "Date",
					validators: [{type: "isDate"}],
					width: 120,
					changed: function(form, item, value){form.parent.TasksLG.fetchData();}
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
					width: 150
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
					width: 120
				},
				{name: "projectID",
					displayField: "projectName",
					fetchMissingValues: true,
					optionCriteria: {active: "Y"},
					optionDataSource: isc.Shared.projectsDS,
					pickListFields: [{name: "projectCode", width: 75}, {name: "projectName", width: "*"}, {name: "active", width: "75"}],
					pickListProperties: {showFilterEditor: true},
					pickListWidth: 300,
					required: true,
					title: "Project",
					type: "integer",
					valueField: "projectID",
					width: 150
				},
				{name: "duration",  type: "float", required: true, width: 75, defaultValue: 1},
				{name: "ticketKey", type: "text", width: 100},
				{name: "description", type: "text", width: "*"},
				{name: "lastChangeDate", visible: false}
			]
		});
		this.TasksDS = isc.myDataSource.create({
			dataURL: serverPath + "Work.php",
			fields:[
				{name: "taskID",
					canEdit: false,
					detail: true,
					primaryKey: true,
					type: "sequence"
				},
				{name: "duration",
					title: "Time",
					type: "float",
					width: 50
				},
				{name: "taskCategoryID",
					displayField: "categoryName",
					fetchMissingValues: true,
					optionCriteria: {active: "Y"},
					optionDataSource: isc.Shared.categoriesDS,
					title: "Category",
					valueField: "categoryID",
					width: 80
				},
				{name: "projectID",
					displayField: "projectName",
					fetchMissingValues: true,
					optionCriteria: {active: "Y"},
					optionDataSource: isc.Shared.projectsDS,
					pickListFields: [{name: "projectCode", width: 75},{name: "projectName", width: "*"}],
					pickListProperties: {showFilterEditor: true},
					pickListWidth: 200,
					required: true,
					showGridSummary: false,
					title: "Project",
					type: "integer",
					valueField: "projectID",
					width: 160
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
					width: 70,
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
				}
			]
		});
		this.WorkDF = isc.myDynamicForm.create({
			parent: this,
			dataSource: this.WorkDS
		});
		this.WorkBT = isc.myIButton.create({
			parent: this,
			title: "Submit",
			align: "center",
			click: function(){this.parent.submitData();}
		});
		this.TasksLG = isc.myListGrid2.create({
			parent: this,
			name: "Daily Work",
			dataSource: this.TasksDS,
			showFilterEditor: false,
			showGridSummary: true,
			canSort: false,
			fetchData: function(criteria, callback, requestProperties){
				var today = this.parent.WorkDF.getValue("taskDate");
				var newValues = {userID: isc.userData.userID, taskDate: today};
				var newCriteria = isc.addProperties({}, criteria, newValues);
				return this.Super("fetchData", [newCriteria, callback, requestProperties]);
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.TasksLG
		});
		this.WorkVL = isc.myVLayout.create({members: [this.WorkDF, this.WorkBT, this.TasksLG]});
		this.addItem(this.WorkVL);
	},
	submitData: function(){
		var formData = this.WorkDF.getValues();
		this.WorkDS.addData(formData, {target: this, methodName: "submitData_callback"});
	},
	submitData_callback: function(rpcResponse){
		this.TasksLG.fetchData();
		this.TasksLG.refreshData();
		this.WorkDF.setValue("ticketKey","");
		this.WorkDF.setValue("description","");
		this.WorkDF.setValue("taskCategoryID","");
		this.WorkDF.setValue("projectID","");
		this.WorkDF.setValue("duration",1);
	}
});
