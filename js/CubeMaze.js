way = 50;
cannonplace = way/5;
shotdistance=50;
speed=0;
moveway=100;
movespeed=200;
shotspeed=500;
// shotrange=200;
quadtime=60000;
shotflighttime=200;
edizm = "px";
// fieldcolor="Darkgrey";
fieldcolor="Black";
fieldtop="50";
fieldleft="50";
blockid=1;

CanMoveInterval = setInterval(function(){canmove(),0});

/*
S-SolidBlock
B-BrickBlock(destroyable)
1-Tank1
2-Tank2
E-Escape
*/

// var fieldText = ""
// + "SSSSSSSSSSSSSSSSSS\n" 
// + "S       B        S\n" 
// + "S       S    B   S\n" 
// + "S       S    B   S\n" 
// + "S                S\n" 
// + "S SSBBSSSSSB     S\n" 
// + "S   2  E  1      S\n" 
// + "S S  BSSSSSB     S\n" 
// + "S       S     BBBS\n" 
// + "S S   S  B       S\n" 
// + "S     BBB        S\n" 
// + "S     S          S\n" 
// + "S     S    SSS   S\n" 
// + "S            B   S\n" 
// + "SSSSSSSSSSSSSSSSSS" ;

var fieldText = ""
+ "SSSSSSSSSSSSSSSSS\n" 
+ "S               S\n" 
+ "S BBB           S\n" 
+ "S    2  E  1    S\n" 
+ "S           BBB S\n" 
+ "S               S\n" 
+ "SSSSSSSSSSSSSSSSS" ;


function createmaze(fieldText, way){
	$('#startscreen').hide()
	var feildArr =  fieldText.split('\n');
	var fieldH = feildArr.length * way;  
	var fieldW = feildArr[0].length * way;
	fieldheight=fieldH;
	fieldwidth=fieldW;

	//Размечаем поле
	field.style.background=fieldcolor;
	field.style.height=fieldH+edizm;
	field.style.width=fieldW+edizm;
	field.style.top=fieldtop+edizm;
	field.style.left=fieldleft+edizm;

	mazefield.style.height=fieldH+edizm;
	mazefield.style.width=fieldW+edizm;
	mazefield.style.top=fieldtop+edizm;
	mazefield.style.left=fieldleft+edizm;

	bulletfield.style.height=fieldH+edizm;
	bulletfield.style.width=fieldW+edizm;
	bulletfield.style.top=fieldtop+edizm;
	bulletfield.style.left=fieldleft+edizm;

	for (var y in feildArr) {
		var line = feildArr[y];
		for (var x in line) {
			//Размещаем стены
			if (line[x]==='S') {SolidBlock = new CreateBlock("50","SolidBlock",y,x,blockid);}
			else if (line[x]==='B') {BrickBlock = new CreateBlock("50","BrickBlock",y,x,blockid);}
			//Размещаем выход
			else if (line[x]==='E') {EscapeBlock = new CreateEscape(y,x);}
			//Размещаем танк1
			else if (line[x]==='1') {Tank1 = new CreateTank("100","Tank1",y,x,38,39,37,40,96,"hero_1",25,50);}
			//Размещаем танк2
			else if (line[x]==='2') {Tank2 = new CreateTank("100","Tank2",y,x,87,68,65,83,32,"hero_2",10,200);}
		}//for
	}//for
	canmove();
}

//Экран победы
function win(winner){
	clearInterval(CanMoveInterval);
	field.style.background="black";
	Tank1.move=0;Tank1.canshoot=0;
	Tank2.move=0;Tank2.canshoot=0;
	newDiv=document.createElement('div');
	newDiv.className='WinMsg';
	newDiv.id='WinMsg';
	newDiv.style.height="30%";
	newDiv.style.width="60%";
	newDiv.style.top="30%";
	newDiv.style.left="20%";
	newDiv.style.border="1px groove Burlywood";
	newDiv.innerHTML="<br><br>Congratulations "+winner+"!!!<p>Press ENTER to restart</p>☢";
	field.appendChild(newDiv);	
}

function canmove(){
		//Когда встречаются танки (не могут ехать друг сквозь друга)
		if(Tank1.y==Tank2.y&&Tank1.x==Tank2.x+way){Tank1.canmoveleft=0;Tank2.canmoveright=0;}
		if(Tank1.y==Tank2.y+way&&Tank1.x==Tank2.x){Tank1.canmoveup=0;Tank2.canmovedown=0;}
		if(Tank1.y+way==Tank2.y&&Tank1.x==Tank2.x){Tank1.canmovedown=0;Tank2.canmoveup=0;}
		if(Tank1.y==Tank2.y&&Tank1.x+way==Tank2.x){Tank1.canmoveright=0;Tank2.canmoveleft=0;}
}