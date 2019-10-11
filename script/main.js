var canvas_width=1500;
var canvas_height=600;

function setup() 
{
  createCanvas(canvas_width,canvas_height); 
  background(255);
  Init();
  init_ink();
  init_ink2() 
  for(i=0;i<5;i++)
  mountains.push(new omountain());
}

function draw() 
{
  if(type=='mountain_silk')
  {
    background(255);
    if(mountain_Mode=='default')
    {
      mountain();
    }
    else
    mountainIsDefined();
    if(SilkRibbon)
    {
      if(silkpoint.length>2&&silkflag==1)
      {
        sickRibbon();
      }
    }
  }
  if(type=='free')
  {
    maketree();
    if(mouseIsPressed&&brushType=='circle')
    {
      brush_soft();
  } 
  if(mouseIsPressed&&brushType=='eraser')
  {
    eraser();
  } 
  if(brushType=='pen')
  {
  if(pennow&&penposx)
  pen();
}
}
if(type=='ink')
  {
    if(ink_Mode=='curve')
    {
    ink_flow();
    }
    else if(ink_Mode=='straight')
    {
      ink2_flow();
    }
    else if(ink_Mode=='user_defined')
    {
      ink3_flow();
    }
  }
back();
}


function Init()
{
	InitGUI();
}