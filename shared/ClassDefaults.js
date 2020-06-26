isc.RPCResponse.STATUS_ERROR_DATA_ACCESS = -110;
isc.RPCResponse.STATUS_SERVER_CONNECTION_ERROR = -111;
isc.RPCResponse.STATUS_SETUP_DATA_ERROR = -112;

isc.defineClass("myWindow", "Window").addProperties({
	showMaximizeButton: true,
	canDragReposition: true,
	keepInParentRect: true,
	dismissOnEscape: false,
	canDragResize: true,
	edgeMarginSize:10,
	showShadow: true,
	height: 300,
	width: 500,
	left: 25,
	top: 25,
	resized: function(){
		// console.log("height: " + this.height  + "\n" + "width: " + this.width  + "\n" + "left: " + this.left  + "\n" + "top: " + this.top + "\n");
	},
	moved: function(deltaX, deltaY){
		// console.log("height: " + this.height  + "\n" + "width: " + this.width  + "\n" + "left: " + this.left  + "\n" + "top: " + this.top + "\n");
	}
});
isc.defineClass("myVLayout", "VLayout").addProperties({
	height: "100%"
});

isc.defineClass("myDataSource", "DataSource").addProperties({
	autoFetchData: true,
	dataFormat: "json",
	dataProtocol: "postParams",
	showPrompt: true,
	transformRequest: function(dsRequest){
		var superClassArguments = this.Super("transformRequest", dsRequest);
		var newProperties = {operationType: dsRequest.operationType};
		return isc.addProperties({}, superClassArguments, newProperties);
	},
	transformResponse: function(dsResponse, dsRequest, data){
		var status = isc.RPCResponse.STATUS_SUCCESS;
		var title = "";
		var error = "";
		var newResponse;
		var message = "";

		if(dsResponse.status !== undefined && dsResponse.status !== isc.RPCResponse.STATUS_SUCCESS){
			status = dsResponse.status;
		}
		if(status === isc.RPCResponse.STATUS_SUCCESS &&
			data.status !== undefined &&
			data.status !== isc.RPCResponse.STATUS_SUCCESS){
			status = data.status;
		}

		title = errorTitle(status);

		if(dsResponse.errorMessage){
			error = dsResponse.errorMessage;
		}
		if(error == "" && data.errorMessage){
			error = error + data.errorMessage;
		}
		if(error == "" && dsResponse.httpResponseText){
			error = error + dsResponse.httpResponseText;
		}
		if(error == ""){
			error = title;
		}

		message = title + "<br/>Error Code: " + status + "<br/>" + error;

		if(status === isc.RPCResponse.STATUS_SUCCESS){
			newResponse = dsResponse;
			isc.addProperties({}, newResponse, {willHandleError: true});
		}else{
			isc.warn(message, null, {title: title});
			newResponse = {
				status: status,
				willHandleError: true,
				data: message
			};
		}
		return this.Super("transformResponse", [newResponse, dsRequest, data]);
	}
});

isc.defineClass("myListGrid2", "ListGrid").addProperties({
	alternateRecordStyles: true,
	autoFetchData: true,
	leaveScrollbarGap: false,
	modalEditing: true,
	showFilterEditor: true,
	dataArrived: function(){
		this.updateStatus();
	},
	doubleClick: function(){
		if(this.getTotalRows() === 0){
			this.startEditingNew();
		}
		return true;
	},
	rowContextClick: function(record, rowNum, colNum){
		if(this.parent.localContextMenu){
			this.parent.localContextMenu.showContextMenu();
		}
		return false;
	},
	rowDoubleClick: function(record, recordNum, fieldNum, keyboardGenerated) {
		this.startEditing(recordNum);
	},
	updateStatus: function() {
		this.parent.setTitle(this.name + " : Rows - " + this.getTotalRows());
		this.focus();
	}
});

isc.defineClass("myDynamicForm", "DynamicForm").addProperties({
	validateOnChange: true
});

isc.defineClass("myMenu", "Menu").addProperties({
	showIcons: false,
	shadowDepth: 10,
	cellHeight: 16,
	width: 24
});

isc.defineClass("myLabel", "Label").addProperties({
	align: "left",
	baseStyle: "headerItem"
});

isc.defineClass("myIButton", "IButton").addProperties({
	autoFit: true
});
