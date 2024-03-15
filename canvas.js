var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//we can draw Rectangles, Lines, Arcs, Bezier Curves, Images, Text


//Rectangles
//c.fillStyle = 'rgba(79,27,83,1)'
//c.fillRect(100, 200, 100, 100);
//c.fillStyle = 'rgba(79,27,53,1)'
//c.fillRect(300, 200, 100, 100);
//c.fillStyle = 'rgba(79,137,83,1)'
//c.fillRect(300, 400, 100, 100);
console.log(canvas)

//Line
//c.beginPath();
//c.moveTo(50,300)
//c.lineTo(300,100);
//c.strokeStyle = '#729847';
//c.stroke();

//arc
//c.beginPath();
//c.arc(500, 300, 30, 0, Math.PI * 2, true);
//c.stroke();

//for(var i = 0; i < 30; i++) {
	//var x = Math.random() * window.innerWidth;
	//var y = Math.random() * window.innerHeight;
	//c.beginPath();
	//c.arc(x,y, 30, 0, Math.PI * 2, true);
	//c.strokeStyle = 'red';
	//c.stroke();
//}

//var x = Math.random() * innerWidth;
//var dx = (Math.random() - 0.5) * 100;
//var radius = 30;
//var y = Math.random() * innerHeight;
//var dy = (Math.random() - 0.5) * 100;

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;

var colorArray = [
	'#325da7',
	'#f68c06',
	'#f7f7f7',
	'#ffffff',
	'#181818'
];

window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
})

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
})

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.minRadius = radius;
	this.radius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function() {
		if( (this.x+this.radius) >= innerWidth || (this.x-this.radius) <= 0){
			this.dx=-this.dx;
		}
		if( (this.y+this.radius) >= innerHeight || (this.y-this.radius) <= 0){
			this.dy=-this.dy;
		}
	
		this.x+=this.dx;
		this.y+=this.dy;

		//interactivity
		if (mouse.x - this.x < 50 
			&& mouse.x - this.x > -50
			&& mouse.y - this.y < 50
			&& mouse.y - this.y > -50) {
			if(this.radius < maxRadius){
				this.radius += 1;
			}
		}
		else if(this.radius > this.minRadius) {
			this.radius -= 1
		}
		
		this.draw();
	}
}

var circleArray = [];

for(var i = 0; i < 1000; i++) {
	var radius = (Math.random() * 3) + 1 ;
	var x = Math.random() * (innerWidth - (radius * 2)) + radius;
	var dx = (Math.random() - 0.5) * 5;
	var y = Math.random() * (innerHeight - (radius * 2)) + radius;
	var dy = (Math.random() - 0.5) * 5;
	
	circleArray.push(new Circle(x,y,dx,dy,radius));
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0, innerWidth, innerHeight);
	
	for(var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}


animate();