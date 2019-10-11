var tree_rex=[];
var tree_rey=[];
var tree_op=[];
var treess=[];

function otree()
{
this.rex = 0;
this.rey=0;
this.maxSize=400;
this.prevPosx=0;
this.prevPosy=0;
this.orix=0;
this.oriy=0;
this.rat=0;
this.treex=[0,0,0,0,0,0,0,0];
this.treey=[0,0,0,0,0,0,0,0];
this.maxSizet=[0,0,0,0,0,0,0,0];
this.prevPosxt=[0,0,0,0,0,0,0,0];
this.prevPosyt=[0,0,0,0,0,0,0,0];
this.orixt=[0,0,0,0,0,0,0,0];
this.oriyt=[0,0,0,0,0,0,0,0];
this.ratt=[0,0,0,0,0,0,0,0];
this.ind=0;
}

function treez(trees)
{
    translate(trees.orix,trees.oriy);
    rotate(trees.rat);
    trees.prevPosxu=trees.rex;
    trees.prevPosyu=trees.rey;
    trees.rex += random(-0.5, 0.5);
    trees.rey -= random(3);    
        w = abs(trees.maxSize / (-trees.rey + 25))+5;
        a = map(-trees.rey, trees.maxSize, 0, 0, 200);
        strokeWeight(w); 
        stroke(_color, a);
        
        if (trees.rey > -trees.maxSize) 
        {
          line(trees.prevPosxu, trees.prevPosyu, trees.rex, trees.rey);
        } 
        else 
        {
          for (i=0;i<8;i++)
          {
            trees.orixt[i]=trees.orix;
            trees.oriyt[i]=trees.oriy-trees.maxSize/5*parseInt((i+2)/2)*cos(trees.rat);
            trees.ratt[i]=trees.rat+ Math.pow((-1),i)*random(0.6,1);  
            trees.maxSizet[i]=trees.maxSize/2-trees.maxSize/18*i;
          }
          tree_op[inn]=0;
        }
      }
  
  
  function treet(trees)
  {
    if(trees.ind>=250)
    {
      tree_rex.shift();
      tree_rey.shift();
      tree_op.shift();
      treess.shift();
    }

  for(i=0;i<8;i++)
  {
    push();
    translate(trees.orixt[i],trees.oriyt[i]);
    rotate(trees.ratt[i]);
    trees.prevPosxt[i]=trees.treex[i];
    trees.prevPosyt[i]=trees.treey[i];
    trees.treex[i] += random(-0.5, 0.5);
    trees.treey[i] -= random(3);    
        w = abs(trees.maxSizet[i] / (-trees.treey[i] + 25))+3;
        a = map(-trees.treey[i], trees.maxSizet[i], 0, 0, 200);
        strokeWeight(w); 
        stroke(_color, a);
        if (trees.treey[i]> -trees.maxSizet[i]) 
        {
          line(trees.prevPosxt[i], trees.prevPosyt[i], trees.treex[i], trees.treey[i]);
        } 
        else
        {
          trees.treex[i]=0;
          trees.treey[i]=0;
          trees.orixt[i]=trees.orixt[i]+trees.maxSizet[i]/5*sin(trees.ratt[i]);
          trees.oriyt[i]=trees.oriyt[i]-trees.maxSizet[i]/5*cos(trees.ratt[i]);
          trees.ratt[i]=trees.ratt[i]+random(-1,1);
          trees.maxSizet[i]=trees.maxSizet[i]/2;
          trees.ind=trees.ind+1;
        }
  
        pop();
  }
}

function maketree(){
  for(inn=0;inn< tree_rex.length;inn++)
    {
      push();
      translate( tree_rex[inn], tree_rey[inn]);
      scale(_size/128,_size/128);
      if(tree_op[inn]==1)
      {
        treez(treess[inn]);
      }
      else
      {
        treet(treess[inn]);
      } 
      pop();
      
    }
}

