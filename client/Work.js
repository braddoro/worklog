isc.defineClass("Work", "myWindow").addProperties({
	title: "Work",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.WorkDS = isc.myDataSource.create({
			dataURL: serverPath + "Work.php",
			fields:[
				{name: "taskDate",
					title: "Date",
					editorType: "DateItem",
					validators: [{type: "isDate"}],
					width: 120,
					changed: function(form, item, value){
						form.parent.TasksLG.fetchData();
					}
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
				{name: "taskCategoryID",
					type: "integer",
					showGridSummary: false,
					optionDataSource: isc.Shared.categoriesDS,
					optionCriteria: {active: "Y"},
					displayField: "categoryName",
					valueField: "categoryID",
					fetchMissingValues: true,
					title: "Category ID",
					required: true,
					width: 120
				},
				{name: "projectID",
					type: "integer",
					optionDataSource: isc.Shared.projectsDS,
					optionCriteria: {active: "Y"},
					displayField: "projectName",
					valueField: "projectID",
					fetchMissingValues: true,
					required: true,
					pickListWidth: 250,
					pickListProperties: {showFilterEditor: true},
					pickListFields: [{name: "projectCode", width: 75}, {name: "projectName", width: "*"}],
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
				{name: "taskID", detail: true},
				{name: "duration", type: "float", title: "Time", width: 50},
				{name: "taskCategoryID",
					title: "Category",
					optionDataSource: isc.Shared.categoriesDS,
					optionCriteria: {active: "Y"},
					displayField: "categoryName",
					valueField: "categoryID",
					fetchMissingValues: true,
					width: 60
				},
				{name: "projectID",
					type: "integer",
					optionDataSource: isc.Shared.projectsDS,
					optionCriteria: {active: "Y"},
					displayField: "projectName",
					valueField: "projectID",
					fetchMissingValues: true,
					required: true,
					showGridSummary: false,
					pickListWidth: 200,
					pickListProperties: {
						showFilterEditor: true
					},
					pickListFields: [
						{name: "projectCode", width: 75},
						{name: "projectName", width: "*"}
					],
					width: "*"
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
				{name: "description", type: "text", width: 100, detail: true}
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
			name: "Work",
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
