function CreateBlock(HP,Class,y,x,idblock){
	this.HP=HP; //Индикатор здоровья Стены
	newDiv=document.createElement('div');
	newDiv.className=Class;
	newDiv.id=Class+idblock;
	newDiv.style.height=way+edizm;
	newDiv.style.width=way+edizm;
	newDiv.style.top=y*way+edizm;
	newDiv.style.left=x*way+edizm;
	mazefield.appendChild(newDiv);
	this.div=newDiv;
	this.class=Class;
	this.y=parseInt(window.getComputedStyle(this.div,null).top);
	this.x=parseInt(window.getComputedStyle(this.div,null).left);
	blockid +=1
}