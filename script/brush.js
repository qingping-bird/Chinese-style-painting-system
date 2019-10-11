var penposx;
var penposy;
var penoirr;
var pennow;

function brush_soft()
{
  noStroke();    
  for(i=0;i<10;i=i+0.5)
  {
  fill(_color, _color, _color, i); 
  ellipse(mouseX, mouseY, _size/10*i, _size/10*i);
 }
}

function eraser()
{
  noStroke();    
  for(i=0;i<10;i=i+0.5)
  {
      deta=i*10;
  fill(255, 255, 255, deta); 
  ellipse(mouseX, mouseY, _size/10*i, _size/10*i);
 }
}

function pen()
{  
    dix=pennow.pos.x-penposx;
    diy=pennow.pos.y-penposy;
    dir=pennow.size-penoirr;
    fill(_color);
    noStroke();
    for(i=0;i<21;i++)
    {
      ellipse(penposx+dix/20*i,penposy+diy/20*i,penoirr+dir/20*i,penoirr+dir/20*i)
    } 
    strokeWeight(min(penoirr,pennow.size)); 
  noFill();
  stroke(_color);
    line(penposx,penposy,pennow.pos.x,pennow.pos.y);
}

function inkk(){
  this.size=noise(mouseX,mouseY)*5+0.1;
  this.pos=createVector(mouseX,mouseY);
}