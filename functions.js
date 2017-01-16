function setAvailableTanks() {
	if (makeEntityType == "shape") {
		document.getElementById("tip").innerHTML = 'Note: Bullets and traps have their size in pixels, rather than level.'
		document.getElementById("text1").innerHTML = "Size:"
		document.getElementById("text4").innerHTML = "Shape:"
		document.getElementById("classInput").innerHTML = '</optgroup><optgroup label="Shapes"><option value="square">Square</option><option value="triangleS">Triangle</option><option value="pentagon">Pentagon</option></optgroup><optgroup label="Ammunition"><option value="drone">Drone</option><option value="square">Necro Drone</option><option value="bullet">Bullet</option><option value="trap">Trap</option>'
	} else {
		document.getElementById("tip").innerHTML = ""
		document.getElementById("text1").innerHTML = "Level:"
		document.getElementById("text4").innerHTML = "Class:"
		document.getElementById("classInput").innerHTML = '</optgroup><optgroup label="Tanks"><option value="basic">Basic Tank</option></optgroup><optgroup label="Twin Tree"><option value="twin">Twin</option><option value="triple">Triple Shot</option><option value="spread">Spreadshot</option><option value="triplet">Triplet</option><option value="penta">Pentashot</option><option value="twinflank">Twin Flank</option><option value="tripletwin">Triple Twin</option></optgroup><optgroup label="Machine Gun Tree"><option value="machine">Machine Gun</option><option value="sprayer">Sprayer</option><option value="destroyer">Destroyer</option><option value="hybrid">Hybrid</option><option value="annihilator">Annihilator</option><option value="gunner">Gunner</option></optgroup><optgroup label="Flank Guard Tree"><option value="flank">Flank Guard</option><option value="triangle">Tri-angle</option><option value="booster">Booster</option><option value="fighter">Fighter</option></optgroup><optgroup label="Sniper Tree"><option value="sniper">Sniper</option><option value="assassin">Assassin</option><option value="hunter">Hunter</option><option value="predator">Predator</option><option value="trapper">Trapper</option><option value="tritrapper">Tri-Trapper</option><option value="autotrapper">Auto Trapper</option><option value="megatrapper">Mega Trapper</option><option value="overlord">Overlord</option><option value="manager">Manager</option><option value="necro">Necromancer</option><option value="factory">Factory</option></optgroup><optgroup label="Smasher Tree"><option value="smasher">Smasher</option><option value="spike">Spike</option><option value="landmine">Landmine</option><option value="autosmasher">Auto Smasher</option></optgroup><optgroup label="Multiple Tree Tanks"><option value="autogunner">Auto Gunner</option><option value="overtrapper">Overtrapper</option><option value="gunnertrapper">Gunner Trapper</option><option value="quad">Quad Tank</option><option value="octo">Octo Tank</option><option value="streamliner">Streamliner</option></optgroup><optgroup label="Auto Tanks"><option value="autogunner">Auto Gunner</option><option value="autosmasher">Auto Smasher</option><option value="autotrapper">Auto Trapper</option><option value="auto3">Auto 3 (Not Available)</option><option value="auto5">Auto 5 (Not Available)</option></optgroup><optgroup label="Other Tanks"><option value="ac">Arena Closer</option><option value="dom">Dominator</option><option value="ms">Mothership</option><option value="minion">Factory Drone</option></optgroup><optgroup label="Bosses"><option value="guardian">Guardian</option><option value="summoner">Summoner</option><option value="overlord">Fallen Overlord</option><option value="booster">Fallen Booster</option><option value="defender">Defender</option></optgroup><optgroup label="Other"><option value="turret">Auto Turret</option><option value="custom">Custom</option>'
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
