var ink1op=false;
var ink2op=false;

function mouseClicked()
{
  if(mouseX<=140&&mouseX>=60&&mouseY<=150&&mouseY>=100)
  {
    clearall();
  }
  else if (type=='ink'&&mouseX<canvas_width&&mouseY<canvas_height)
    { 
      if(ink_Mode=='curve')
      {
      ink1op=true;
      var newink =new Particle();
      newink.pos.x=mouseX;
      newink.pos.y=mouseY;
      newink.life=10;
      particles.push(newink);
      nums++;
      }

      else
      {
      ink2op=true;
      var newink2 =new ink2Par();
      newink2.inkArray=createVector(mouseX, 100);
      newink2.life=10;
      ink2ParS.push(newink2);
      ink2_num++;
      }
    }

    else if(type=='free'||type=='mountain_silk')
    {
      if(ink1op||ink2op)
      {
      ink1op=false;
      ink2op=false;
      init_ink2(); 
      init_ink();
      }
      
    if (brushType=='tree'&&mouseX<canvas_width&&mouseY<canvas_height)
    {
      tree_rex.push(mouseX);
      tree_rey.push(mouseY);
      var onetree=new otree();
      treess.push(onetree);
      tree_op.push(1);
    }
    }    
}


function mouseDragged()
{
  if(mouseX<canvas_width&&mouseY<canvas_height)
  {
  if(type=='mountain_silk'&&SilkRibbon)
  {
    if(silkflag==1) 
    {
      silkflag=0;
      silkpoint=[];
    }
      var a=createVector(mouseX,mouseY);
      silkpoint.push(a);
    }
  else if(type=='ink'&&ink_Mode=='user_defined')
  {  
  var inkwatertem=new inkwater();
  inkf.push(inkwatertem);
  }
  else if(type=='free'&&brushType=='pen')
  {
    if(pennow){
      penposx= pennow.pos.x;
      penposy= pennow.pos.y;
      penoirr=pennow.size;}
        pennow=new inkk();
        dix=pennow.pos.x-penposx;
        diy=pennow.pos.y-penposy;
        if(dix<10&&diy<10)
        pennow.size=pennow.size+noise(mouseX,mouseY)*5+3;
  }
  }
}


function mouseReleased()
{
  if(mouseX<canvas_width&&mouseY<canvas_height)
  {
  if(type=='mountain_silk'&&SilkRibbon)
  {
    silkflag=1;
  }
  else if(type=='free'&&brushType=='pen')
  {
    pennow=null;
  penposx=null;
  penposy=null;
  penoirr=null;
  }
}
}

function clearall()
{
  fill(255);
  rect(0,0,width,height);
  init_ink2(); 
  init_ink();
}