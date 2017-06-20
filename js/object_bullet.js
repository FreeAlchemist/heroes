function CreateBullet(Tank,SelfTank,Name,shotrange){
												// console.log(Tank,SelfTank);
	this.tank=Tank; //Какой танк стреляет //TankN,TankN
	newDiv=document.createElement('div');

	//ставим снаряд размером с танк
	newDiv.style.height=way+edizm;
	newDiv.style.width=way+edizm;
	newDiv.style.top=SelfTank.y+edizm;
	newDiv.style.left=SelfTank.x+edizm;
	newDiv.className=this.tank+"bullet shot "+SelfTank.name+"_shot";
	if(SelfTank.lastmove==1){this.move=1;}
	if(SelfTank.lastmove==2){this.move=2;}
	if(SelfTank.lastmove==3){this.move=3;}
	if(SelfTank.lastmove==4){this.move=4;}
	bulletfield.appendChild(newDiv);
	this.name=Name;
	this.range = shotrange;
	this.div=newDiv;
	this.class=newDiv.className;
	this.y=parseInt(window.getComputedStyle(this.div,null).top);
	this.x=parseInt(window.getComputedStyle(this.div,null).left);
												console.log(this.class)
												console.log('this.tank.damage '+this.tank.damage)
	/*W UP*/
	if(this.move == '1'){
		ThisShot = this
		$(this.div).fadeIn(1000).delay(200).animate({ "top": "-="+this.range+edizm},
			{step:function(now,fx){var data = ((now/10).toFixed(0))*10; hit(ThisShot,data,1)}}, shotspeed,"linear");
		$(this.div).css('transform','rotateZ(0deg) translateY(-'+way/3+edizm+')');
		removeShot(this)
	}
	/*D RIGHT*/
	if(this.move == '2'){
		ThisShot = this
		$(this.div).fadeIn(1000).delay(200).animate({ "left": "+="+this.range+edizm},
			{step:function(now,fx){var data = ((now/10).toFixed(0))*10;hit(ThisShot,data,2)}}, shotspeed,"linear");
		$(this.div).css('transform','rotateZ(90deg) translateY(-'+way/3+edizm+')');
		removeShot(this)
	}
	/*A LEFT*/
	if(this.move == '3'){
		ThisShot = this
		$(this.div).fadeIn(1000).delay(200).animate({ "left": "-="+this.range+edizm},
			{step:function(now,fx){var data = ((now/10).toFixed(0))*10;hit(ThisShot,data,3)}}, shotspeed,"linear");
		$(this.div).css('transform','rotateZ(-90deg) translateY(-'+way/3+edizm+')');
		removeShot(this)
	}
	/*S DOWN*/
	if(this.move == '4'){
		ThisShot = this
		$(this.div).fadeIn(1000).delay(200).animate({ "top": "+="+this.range+edizm},
			{step:function(now,fx){var data = ((now/10).toFixed(0))*10;hit(ThisShot,data,4)}} , shotspeed,"linear");
		$(this.div).css('transform','rotateZ(180deg) translateY(-'+way/3+edizm+')');
		removeShot(this)
	}
}

function removeShot(tank){setTimeout(function() {$(tank.div).remove();},1000)}

function instantRemoveShot(tank){
	$(tank.div).stop()
	$(tank.div).remove()
}

function hit(tank,position,move){
	activemove = move
												// console.log("activemove: "+activemove)
	activetank = tank.div
												// console.log("activetank: "+activetank)
	activeshot = position
												// console.log("position: "+position)
	var sx = $(activetank).css('left')
												// console.log("sx: "+sx)
	var sy = $(activetank).css('top')
												// console.log("sy: "+sy)
	function checkWall(move){
		wallcubes=mazefield.getElementsByTagName('*');
			for(var b=0; b<wallcubes.length; b++) {
			WallCube = wallcubes[b];
												// console.log(WallCube.className)
			BY = window.getComputedStyle(WallCube,null).top;
			BX = window.getComputedStyle(WallCube,null).left;

			function hitblock(){
				instantRemoveShot(tank)
				if(WallCube.className=="BrickBlock damaged"){$("#"+WallCube.id).remove()}
				if(WallCube.className=="BrickBlock"){
						$("#"+WallCube.id).addClass("damaged")
						$("#"+WallCube.id).css('backgroundImage',"url('./img/brick2.svg')")
				}
			}

			if(move == '1' || move == '4'){if(BX == sx && BY == position+edizm){hitblock()}}
			if(move == '2' || move == '3'){if(BX == position+edizm && BY == sy){hitblock()}}

		}//for
	}

	if($(activetank).hasClass("Tank1bullet")){
		enemytank = $("#Tank2")
		enemytankHP = $("#Tank2HP")
		enemyobj = Tank2
		myobj = Tank1
		enemyobj.rival = "Finn"
	}
	if($(activetank).hasClass("Tank2bullet")){
		enemytank = $("#Tank1")
		enemytankHP = $("#Tank1HP")
		enemyobj = Tank1
		myobj = Tank2
		enemyobj.rival = "Regis"
	}

		var tx = enemytank.css('left')
		var ty = enemytank.css('top')

		function hittank(){
												// console.log(tank.name)
			enemyobj.HP=enemyobj.HP-myobj.damage;
			$("#field").append($('<div />',{class:'blood',id:enemyobj.name+enemyobj.HP}))
			$("#"+enemyobj.name+enemyobj.HP).css('left',enemyobj.x).css('top',enemyobj.y)
			$("#"+enemyobj.name+enemyobj.HP).css('width',way+edizm).css('height',way+edizm)
			enemytankHP.attr('value',enemyobj.HP)
			enemytank.animate({ opacity: .6},function(){enemytank.css('opacity','1')})
			instantRemoveShot(tank)
		}
		checkWall(activemove)
		if(activemove == "1" || activemove == "4"){if(tx == sx && ty == position+edizm){hittank()}}
		if(activemove == "2" || activemove == "3"){if(tx == position+edizm && ty == sy){hittank()}}
}