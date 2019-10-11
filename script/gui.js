var _color=0;
var _size=128;
var mountainNum=3;
var mountainTall=400;
var type=['free','mountain_silk','ink'];
var brushType = ['circle', 'tree','eraser','pen'];
var mountain_Mode =['default','user_defined'];
var mountain_index=['1','2','3','4','5'];
var shade=0;
var SilkRibbon=false;
var silkcolor='#000000';
var inkcolor=0;
var inklife=50;
var ink_Mode=['user_defined','straight','curve'];

function InitGUI()
{
	var gui=createGui('Mode',1,height+1);
	gui.addGlobals('type');	
	var gui = createGui('Brush(free)', 200,height+1);
	sliderRange(0, 255, 1);
	gui.addGlobals('brushType','_color','_size');
	var gui = createGui('Moutain(mountain_silk)', 400,height+1);
	sliderRange(0, 5, 1);
	gui.addGlobals('mountain_Mode','mountain_index','mountainNum');
	sliderRange(0, canvas_height, 1);
	gui.addGlobals('mountainTall');
	sliderRange(0, 1, 0.1);
	gui.addGlobals('shade');
	var gui = createGui('Silk(mountain_silk)', 600,height+1);
	gui.addGlobals('SilkRibbon','silkcolor');
	var gui = createGui('Ink(ink)', 800,height+1);
	sliderRange(0, 255, 1);
	gui.addGlobals('ink_Mode','inkcolor');		
	sliderRange(20, 100, 1);
	gui.addGlobals('inklife');	
}