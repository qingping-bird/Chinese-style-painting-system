var inkf=[];

function ink3_flow()
{
for(j=0;j<inkf.length;j++)
{
inkfree();
}
}

function inkwater()
{
  this.color=inklife;
  this.gravity=random(1,5);
  this.size=random(50,100);
  this.posx=mouseX;
  this.posy=mouseY; 
}

function inkfree()
{  
  noStroke();
 fill(inkcolor,inkcolor,inkcolor,inkf[j].color);
	ellipse(inkf[j].posx,inkf[j].posy,inkf[j].size,inkf[j].size);  
	inkf[j].posy=inkf[j].posy+inkf[j].gravity;
	inkf[j].posx=inkf[j].posx+noise(j,frameCount * 0.02)-0.5;
  inkf[j].color=inkf[j].color-0.8;
  inkf[j].size=inkf[j].size-0.2;
  if(inkf[j].color<=0){
	inkf.shift();
  }
}
