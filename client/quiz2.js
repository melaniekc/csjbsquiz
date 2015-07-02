
var drawContext;

function Marker(x,y){
	this.x=x;
	this.y=y;
	this.r=10;
	this.c="black";
	this.drawing=false;
}

Marker.prototype.update = function(){
	this.x = e.pageX - canvas.offsetLeft;
	this.y = e.pageY - canvas.offsetTop;
	$("#position").html("position = ("+this.x+","+this.y+")");
}

function drawingBoard(){
	this.w=500;
	this.h=500;
	this.marker=new Marker(0,0);
}

board = new drawingBoard();

Template.quiz2.rendered = function (){ 
	console.log("draw canvas");
	drawContext = canvas.getContext("2d");
	drawContext.fillStyle="yellow";
	drawContext.fillRect(0,0,canvas.width,canvas.height);
};

Template.quiz2.events({
	"click #erase": function(event){
		drawContext.clearRect(0,0,board.w,board.h);
		drawContext.fillStyle="yellow";
		drawContext.fillRect(0,0,500,500);
	}
});

marker = board.marker;

Template.quiz2.rendered = function(){
	document.getElementById("canvas").addEventListener("mousedown", 
		function(e){
			marker.update();
    		marker.drawing=true;
    		addClick(marker.x,marker.y);
    		draw();
		}
	)
};
Template.quiz2.rendered = function(){
	document.getElementById("canvas").addEventListener("mousemove", 
		function(e){
			if(marker.drawing){
				marker.update();
	    		addClick(marker.x,marker.y,true);
	    		draw();
	  		}
		}
	)
};
Template.quiz2.rendered = function(){
	document.getElementById("canvas").addEventListener("mouseup", 
		function(e){
			marker.drawing=false;
		}
	)
};

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();

function addClick(x,y,dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function draw(){
	console.log("drawing");
  drawContext.clearRect(0,0,500,500);
  drawContext.fillStyle="yellow";
  drawContext.fillRect(0,0,500,500);
  
  drawContext.strokeStyle = marker.c;
  drawContext.lineWidth = marker.r;
			
  for(var i=0; i < clickX.length; i++) {		
    drawContext.beginPath();
    if(clickDrag[i] && i) {
      drawContext.moveTo(clickX[i-1], clickY[i-1]);
     } else {
       drawContext.moveTo(clickX[i]-1, clickY[i]);
     }
     drawContext.lineTo(clickX[i], clickY[i]);
     drawContext.closePath();
     drawContext.stroke();
  }
};