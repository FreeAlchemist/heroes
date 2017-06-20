function CreateEscape(y,x){
	newDiv=document.createElement('div');
	newDiv.style.height=way+edizm;
	newDiv.style.width=way+edizm;
	newDiv.style.top=y*way+edizm;
	newDiv.style.left=x*way+edizm;
	newDiv.className='EscapeCube';
	newDiv.id='EscapeCube';
	// newDiv.text='☣';
	field.appendChild(newDiv);
	this.div=newDiv;
	this.y=parseInt(window.getComputedStyle(this.div,null).top);
	this.x=parseInt(window.getComputedStyle(this.div,null).left);
}