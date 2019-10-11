var silkflag=0;
var silkpoint=[];

function sickRibbon()
{
    if(silkpoint.length>2&&silkflag==1)
    {
      var sicolor=hex2Rgb(silkcolor);  
      ranges = 100; 
        
        for (i = 0; i < ranges; i++) 
        {
          noFill();
          strokeWeight(1.0);
          stroke(sicolor);
          
          beginShape();
          for (k = 0; k < silkpoint.length-1 ; k ++) 
          {
             n = noise(silkpoint[k].x* 0.001, i * 0.01, frameCount * 0.02);
             n2 = map(n, 0, 1,silkpoint[k].y-200, silkpoint[k].y+200);
            vertex(silkpoint[k].x, n2);
          }
          endShape();

        }
      }
}


function hex2Rgb(hex) 
{ 
  var rgb = []; 
    if (/^\#[0-9A-F]{3}$/i.test(hex)) 
    { 
      let sixHex = '#';
      hex.replace(/[0-9A-F]/ig, function(kw) 
      {
        sixHex += kw + kw; //把三位16进制数转化为六位
      }
    );
    hex = sixHex; 
  }
  if (/^#[0-9A-F]{6}$/i.test(hex)) 
  { //判断传入是否为#六位十六进制数
   hex.replace(/[0-9A-F]{2}/ig, function(kw) 
   {
    rgb.push(eval('0x' + kw));
   }
  );
   return `rgba(${rgb.join(',')},0.2)`; //输出RGB格式颜色
  } 
  else
   {
   console.log(`Input ${hex} is wrong!`);
   return 'rgba(0,0,0,0.2)';
  }
 }
 