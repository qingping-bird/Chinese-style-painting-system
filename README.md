# Chinese-style-painting-system
## 一、实现效果
本系统基于p5.js完成，具有一般绘画系统的特点，作画者可以通过选择不同的笔刷完成自己的作品。作画者可以根据自己的需要选择静态或动态效果，在动态效果下可以看到画上去的东西并不像一般的绘画系统静止不动，画面能随着鼠标的位移或时间的变化遵循一定规律变动。
### 1）动态效果

![0](https://img-blog.csdnimg.cn/2018122713575475.gif)

![1](https://img-blog.csdnimg.cn/20181227140600544.gif)

![2](https://img-blog.csdnimg.cn/20181227144651503.gif)
### 2）静态效果
![0](https://img-blog.csdnimg.cn/20181227152146962.JPG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmd5b3V4dTI0,size_16,color_FFFFFF,t_70)

## 二、代码实现
### 1）静态笔刷
![0](https://img-blog.csdnimg.cn/20181227162023651.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmd5b3V4dTI0,size_16,color_FFFFFF,t_70)
![1](https://img-blog.csdnimg.cn/20181227162536721.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmd5b3V4dTI0,size_16,color_FFFFFF,t_70)
对于第一种效果，作画者可自定义笔刷大小和形状，其笔刷实质是一个多层的同心圆，越在外层的圆透明度越低。

```javascript
function brush_soft(){  
  noStroke();      
  for(i=0;i<10;i=i+0.5)  {  
  fill(_color, _color, _color, i);   
  ellipse(mouseX, mouseY, _size/10*i, _size/10*i); }
  }
```
墨迹有着很大的不规则性，笔尖停顿时或转折处一般会比较浓。这次在模拟它的作画笔触的时候主要模仿了这一点。
为了实现第二种效果需要记住每次鼠标拖拽当前点的前一个点的位置，设定一个阈值，若当前鼠标的位置与前一个点的位置小于这个阈值则当前点的半径增大。其他情况下点的大小在一定范围内随机产生。实验中发现若是只在当前点和前一个点之间连一条线，线的粗细转变会显得相当突兀，所以我在连线的基础上，在每两个点之间画多个半径渐变的圆进行过渡。

```javascript
function pen(){      
  dix=pennow.pos.x-penposx;    
  diy=pennow.pos.y-penposy;    
  dir=pennow.size-penoirr;    
  fill(_color);    
  noStroke();    
  for(i=0;i<21;i++){      
   ellipse(penposx+dix/20*i,penposy+diy/20*i,penoirr+dir/20*i,penoirr+dir/20*i)    
}     
  strokeWeight(min(penoirr,pennow.size));   
  noFill();  
  stroke(_color);    
  line(penposx,penposy,pennow.pos.x,pennow.pos.y);
}
```
### 2）树
![0](https://img-blog.csdnimg.cn/20181227210117848.gif)树是动态生长的，作画者只需要鼠标点击每棵树的生长位置即可在该处看到一棵不断长高分叉的树。
树分为树枝和树干，对每个枝干都大致上有大小由粗变细，颜色由深到浅的变化。所以在画线时粗细和颜色的定义必然与高度有关。另外树的枝干并不是直上直下的，它在一定范围内会有偏移，以及为了模拟水墨效果，其每画一条线的透明度也有所区别。所以每次更新时参数的定义如下（这里参考了openprocessing里的代码：https://www.openprocessing.org/sketch/192912 ）：

```javascript
  trees.rex += random(-0.5, 0.5);    
  trees.rey -= random(3);            
  w = abs(trees.maxSize / (-trees.rey + 25))+5;        
  a = map(-trees.rey, trees.maxSize, 0, 0, 200);        
  strokeWeight(w);         
  stroke(_color, a);
```
在这样画完树干之后，创建一个数组就可以用同样的方式同时画树的树枝了。当然为了让每棵树的形状不完全相同，所有的树枝生长角度都在一定的范围内随机分布。
最后在一棵树生长完后将这棵树移出数组，让计算机不用再计算它。
下面的墨水流淌效果用的也是大致同样的方法，作画者鼠标点击后会在画布上方新增一条墨迹：
![1](https://img-blog.csdnimg.cn/20181227221451843.gif)
### 3）山

用静态笔刷当然可以绘制大概的山的形状，但这个形状是很朦胧的而且也很难控制。后来我参考了P5官方网站上有关noise函数的内容（https://p5js.org/zh-Hans/reference/#/p5/noise ）大概实现了一个能随鼠标位置平移的山脉。
![0](https://img-blog.csdnimg.cn/20181227223249957.gif)
柏林噪声与 random() 函数最主要的不同点在于前者是在一个无限的 n 维空间内定义的。实现山的起伏效果用了两个柏林噪声，第一个噪声值用来顶定山脉存在较大起伏的地方，第二个噪声值在第一个的基础上使山脉的细节变化更多些。
```javascript
 function mountain(){
 var noiseScale=0.01;
 var noiseScale2=0.005;
 for(var k=0;k<mountainNum;k++){    
 for (var x=0; x < width; x++){      
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
```
但是这样完成的山又太死板，作画者的自由度太少，所以加入了作画者可单独操作每一层山的模式，另外每层山的颜色也可随作画者的喜好产生渐变效果。
![1](https://img-blog.csdnimg.cn/20181227224349963.gif)
### 4）飘带
![0](https://img-blog.csdnimg.cn/20181227225037283.gif)一开始为了实现飘带的效果我查阅了很多别人有关波动、起伏等动态的绘制方法，后来主要是看了 https://www.openprocessing.org/sketch/611317 里的程序。随机飘动效果用的依旧是柏林噪声，每个点横向的值不变，用map将点的纵向值规定在一个范围内。原代码中的效果更像是水面上的浪，其原因是它波动的范围太大，且视觉上越远的地方颜色越浅。为了使它的效果更像飘带些，我缩小了它的波动范围并且更改了它的颜色设定。
更重要的是原程序的波动效果是固定的，没法与用户进行交互，与我的最终目的不符，所以我在鼠标拖拽的时候将所有鼠标经过的点记录下来作为飘带经过的路径。修改后的程序可以实现飘带的活动路径和颜色皆由作画者指定，在作画者用鼠标拖拽的方式定下路径后，飘带就会在这个路径的大概位置上上下变换了。
绘制飘带飘动的效果：
```javascript
beginShape();          
for (k = 0; k < silkpoint.length-1 ; k ++)          
 {             
 n = noise(silkpoint[k].x* 0.001, i * 0.01, frameCount * 0.02);             
 n2 = map(n, 0, 1,silkpoint[k].y-200, silkpoint[k].y+200);            
 vertex(silkpoint[k].x, n2);          
 }
endShape();
```
记录鼠标拖动的位置：
```javascript
var a=createVector(mouseX,mouseY);      
silkpoint.push(a);
```
这里其实还有一个问题，当画面里只有一个飘带时线条变化比较快和流畅，但是当画面中同时出现山脉或者树等在运动的物体时，每一帧计算的量会变大，很容易产生不流畅和卡顿感。
### 5）墨迹
除了上面已经介绍过模拟墨迹的两种笔刷外，还有另外两种用来产生墨迹效果的模式
![0](https://img-blog.csdnimg.cn/20181228114359108.gif)
![1](https://img-blog.csdnimg.cn/20181228115651568.gif)
第一种模式下，作画者可通过鼠标点击的方式在该位置生成一条弯曲的路径，这其中利用了粒子系统。具体的代码参考 https://www.openprocessing.org/sketch/566877  。
另外为了更好的模拟墨迹效果，我在每画下一点时都改变了它的半径大小和颜色。
粒子：
```javascript
function Particle(){    
this.vel = createVector(0, 0);    
this.pos = createVector(random(0, width), random(0, height));    
this.life = random(0, maxLife);    
this.flip = int(random(0,2)) * 2 - 1;    
this.color1 = this.color2 = color('black');
this.move = function(iterations){...};
this.checkEdge = function(){...};
this.respawn = function(){...};
this.respawnTop = function() {...};
this.display = function(r){...};
   }
```
半径及颜色的改变

```javascript
var radius = map(i,0,nums,5,20)*noise(i,frameCount * 0.02);
var alpha = 150*noise(frameCount * 0.02)+105;
```
第二种效果用了较大的笔刷，鼠标滑过后会在该位置生成一个向下流淌的墨点，每次向下位移的时候位置和颜色都会产生些微的改变。

```javascript
function inkfree(){    
noStroke(); 
fill(inkcolor,inkcolor,inkcolor,inkf[j].color);  
ellipse(inkf[j].posx,inkf[j].posy,inkf[j].size,inkf[j].size);    
inkf[j].posy=inkf[j].posy+inkf[j].gravity;  
inkf[j].posx=inkf[j].posx+noise(j,frameCount * 0.02)-0.5;  
inkf[j].color=inkf[j].color-0.8;  
inkf[j].size=inkf[j].size-0.2;  
if(inkf[j].color<=0)
{  inkf.shift();  
}
}
```
### 6）其他
为了方便起见，每次都在画布外绘制黑色外框将作画区域框起来，另外添加了一个清屏按钮可以一次性清空屏幕。
## 三、总结
绘画一般是指在纸面上用笔做工具进行绘画，后来随着时代发展和科技进步又有了多种方式可以实现作画，绘画的材料不仅限于纸和笔，甚至人不用实际接触画布也可以实现作画。
但这些改变和传统绘画的定义严格来说无甚区别，不管是作画的过程还是最终的作品多是用一种静态的方式呈现的，缺乏动态性和交互性。然而随着计算机的蓬勃发展，让绘画动起来具备了更高的可能性，这于传统绘画方式而言是一个很大的创新。
新型的绘画系统除了力求继承传统绘画的优点如自由度高，变化丰富等特点外，还要充分发挥互联网时代独特的优势，拓展交互方式的多样性，使作品在某种程度上呈现出有别于传统静态画的动态性，丰富绘画的定义。
这次对创作新型绘画系统的尝试并不算多完善，实际上还存在着很多的缺陷，但这次实验使我对绘画的概念有了进一步的了解。这个新型的绘画系统的实现过程实质上都是由代码完成的，也正是代码的特点才能让其呈现出不同于传统绘画的一面。然而代码毕竟是死板的，变化和灵活度比起人的手绘相对更少些。未来为了更好地满足作画者的需求要注意更高地模拟真实地笔触笔压，给作画者更多的作画选择。
## 四、参考资料
1、https://blog.csdn.net/magicbrushlv/article/details/83858469
2、https://www.openprocessing.org/
3、http://p5js.org/
