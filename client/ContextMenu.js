isc.defineClass("myContextMenu", "myMenu").addProperties({
	parent: this,
	callingListGrid: null,
	data: [
		{title: "Add",
			click: function(target, item, menu, colNum){
				menu.callingListGrid.startEditingNew();
			}
		},
		{title: "Edit",
			click: function(target, item, menu, colNum){
				var record = menu.callingListGrid.getSelectedRecord();
				var row = menu.callingListGrid.getRowNum(record);
				menu.callingListGrid.startEditing(row);
			}
		},
		{title: "Refresh",
			click: function(target, item, menu, colNum){
				menu.callingListGrid.invalidateCache();
			}
		},
		{title: "Delete",
			click: function(target, item, menu, colNum){
				var record;
				if(menu.callingListGrid.anySelected()){
					record = menu.callingListGrid.getSelectedRecord();
					menu.callingListGrid.removeData(record);
				}
			}
		},
		{title: "Copy Row",
			click: function(target, item, menu, colNum){
				var record;
				var text = "";
				if(menu.callingListGrid.anySelected()){
					record = menu.callingListGrid.getSelectedRecord();
					// for(var key in record) {
					// 	let value = record[key];
					// 	if (typeof value !== "undefined" && typeof key !== "undefined"){
					// 		text += key +  ": " + value + " - " + typeof(value) + "<br/>";
					// 	}
					// }
					isc.say(copyValues(record));
				}
			}
		},
		{title: "Preview",
			click: function(target, item, menu, colNum){
				var record = menu.callingListGrid.getSelectedRecord();
				isc.Preview.create({
					title: "Preview ",
					record: record,
					height: "90%",
					width: 800,
					left: 50,
					top: 50
				});
			}
		}
	]
});
