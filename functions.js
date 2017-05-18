var ipcRenderer = require('electron').ipcRenderer;

function setAvailableTanks() {
	if (makeEntityType == "shape") {
		//document.getElementById("tip").innerHTML = 'Note: Bullets and traps have their size in pixels, rather than level.'
		document.getElementById("text1").innerHTML = "Size (pixels):"
		document.getElementById("text4").innerHTML = "Shape:"
		document.getElementById("classInput").innerHTML = document.getElementById("shapes").innerHTML
	} else {
		//document.getElementById("tip").innerHTML = ""
		document.getElementById("text1").innerHTML = "Level:"
		document.getElementById("text4").innerHTML = "Class:"
		document.getElementById("classInput").innerHTML = document.getElementById("tanks").innerHTML
	}
}

function setHeaderVisibility(){
	if (head){
		head = false
		canvas.style.top = "0px"
		offset = 0
		document.getElementById("canvas2").style.visibility = "hidden"
		document.getElementById("tip").style.visibility = "hidden"
		document.getElementById("levelInput").style.visibility = "hidden"
		document.getElementById("colorInput").style.visibility = "hidden"
		document.getElementById("colors").style.visibility = "hidden"
		document.getElementById("nameInput").style.visibility = "hidden"
		document.getElementById("classInput").style.visibility = "hidden"
		document.getElementById("btypeInput").style.visibility = "hidden"
		document.getElementById("etInput").style.visibility = "hidden"
		document.getElementById("barrelsInput").style.visibility = "hidden"
		document.getElementById("exportButton").style.visibility = "hidden"
		document.getElementById("importButton").style.visibility = "hidden"
		document.getElementById("clearButton").style.visibility = "hidden"
		document.getElementById("scenecodeText").style.visibility = "hidden"
		document.getElementById("sceneXW").style.visibility = "hidden"
		document.getElementById("sceneYW").style.visibility = "hidden"
		document.getElementById("applyButton").style.visibility = "hidden"
		document.getElementById("resetButton").style.visibility = "hidden"

		document.getElementById("desktop").style.visibility = "hidden"
		
		document.getElementById("text1").style.visibility = "hidden"
		document.getElementById("text2").style.visibility = "hidden"
		document.getElementById("text3").style.visibility = "hidden"
		document.getElementById("text4").style.visibility = "hidden"
		document.getElementById("text5").style.visibility = "hidden"
		document.getElementById("text6").style.visibility = "hidden"
		document.getElementById("text7").style.visibility = "hidden"
		document.getElementById("text8").style.visibility = "hidden"
		document.getElementById("text9").style.visibility = "hidden"
		document.getElementById("text10").style.visibility = "hidden"
		document.getElementById("gridlabel1").style.visibility = "hidden"
		document.getElementById("hideButton").style.visibility = "hidden"
		document.getElementById("showButton").style.visibility = "visible"
		document.getElementById("canvas3").style.visibility = "hidden"
		document.getElementById("togglePrev").style.visibility = "hidden"
		document.getElementById("sliderBG").style.visibility = "hidden"
		document.getElementById("on").style.visibility = "hidden"
		document.getElementById("off").style.visibility = "hidden"
		document.getElementById("zoom").style.visibility = "hidden"
		document.getElementById("zoomText").style.visibility = "hidden"
		document.getElementById("zoomOut").style.visibility = "hidden"
		document.getElementById("mousePos").style.visibility = "hidden"

		document.getElementById("help").style.visibility = "hidden"
		document.getElementById("ftbCode").style.visibility = "hidden"
		document.getElementById("convertText").style.visibility = "hidden"
		document.getElementById("toggleHelp").style.visibility = "hidden"
		document.getElementById("convert").style.visibility = "hidden"
	} else {
		head = true
		canvas.style.top = "200px"
		offset = 200
		document.getElementById("canvas2").style.visibility = "visible"
		document.getElementById("tip").style.visibility = "visible"
		document.getElementById("levelInput").style.visibility = "visible"
		document.getElementById("colorInput").style.visibility = "visible"
		document.getElementById("colors").style.visibility = "visible"
		document.getElementById("nameInput").style.visibility = "visible"
		document.getElementById("classInput").style.visibility = "visible"
		document.getElementById("btypeInput").style.visibility = "visible"
		document.getElementById("etInput").style.visibility = "visible"
		document.getElementById("barrelsInput").style.visibility = "visible"
		document.getElementById("exportButton").style.visibility = "visible"
		document.getElementById("importButton").style.visibility = "visible"
		document.getElementById("clearButton").style.visibility = "visible"
		document.getElementById("scenecodeText").style.visibility = "visible"
		document.getElementById("sceneXW").style.visibility = "visible"
		document.getElementById("sceneYW").style.visibility = "visible"
		document.getElementById("applyButton").style.visibility = "visible"
		document.getElementById("resetButton").style.visibility = "visible"
		
		document.getElementById("desktop").style.visibility = "visible"

		document.getElementById("text1").style.visibility = "visible"
		document.getElementById("text2").style.visibility = "visible"
		document.getElementById("text3").style.visibility = "visible"
		document.getElementById("text4").style.visibility = "visible"
		document.getElementById("text5").style.visibility = "visible"
		document.getElementById("text6").style.visibility = "visible"
		document.getElementById("text7").style.visibility = "visible"
		document.getElementById("text8").style.visibility = "visible"
		document.getElementById("text9").style.visibility = "visible"
		document.getElementById("text10").style.visibility = "visible"
		document.getElementById("gridlabel1").style.visibility = "visible"
		document.getElementById("canvas3").style.visibility = "visible"
		document.getElementById("hideButton").style.visibility = "visible"
		document.getElementById("showButton").style.visibility = "hidden"
		document.getElementById("togglePrev").style.visibility = "visible"
		document.getElementById("sliderBG").style.visibility = "visible"
		document.getElementById("on").style.visibility = "visible"
		document.getElementById("off").style.visibility = "visible"
		document.getElementById("zoom").style.visibility = "visible"
		document.getElementById("zoomText").style.visibility = "visible"
		document.getElementById("zoomOut").style.visibility = "visible"
		document.getElementById("mousePos").style.visibility = "visible"

		document.getElementById("help").style.visibility = "visible"
		document.getElementById("ftbCode").style.visibility = "visible"
		document.getElementById("convertText").style.visibility = "visible"
		document.getElementById("toggleHelp").style.visibility = "visible"
		document.getElementById("convert").style.visibility = "visible"
	};
};

function convertFTB(FTBi) {
	Out = new Array(FTBi.length)

	//Loop through all barrels.
	for (var i=0;i<FTBi.length;i++) {
		FTB = FTBi[i]
		//Convert Types
		if (FTB["type"] == 0) {
			FTB["type"] = 0
		} else if (FTB["type"] == 1) {
			FTB["type"] = 2
		} else if (FTB["type"] == 2) {
			FTB["type"] = 1
		} else if (FTB["type"] == 3) {
			FTB["type"] = 1
		}
		//Resize Barrels
		FTB["length"] = FTB["length"] * 0.6923076923076923
		FTB["width"] = FTB["width"] * 0.76

		Out[i] = {"barrelType":FTB["type"],"length":FTB["length"],"width":FTB["width"],"angle":FTB["angle"],"offsetX":FTB["xoffset"],"damage":"1","penetration":"1"}
	}
	return Out
}

// START MESSAGES FOR ELECTRON COMMANDS
ipcRenderer.on('setHeaderVisibility', setHeaderVisibility);
ipcRenderer.on('decreaseLevel', function() {
	if (!(document.getElementById('levelInput').value <= 1)) {
		document.getElementById('levelInput').value--
	}
});
ipcRenderer.on('increaseLevel', function() {
	document.getElementById('levelInput').value++
});
