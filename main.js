var turret = false
var tmpTank = ""
var entity = [];
var head = true
var offset = 200
var ETC = ""
var ETP = ""
var trans = -22
var trans2 = 198
var prevOn = true
var sliderP = 700
var tankPrevPos = 25
var prevOffset = 0
var helpMult = 0
var help = false
var prevFullZoom = 100

function toggle(bool) {
	if (bool) {
		return false
	} else {
		return true
	}
}

function convert() {
	document.getElementById("barrelsInput").value = JSON.stringify(convertFTB(JSON.parse(document.getElementById("ftbCode").value)))
}

function setColorInput(color){
	colorInput.value = color;
};

function applySceneSize(){
	canvas.width = sceneXW.value
	canvas.height = sceneYW.value
};

function resetSceneSize(){
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
};

function clearscene(){
	entity = []
	console.log("cleared");
};

function exporttank(){
	sceneCodeText.value = exportJSON(entity);
	console.log("exported");
};

function importtank(){
	entity = importJSON(sceneCodeText.value);
	console.log("imported");
};

function exportJSON(json){
	return JSON.stringify(json);
};

function importJSON(json){
	return JSON.parse(json);
};


function degToRad(angle){
	return angle * Math.PI/180;
};


function levelToSize(level) {
return Math.pow(1.01055,level-1)*1.854*12;
};


function deleteEntity(x,y,r){
	for(i=0;i<entity.length;i++){
		var ent = entity[i];
		if (getDistance(x,y,ent.x,ent.y) <= r){
			entity.splice(i,1);
		};
	};
};


function getDistance(ax,ay,bx,by){
	return Math.sqrt(((bx-ax)*(bx-ax))+((by-ay)*(by-ay)));
};

function toggleHelp() {
	help = toggle(help)
}

function togglePrev() {
	prevOn = toggle(prevOn)
}

function step(){
	if (isLoaded){
		var headHeight = head ? document.getElementById('canvas2').height : 0;
		document.getElementById("mousePos").innerHTML = "X: " + mouseX + " Y: " + (mouseY - headHeight)

		if (head && prevOn && mouseX > 1065 && mouseX < 1215 && mouseY > 25 && mouseY < 175) {
			prevOffset = ((prevOffset-prevFullZoom)/1.35)+prevFullZoom
		} else {
			prevOffset = prevOffset/1.3
		}

		if (help) {
			helpMult = ((helpMult-1)/1.35)+1
		} else {
			helpMult = helpMult/1.3
		}

		document.getElementById("help").style.opacity = helpMult
		document.getElementById("help").style.visiblity = help;
		document.getElementById("help").style.fontSize = 12*helpMult
		document.getElementById("help").style.width = 300*helpMult
		document.getElementById("help").style.height = 400*helpMult

		document.getElementById("lights").style.opacity = 0+((prevOffset/prevFullZoom)*.9)

		if (prevOffset < 1) {
			document.getElementById("lights").style.visibility = "hidden"
		} else {
			document.getElementById("lights").style.visibility = "visible"
		}

		if (prevOn) {
			sliderP = ((sliderP-700)/2)+700
			tankPrevPos = ((tankPrevPos-25)/1.25)+25
		} else {
			sliderP = ((sliderP-670)/2)+670
			tankPrevPos = ((tankPrevPos+150)/1.25)-150
		}

		document.getElementById("togglePrev").style.left = sliderP
		document.getElementById("canvas3").style.top = tankPrevPos

		document.getElementById("togglePrev").style.top = tankPrevPos+152
		document.getElementById("sliderBG").style.top = tankPrevPos+152
		document.getElementById("on").style.top = tankPrevPos+143
		document.getElementById("off").style.top = tankPrevPos+143

		document.getElementById("zoom").style.top = tankPrevPos-24
		document.getElementById("zoomText").style.top = tankPrevPos-31
		document.getElementById("zoomOut").style.top = tankPrevPos-31

		if (mouseY < 25) {
			trans = (((trans+2)/2)-2)
		} else {
			trans = (((trans+22)/2)-22)
		}

		if (mouseY < 225) {
			trans2 = (((trans2-198)/2)+198)
		} else {
			trans2 = (((trans2-178)/2)+178)
		}

		document.getElementById("showButton").style.top = trans
		document.getElementById("hideButton").style.top = trans2

		ETC = makeEntityType
		if (ETC != ETP) {
			setAvailableTanks();
		}
		ETP = makeEntityType


		makeEntityAngle = Math.atan2(mouseY - makeEntityY - offset + window.pageYOffset, mouseX - makeEntityX + window.pageXOffset)*(180/Math.PI);
		makeEntityBarrels = getClassBarrels(classInput.value);
		makeEntityColor = colorInput.value;
		makeEntityBodyType = getClassBodyType(classInput.value);
		makeEntityLevel = levelInput.value;
		makeEntityName = nameInput.value;
		makeEntityType = entType.value;
		makeEntityClass = classInput.value;
	};
	
	
	for(i=0;i<entity.length;i++){ //filter unwanted shapes out
		var ent = entity[i];
		if(ent.classT != "square" 
		&& ent.classT != "triangleS" 
		&& ent.classT != "pentagon" 
		&& ent.classT != "drone" 
		&& ent.classT != "necrodrone" 
		&& ent.classT != "bullet" 
		&& ent.classT != "trap" && ent.entityType == "shape"){
			entity.splice(i,1);
		};
	};
	
	for(i=0;i<entity.length;i++){ //filter unwanted tanks out
		var ent = entity[i];
		if(ent.classT == "square" || ent.classT == "pentagon" || ent.classT == "triangleS"){
			if(ent.entityType == "tank"){
				entity.splice(i,1);
			};
		};
	};
	
	if(keysPressed[69]){
		deleteEntity(mouseX,mouseY-offset,20);
	};
		
};


var mouseX, mouseY;
var evt = window.event;

var isMakingEntity = false;
var doMakeEntity = false;
var isLoaded = false;
var makeEntityX, makeEntityY, makeEntityAngle, makeEntityColor, makeEntityBarrels, makeEntityLevel, makeEntityBodyType, makeEntityName, makeEntityType;
var levelInput, angleInput, colorInput, nameInput, classInput, btypeInput, sceneCodeText, barrelArray, entType;

function handleOnLoad(){
	isLoaded = true;
	levelInput = document.getElementById("levelInput");
	angleInput = document.getElementById("angleInput");
	colorInput = document.getElementById("colorInput");
	nameInput = document.getElementById("nameInput");
	classInput = document.getElementById("classInput");
	btypeInput = document.getElementById("btypeInput");
	sceneCodeText = document.getElementById("scenecodeText");
	barrelArray = document.getElementById("barrelsInput");
	entType = document.getElementById("etInput");
	document.getElementById('canvas2').width = window.innerWidth;
	document.getElementById('canvas').width = window.innerWidth;
};

function handleClick(evt){
	/*addEntity(
	mouseX,
	mouseY,
	angleInput.value,
	colorInput.value,
	1,
	nameInput.value,
	levelInput.value,
	getClassBarrels(classInput.value)
	);*/
	if (!turret) {
		if (!isMakingEntity){
			makeEntityX = mouseX+window.pageXOffset;
			makeEntityY = mouseY+window.pageYOffset-offset;
		};
			
		if (isMakingEntity){
			doMakeEntity = true;
			if (classInput.value == "autotrapper" || classInput.value == "autogunner" || classInput.value == "autosmasher") {
				makeEntity(
				makeEntityType,
				makeEntityX,
				makeEntityY,
				colorInput.value,
				1,
				nameInput.value,
				levelInput.value,
				getClassBarrels(classInput.value),
				makeEntityBodyType,
				makeEntityClass
				);
				turret = true
				tmpTank = classInput.value
				classInput.value = "turret"
			};
		};
		
		
		makeEntity(
		makeEntityType,
		makeEntityX,
		makeEntityY,
		colorInput.value,
		1,
		nameInput.value,
		levelInput.value,
		getClassBarrels(classInput.value),
		makeEntityBodyType,
		makeEntityClass
		);
	} else {
		doMakeEntity = true
		
		makeEntity(
		makeEntityType,
		makeEntityX,
		makeEntityY,
		"#555555",
		1,
		"",
		levelInput.value,
		getClassBarrels("turret"),
		makeEntityBodyType,
		makeEntityClass
		);

		doMakeEntity = true
		
		makeEntity(
		makeEntityType,
		makeEntityX,
		makeEntityY,
		"#999999",
		1,
		"",
		levelInput.value-75,
		getClassBarrels("blank"),
		"circle",
		makeEntityClass
		);
		turret = false
		classInput.value = tmpTank
	};
};	
var keysPressed = [];
function handleKeyDown(evt){
	keysPressed[evt.keyCode] = true;
		
	
};	
function handleKeyUp(evt){
	keysPressed[evt.keyCode] = false;
};	


function handleMouseMove(evt){
	mouseX = evt.clientX;
	mouseY = evt.clientY;
};
	
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;
document.onmousemove = handleMouseMove;
	
setInterval(step,50);

function makeEntity(type,x,y,color,health,name,level,barrels,bodyType,classT){
	isMakingEntity = true;
	if (doMakeEntity){
		isMakingEntity = false;
		doMakeEntity = false;
		addEntity(type,x,y,Math.atan2(mouseY - makeEntityY - offset + window.pageYOffset, mouseX - makeEntityX + window.pageXOffset)*(180/Math.PI),color,health,name,level,barrels,bodyType,classT);
	};
};


function addEntity(type,x,y,angle,color,health,name,level,barrels,bodyType,classT){
	entity.push({entityType:type,x:x,y:y,angle:angle,color:color,health:health,name:name,level:level,barrels:barrels,bodyType:bodyType,classT:classT});
	console.log("tank added");
};




var tankjson = {};

tankjson.blaster = [
	{barrelType: 1, length: 47, width: 28, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 40, width: 33, angle: 0, offsetX: 0, damage: 1, penetration: 1}
]

var basicbarr = [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var acbarr = [
	{barrelType: 0, length: 34, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var flankbarr = [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 34, width: 19, angle: 180, offsetX: 0, damage: 1, penetration: 1}
];
var sniperbarr = [
	{barrelType: 0, length: 50, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var assassinbarr = [
	{barrelType: 0, length: 58, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var hunterbarr = [
	{barrelType: 0, length: 50, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 23, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var predatorbarr = [
	{barrelType: 0, length: 50, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 44, width: 23, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 27, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var overseerbarr = [
	{barrelType: 1, length: 34, width: 40, angle: 90, offsetX: 0, damage: 1, penetration: 1},{barrelType: 1, length: 34, width: 40, angle: 270, offsetX: 0, damage: 1, penetration: 1}
];
var masterbarr = [
	{barrelType: 1, length: 34, width: 40, angle: 120, offsetX: 0, damage: 1, penetration: 1},{barrelType: 1, length: 34, width: 40, angle: 240, offsetX: 0, damage: 1, penetration: 1},{barrelType: 1, length: 34, width: 40, angle: 360, offsetX: 0, damage: 1, penetration: 1},
];
var managerbarr = [
	{barrelType: 1, length: 34, width: 40, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var overlordbarr = [
	{barrelType: 1, length: 34, width: 40, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 34, width: 40, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 34, width: 40, angle: 270, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 34, width: 40, angle: 180, offsetX: 0, damage: 1, penetration: 1}
];

var megatrapbarr = [{barrelType: 2, length: 45, width: 55, angle: 0, offsetX: 0, damage: 1, penetration: 1}];
var trapbarr = [
	{barrelType: 2, length: 45, width: 40, angle: 0, offsetX: 0, damage: 1, penetration: 1}];
var quadbarr = [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 180, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 270, offsetX: 0, damage: 1, penetration: 1}];
var octobarr = [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 180, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 270, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 45, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 135, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 315, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 225, offsetX: 0, damage: 1, penetration: 1}
];
var trianglebarr = [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 150, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 210, offsetX: 0, damage: 1, penetration: 1}
];
var fighterbarr = [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 150, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 210, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 270, offsetX: 0, damage: 1, penetration: 1}
];
var boosterbarr = [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 34, width: 19, angle: 138, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 34, width: 19, angle: 222, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 150, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 210, offsetX: 0, damage: 1, penetration: 1}
	];
var twinbarr = [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 24, damage: 1, penetration: 1}
];
var twinflankbarr = [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 180, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 180, offsetX: 24, damage: 1, penetration: 1}
];
var tripletwinbarr = [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 120, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 120, offsetX: 24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 240, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 240, offsetX: 24, damage: 1, penetration: 1}
];
var tripletbarr = [
	{barrelType: 0, length: 38, width: 19, angle: 0, offsetX: -27, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 0, offsetX: 27, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var triplebarr = [
	{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 60, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 45, width: 19, angle: 300, offsetX: 0, damage: 1, penetration: 1}
];
var pentabarr = [
	{barrelType: 0, length: 34, width: 19, angle: 40, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 34, width: 19, angle: 320, offsetX: 0, damage: 1, penetration: 1},
	
	{barrelType: 0, length: 43, width: 19, angle: 20, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 43, width: 19, angle: 340, offsetX: 0, damage: 1, penetration: 1},
	
	{barrelType: 0, length: 48, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
];
var necrobarr = [
	{barrelType: 1, length: 34, width: 34, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 34, width: 34, angle: 270, offsetX: 0, damage: 1, penetration: 1}
];
var factorybarr = [
	{barrelType: 1, length: 34, width: 34, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var summonerbarr = [
	{barrelType: 1, length: 30, width: 31, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 30, width: 31, angle: 180, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 30, width: 31, angle: 270, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 1, length: 30, width: 31, angle: 360, offsetX: 0, damage: 1, penetration: 1}
];
var guardianbarr = [{barrelType: 1, length: 25, width: 30, angle: 0, offsetX: 0, damage: 1, penetration: 1}];






function getClassBarrels(className){
	if (tankjson[className]!==undefined){
		return tankjson[className]
	} else if (className == "basic"){
		return [
			{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "flank"){
		return [
			{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 34, width: 19, angle: 180, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "octo"){
		return octobarr;
		} else if (className == "ac"){
		return [
			{barrelType: 0, length: 34, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "dom"){
		return [
			{barrelType: 3, length: 34, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "ms"){
		return [
			{barrelType: 0, length: 29, width: 9, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*2, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*3, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*4, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*5, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*6, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*7, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*8, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*9, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*10, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*11, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*12, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*13, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*14, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 29, width: 9, angle: 22.5*15, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if(className == "sniper"){
		return sniperbarr;
		} else if(className == "master"){
		return masterbarr;
		} else if(className == "assassin"){
		return assassinbarr;
		} else if (className == "hunter"){
		return hunterbarr;
		} else if (className == "predator"){
		return predatorbarr;
		} else if (className == "trapper" || className == "autotrapper"){
		return trapbarr;
		} else if (className == "megatrapper"){
		return megatrapbarr;
		} else if (className == "overseer"){
		return overseerbarr;
		} else if (className == "overlord"){
		return overlordbarr;
		} else if (className == "manager"){
		return managerbarr;
		} else if (className == "twin"){
		return twinbarr;
		} else if (className == "tripletwin"){
		return tripletwinbarr;
		} else if (className == "twinflank"){
		return twinflankbarr;
		} else if (className == "triplet"){
		return tripletbarr;
		} else if (className == "penta"){
		return pentabarr;
		} else if (className == "triangle"){
		return trianglebarr;
		} else if (className == "booster"){
		return boosterbarr;
		} else if (className == "fighter"){
		return fighterbarr;
		} else if (className == "necro"){
		return necrobarr;
		} else if (className == "summoner"){
		return summonerbarr;
		} else if (className == "guardian"){
		return guardianbarr;
		} else if (className == "factory"){
		return factorybarr;
		} else if (className == "custom"){
		return importJSON(barrelArray.value);
		} else if (className == "overtrapper"){
		return [
			{barrelType: 1, length: 34, width: 40, angle: 120, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 1, length: 34, width: 40, angle: -120, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 2, length: 45, width: 40, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "tritrapper"){
		return [
			{barrelType: 2, length: 45, width: 40, angle: 120, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 2, length: 45, width: 40, angle: -120, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 2, length: 45, width: 40, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "gunnertrapper"){
		return [
			{barrelType: 2, length: 45, width: 60, angle: 180, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 45, width: 10, angle: 0, offsetX: 20, damage: 1, penetration: 1},
			{barrelType: 0, length: 45, width: 10, angle: 0, offsetX: -20, damage: 1, penetration: 1}
		];
		} else if (className == "turret"){
		return [
			{barrelType: 0, length: 22, width: 15, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "gunner" || className == "autogunner") {
		return [
			{barrelType: 0, length: 33, width: 10, angle: 0, offsetX: 33, damage: 1, penetration: 1},
			{barrelType: 0, length: 33, width: 10, angle: 0, offsetX: -33, damage: 1, penetration: 1},
			{barrelType: 0, length: 45, width: 10, angle: 0, offsetX: 17, damage: 1, penetration: 1},
			{barrelType: 0, length: 45, width: 10, angle: 0, offsetX: -17, damage: 1, penetration: 1}
		];
		} else if (className == "streamliner") {
		return [
			{barrelType: 0, length: 58, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 51, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 44, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 37, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 30, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
		];
		} else if (className == "triple"){
		return [
			{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 45, width: 19, angle: 45, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 45, width: 19, angle: -45, offsetX: 0, damage: 1, penetration: 1},

		];
		} else if (className == "spread"){
		return [
			{barrelType: 0, length: 30, width: 10, angle: 75, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 30, width: 10, angle: -75, offsetX: 0, damage: 1, penetration: 1},

			{barrelType: 0, length: 34, width: 10, angle: 60, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 34, width: 10, angle: -60, offsetX: 0, damage: 1, penetration: 1},

			{barrelType: 0, length: 38, width: 10, angle: 45, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 38, width: 10, angle: -45, offsetX: 0, damage: 1, penetration: 1},

			{barrelType: 0, length: 42, width: 10, angle: 30, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 42, width: 10, angle: -30, offsetX: 0, damage: 1, penetration: 1},

			{barrelType: 0, length: 46, width: 10, angle: 15, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 46, width: 10, angle: -15, offsetX: 0, damage: 1, penetration: 1},

			{barrelType: 0, length: 50, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
		];
		} else if (className == "quad"){
		return [
			{barrelType: 0, length: 45, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 45, width: 19, angle: 90, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 45, width: 19, angle: -90, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 0, length: 45, width: 19, angle: 180, offsetX: 0, damage: 1, penetration: 1},
		];
		} else if (className == "destroyer"){
		return [
			{barrelType: 0, length: 45, width: 35, angle: 0, offsetX: 0, damage: 1, penetration: 1},
		];
		} else if (className == "hybrid"){
		return [
			{barrelType: 0, length: 45, width: 35, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 1, length: 34, width: 40, angle: 180, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "annihilator"){
		return [
			{barrelType: 0, length: 45, width: 45, angle: 0, offsetX: 0, damage: 1, penetration: 1},
		];
		} else if (className == "sprayer"){
		return [
			{barrelType: 0, length: 54, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
			{barrelType: 1, length: 45, width: 38, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "machine"){
		return [
			{barrelType: 1, length: 45, width: 38, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "minion"){
		return [
			{barrelType: 0, length: 40, width: 23, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
	} else {
		return [];
	};
	
};

function getClassBodyType(className){
	if (className == "necro" || className == "factory" || className == "summoner") {
		return "square";
	} else if (className == "guardian") {
		return "triangle";
	} else if (className == "dom") {
		return "dominator";
	} else if (className == "ms") {
		return "mothership";
	} else if (className == 'spike') {
		return 'spike';
	} else if (className == 'smasher' || className == 'asmasher') {
		return 'smasher';
	} else if (className == 'landmine') {
		return 'landmine';
	} else if (className == "custom") {
	    return btypeInput.value;
	} else {
		return 'circle';
	};
};

window.onresize = function(){
	canvas2.width = window.innerWidth
};
