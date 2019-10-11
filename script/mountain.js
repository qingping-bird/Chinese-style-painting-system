function omountain()
{
  this.tall=mountainTall;
  this.shade=0;
  this.x=0;
}

var  mountains=[];

function mountain()
{
var noiseScale=0.01;
var noiseScale2=0.005;
for(var k=0;k<mountainNum;k++)
{
    for (var x=0; x < width; x++) 
    {
      var noiseVal = noise((-mouseX+x)*noiseScale+k*100);
      var noiseVal2=noise((-mouseX+x+100)*noiseScale2+k*100);
      stroke(230-40*k);
      mountainstall=height-mountainTall+noiseVal*160-50+noiseVal2*60+50*k;
      line(x, mountainstall, x, height);
    }
    var tem=height-mountainTall+180+50*k;
    mountainShade(tem,230-40*k,shade);
}
}

function mountain_defined()
{
  var noiseScale=0.01;
  var noiseScale2=0.005;
  for(var k=0;k<mountainNum;k++)
  {    
    for (var x=0; x < width; x++) 
    {
      var noiseVal = noise(( mountains[k].x+x)*noiseScale+k*100);
      var noiseVal2=noise((mountains[k].x+x+10)*noiseScale2+k*100);
      stroke(230-40*k);
      mountainstall=height-mountains[k].tall+noiseVal*160-50+noiseVal2*160+50*k;
      line(x, mountainstall, x, height);
    }
    var tem=height-mountains[k].tall+180+50*k;
    mountainShade(tem,230-40*k,mountains[k].shade);
  }
}

function mountainIsDefined()
{
  var mo_in=parseInt(mountain_index)-1;
  console.log(mountains);
    mountains[mo_in].tall=mountainTall;
    mountains[mo_in].shade=shade;
    if(mouseIsPressed)
    mountains[mo_in].x=-mouseX;
    mountain_defined();
}

function mountainShade(mmheight,mcolor,shade)
{
   for(i=mmheight;i<height;i++)
   {
    stroke(mcolor+(i-mmheight)*shade);
    line(0, i, canvas_width, i);
   }
}