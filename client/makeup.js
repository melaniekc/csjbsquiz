var drawContext;
var drawing=false;
var newLine=true;
var startX; var startY;
var newX; var newY;
var firstX; var firstY;
var storedLines=[];
var stopDrawing=false;

Template.makeup.rendered = function (){ 
	console.log("draw canvas");
	drawContext = canvas.getContext("2d");
	drawContext.fillStyle="gray";
	drawContext.fillRect(0,0,canvas.width,canvas.height);

	if (storedLines.length==0){
		drawFirstTriangle();
	} else {
		redrawStoredLines();
	}
};

Template.makeup.events({
	"click #erase": function(event){
		console.log("erase polygon");
		redrawCanvas();
		storedLines=[];
		drawing=false;
	},
	"click #draw": function(event){

		// reset
		stopDrawing=false;
		newLine=true;
		startX=undefined; startY=undefined;
		newX=undefined; newY=undefined;
		firstX=undefined; firstY=undefined;
		console.log("drawing");
		drawPoly();
	}
});

function drawFirstTriangle(){
	drawContext.beginPath();
	drawContext.moveTo(160,400);
	drawContext.lineTo(80,150);
	drawContext.lineTo(250,230);
	drawContext.lineTo(160,400);
	drawContext.strokeStyle="green";
	drawContext.stroke();
	drawContext.closePath();
}

function redrawCanvas(){
	drawContext.clearRect(0,0,canvas.width,canvas.height);
	drawContext.fillStyle="gray";
	drawContext.fillRect(0,0,canvas.width,canvas.height);
}

function drawPoly(){
	var canvas = document.getElementById("canvas");
	canvas.addEventListener("mousemove", 
		function(e){
			if(stopDrawing){
				redrawStoredLines();
				drawing=false;
				return;
			}
			if(drawing){
				console.log("drawing polygon");

				redrawStoredLines();

				drawContext.beginPath();
				drawContext.moveTo(startX,startY);
				newX = e.pageX - canvas.offsetLeft;
				newY = e.pageY - canvas.offsetTop;
		    	drawContext.lineTo(newX,newY);
		    	drawContext.strokeStyle="yellow";
		    	drawContext.stroke();
		    	drawContext.closePath();
		    }
		}
	);

	canvas.addEventListener("mousedown",
		function(e){
			redrawStoredLines();
			if(stopDrawing){
				drawing=false;
				return;
			}
			if(newLine){
				drawing=true;
				startX = e.pageX - canvas.offsetLeft;
		    	startY = e.pageY - canvas.offsetTop;
		    	newLine=false;
		    } else {
		    	drawing=false;
		    	if (!stopDrawing) storedLines.push({x1:startX, y1:startY, x2:newX, y2:newY});
		    	startX=newX;
		    	startY=newY;
		    }

		    // Check whether polygon is complete
		    if (storedLines.length>0){
				firstX=storedLines[0].x1;
				firstY=storedLines[0].y1;
				// if the line ends less than 10 px from the starting point
				stopDrawing=((Math.abs(firstX-startX))<=10 && (Math.abs(firstY-startY))<=10);
			}
		}
	);
	canvas.addEventListener("mouseup",
		function(e){
			if(stopDrawing){
				drawing=false;
				return;
			}
   			drawing=true;
		}
	);
}

 function redrawStoredLines(){

        if (drawing){
        	// clear canvas 
        	redrawCanvas();

	        // redraw each stored line
	        for(var i=0;i<storedLines.length;i++){
	        	console.log("drawing old line");
	            drawContext.beginPath();
	            drawContext.moveTo(storedLines[i].x1,storedLines[i].y1);
	            drawContext.lineTo(storedLines[i].x2,storedLines[i].y2);
	            drawContext.strokeStyle="green";
	            drawContext.stroke();
	            drawContext.closePath();
	        }
	    }
    }