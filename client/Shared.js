isc.Shared = {
	categoriesDS: isc.myDataSource.create({
		dataURL: serverPath + "Categories.php",
		fields:[
			{name: "categoryID", primaryKey: true, type: "sequence", detail: true, canEdit: false, width: 75},
			{name: "displayOrder", type: "integer", width: 100},
			{name: "categoryName", type: "text", width: "*"},
			{name: "group", type: "text", width: 120},
			{name: "active", type: "text", width: 100, editorType: "selectItem", defaultValue: "Y", valueMap: {"Y" : "Yes", "N" : "No"}, width: 80},
			{name: "lastChangeDate", width: 120, canEdit: false, detail: true}
		]
	}),
	listDS: isc.myDataSource.create({
		dataURL: serverPath + "Lists.php",
		fields:[
			{name: "listID", primaryKey: true, type: "sequence", detail: true, canEdit: false, width: 75},
			{name: "listName", type: "text", width: "*"},
			{name: "active", type: "text", width: 100, editorType: "selectItem", defaultValue: "Y", valueMap: {"Y" : "Yes", "N" : "No"}, width: 80},
			{name: "lastChangeDate", width: 120, canEdit: false, detail: true}
		]
	}),
	projectsDS: isc.myDataSource.create({
		dataURL: serverPath + "Projects.php",
		fields:[
			{name: "projectID", type: "sequence", primaryKey: true, detail: true, canEdit: false, width: 75},
			{name: "projectName", type: "text"},
			{name: "projectCode", type: "text"},
			{name: "ticketCode", type: "text", title: "Project Ticket"},
			{name: "active", type: "text", width: 100, editorType: "selectItem", defaultValue: "Y", valueMap: {"Y": "Yes", "N": "No"}, width: 80},
			{name: "lastChangeDate", width: 120, canEdit: false, detail: true}
		]
	}),
	statusDS: isc.myDataSource.create({
		dataURL: serverPath + "Statuses.php",
		fields:[
			{name: "statusID", primaryKey: true, type: "sequence", detail: true, canEdit: false, width: 75},
			{name: "status", type: "text", width: "*"},
			{name: "active", type: "text", width: 100, editorType: "selectItem", defaultValue: "Y", valueMap: {"Y" : "Yes", "N" : "No"}, width: 80},
			{name: "lastChangeDate", width: 120, canEdit: false, detail: true}
		]
	}),
	userDataDS: isc.myDataSource.create({
		clientOnly: true,
		fields:[
			{name: "active", type: "text"},
			{name: "firstName", type: "text"},
			{name: "lastChangeDate", type: "text"},
			{name: "lastName", type: "text"},
			{name: "login", type: "text"},
			{name: "password", type: "text"},
			{name: "userID", type: "sequence", primaryKey: true},
			{name: "userName", type: "text"}
		]
	}),
	usersDS: isc.myDataSource.create({
		dataURL: serverPath + "Users.php",
		fields:[
			{name: "userID", primaryKey: true, type: "sequence", detail: true, canEdit: false, width: 75},
			{name: "userName", type: "text", width: "*"},
			{name: "firstName", type: "text", width: 80},
			{name: "lastName", type: "text", width: 80},
			{name: "login", type: "text", width: 80},
			{name: "password", type: "text", width: 80},
			{name: "active", type: "text", width: 100, editorType: "selectItem", defaultValue: "Y", valueMap: {"Y" : "Yes", "N" : "No"}, width: 80},
			{name: "lastChangeDate", canEdit: false, detail: true}
		]
	})
};
