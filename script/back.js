function back()
{
    noStroke();
    fill(0);
    rect(0,0,200,canvas_height);
    rect(canvas_width-200,0,200,canvas_height);  
    rect(0,0,canvas_width,100);  
    rect(0,canvas_height-100,canvas_width,100);
    fill(255);
    if(mouseX<140&&mouseX>80&&mouseY>100&&mouseY<130){
        fill(200);
    }
    rect(80,100,60,30);
    fill(0);
    textSize(15);
    textAlign(CENTER);
    text('reset', 110, 115);     
}