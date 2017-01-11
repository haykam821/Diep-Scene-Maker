
var entity = [];


function setColorInput(color){
	colorInput.value = color;
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
		if (getDistance(x,y,ent.x,ent.y) <= 10){
			entity.splice(i,1);
		};
	};
};


function getDistance(ax,ay,bx,by){
	return Math.sqrt(((bx-ax)*(bx-ax))+((by-ay)*(by-ay)));
};



function step(){
	if (isLoaded){
		makeEntityAngle = Math.atan2(mouseY - makeEntityY, mouseX - makeEntityX)*(180/Math.PI);
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
		if(ent.classT != "square" && ent.classT != "pentagon" && ent.entityType == "shape"){
			entity.splice(i,1);
		};
	};
	
	for(i=0;i<entity.length;i++){ //filter unwanted tanks out
		var ent = entity[i];
		if(ent.classT == "square" || ent.classT == "pentagon"){
			if(ent.entityType == "tank"){
				entity.splice(i,1);
			};
		};
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
		if (!isMakingEntity){
		makeEntityX = mouseX+window.pageXOffset;
		makeEntityY = mouseY+window.pageYOffset;
		};
		
		if (isMakingEntity){
			doMakeEntity = true;
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
		
};	

function handleKeyDown(evt){
	if(evt.keyCode == 69){
		deleteEntity(mouseX,mouseY,10);
	};
};	


function handleMouseMove(evt){
	
	
	
	
	
	mouseX = evt.clientX;
	mouseY = evt.clientY;
	
};
	
document.onkeydown = handleKeyDown;
document.onmousemove = handleMouseMove;
	
setInterval(step,50);

function makeEntity(type,x,y,color,health,name,level,barrels,bodyType,classT){
	isMakingEntity = true;
	if (doMakeEntity){
		isMakingEntity = false;
		doMakeEntity = false;
		addEntity(type,x,y,Math.atan2(mouseY - makeEntityY, mouseX - makeEntityX )*(180/Math.PI),color,health,name,level,barrels,bodyType,classT);
	};
};


function addEntity(type,x,y,angle,color,health,name,level,barrels,bodyType,classT){
	entity.push({entityType:type,x:x,y:y,angle:angle,color:color,health:health,name:name,level:level,barrels:barrels,bodyType:bodyType,classT:classT});
	console.log("tank added");
};





var basicbarr = [
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var acbarr = [
	{barrelType: 0, length: 34, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var flankbarr = [
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
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
	{barrelType: 0, length: 42, width: 23, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var predatorbarr = [
	{barrelType: 0, length: 50, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 44, width: 23, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 27, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var overseerbarr = [
	{barrelType: 1, length: 34, width: 40, angle: 90, offsetX: 0, damage: 1, penetration: 1},{barrelType: 1, length: 34, width: 40, angle: 270, offsetX: 0, damage: 1, penetration: 1}
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

var megatrapbarr = [{barrelType: 2, length: 42, width: 55, angle: 0, offsetX: 0, damage: 1, penetration: 1}];
var trapbarr = [
	{barrelType: 2, length: 42, width: 40, angle: 0, offsetX: 0, damage: 1, penetration: 1}];
var quadbarr = [
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 180, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 270, offsetX: 0, damage: 1, penetration: 1}];
var octobarr = [
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 180, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 270, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 45, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 135, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 315, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 225, offsetX: 0, damage: 1, penetration: 1}
];
var trianglebarr = [
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 150, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 210, offsetX: 0, damage: 1, penetration: 1}
];
var fighterbarr = [
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 150, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 210, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 90, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 270, offsetX: 0, damage: 1, penetration: 1}
];
var boosterbarr= [
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 34, width: 19, angle: 138, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 34, width: 19, angle: 222, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 150, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 38, width: 19, angle: 210, offsetX: 0, damage: 1, penetration: 1}
	];
var twinbarr = [
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 24, damage: 1, penetration: 1}
];
var twinflankbarr = [
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 24, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 180, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 180, offsetX: 24, damage: 1, penetration: 1}
];
var tripletwinbarr = [
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 24, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 120, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 120, offsetX: 24, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 240, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 240, offsetX: 24, damage: 1, penetration: 1}
];
var tripletbarr = [
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: -24, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 24, damage: 1, penetration: 1},
	{barrelType: 0, length: 46, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
];
var triplebarr = [
	{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 60, offsetX: 0, damage: 1, penetration: 1},
	{barrelType: 0, length: 42, width: 19, angle: 300, offsetX: 0, damage: 1, penetration: 1}
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
	if (className == "basic"){
		return [
			{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1}
		];
		} else if (className == "flank"){
		return [
			{barrelType: 0, length: 42, width: 19, angle: 0, offsetX: 0, damage: 1, penetration: 1},
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
		} else if(className == "assassin"){
		return assassinbarr;
		} else if (className == "hunter"){
		return hunterbarr;
		} else if (className == "predator"){
		return predatorbarr;
		} else if (className == "trapper"){
		return trapbarr;
		} else if (className == "megatrapper"){
		return megatrapbarr;
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
	} else {
		return [];
	};
	
};

function getClassBodyType(className){
	if(
	className == "basic" || 
	className == "ac" || 
	className == "sniper" || 
	className == "assassin" || 
	className == "hunter" || 
	className == "predator" || 
	className == "trapper" || 
	className == "megatrapper" || 
	className == "overlord" || 
	className == "manager" || 
	className == "twin" || 
	className == "tripletwin" || 
	className == "twinflank" || 
	className == "triplet" || 
	className == "triangle" || 
	className == "booster" ||
	className == "penta" ||
	className == "octo"
	){
		return "circle";
	};
	if(
	className == "necro" || 
	className == "factory" ||
	className == "summoner"
	){
		return "square";
	};
	if(
	className == "guardian"
	){
		return "triangle";
	};
	if(
	className == "dom"
	){
		return "dominator";
	};
	if(
	className == "ms"
	){
		return "mothership";
	};
	if(className == "custom"){
		return btypeInput.value;
	};
};
