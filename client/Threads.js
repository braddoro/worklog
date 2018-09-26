isc.defineClass("Threads", "myWindow").addProperties({
	title: "Threads",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.ThreadsDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "Threads.php",
			fields:[
				{name: "threadID", primaryKey: true, type: "sequence", canEdit: false, detail: true},
				{name: "parentID", type: "integer"},
				{name: "threadName", type: "text", width: "*"},
				{name: "lastChangeDate", canEdit: false, detail: true}
			]
		});
		this.ThreadsLG = isc.myListGrid2.create({
			parent: this,
			name: "Threads",
			dataSource: this.ThreadsDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.ThreadsLG
		});
		this.addItem(isc.myVLayout.create({members: [this.ThreadsLG]}));
	}
});
