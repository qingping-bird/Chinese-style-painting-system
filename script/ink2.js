var ink2_cx, ink2_cy;
var ink2_num;
var ink2_prevPos;
var ink2ParS;


function init_ink2() 
{
  ink2ParS=[];
  ink2_num = 6;
  ink2_prevPos = createVector(0, 0);
  ink2_cx = width/2;
  ink2_cy = height/2;
  for(i=0; i<ink2_num; i++) 
  {
    var p = new ink2Par();
		ink2ParS.push(p);
  }
}

function ink2_flow() 
{
  ++fadeFrame;
    if(fadeFrame % 15== 0)
    {		
		fill(255,255,255,10);
		rect(0,0,width,height);

		blendMode(DARKEST); 
		fill(backgroundColor);
		rect(0,0,width,height);
  }
  
  blendMode(BLEND);

  for(var i=0; i<ink2_num; i++) 
  {
    ink2_prevPos.x = ink2ParS[i].inkArray.x;
    ink2_prevPos.y = ink2ParS[i].inkArray.y;
    ink2ParS[i].inkArray.x += random(-0.5, 0.5);
    ink2ParS[i].inkArray.y += random(3);
    w = abs(ink2ParS[i].ink2_maxSize*10*noise(i) / (ink2ParS[i].inkArray.y + 25));
    a = map(ink2ParS[i].inkArray.y, ink2ParS[i].ink2_maxSize, 0, 0, 200);
    strokeWeight(w);
    stroke(0, a);

    if ( ink2ParS[i].inkArray.y  < ink2ParS[i].ink2_maxSize) 
    {
      line(ink2ParS[i].inkArray.x, ink2_prevPos.y, ink2ParS[i].inkArray.x, ink2ParS[i].inkArray.y);
    } 
    else 
    {
      ink2ParS[i].inkArray = createVector(random(-1,1)*550  + ink2_cx, 0); 
      ink2ParS[i].ink2_maxSize = random(height);
    }
  }
}

function ink2Par()
{
this.inkArray=createVector(random(-1,1)*550 + ink2_cx, 0);
this.ink2_maxSize= random(0,height);
}