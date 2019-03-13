
class Signature {

	constructor(){

		//update animation
		window.requestAnimFrame = ( (callback) => {
			return window.requestAnimationFrame || 
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimaitonFrame ||
				function (callback) {
			window.setTimeout(callback, 1000/60);
				};
		})();
		//style
		this.canvas = document.getElementById("sig-canvas");
		this.ctx = this.canvas.getContext("2d");
		this.ctx.strokeStyle = "#222222";
		this.ctx.lineWith = 2;
		this.sigText = document.getElementById("sig-dataUrl");
		this.sigImage = document.getElementById("sig-image");
		this.clearBtn = document.getElementById("sig-clearBtn");
		this.submitBtn = document.getElementById("sig-submitBtn");
		//clear
		this.clearBtn.addEventListener("click", ()=>{
			this.clearCanvas();
			this.sigText.innerHTML = "Data URL for your signature will go here!";
			this.sigImage.setAttribute("src", "");
		}, false);
		//save
		this.submitBtn.addEventListener("click", ()=> {
			this.dataUrl = this.canvas.toDataURL();
			this.sigText.innerHTML = this.dataUrl;
			this.sigImage.setAttribute("src", this.dataUrl);
		}, false);
	

		this.drawing = false;
		this.mousePos = { x:0, y:0 };
		this.lastPos = this.mousePos;

		this.canvas.addEventListener("mousedown", (e)=> {
		this.drawing = true;
			this.lastPos = this.getMousePos(e);
		}, false);
		this.canvas.addEventListener("mouseup", ()=>{
			this.drawing = false;
		}, false);
		this.canvas.addEventListener("mousemove", (e)=>{
			this.mousePos = this.getMousePos(e);
		}, false);

		this.canvas.addEventListener("touchstart", (e)=>{
			this.mousePos = this.getTouchPos(e);
		this.touch = e.touches[0];
		this.mouseEvent = new MouseEvent("mousedown", {
		clientX: this.touch.clientX,
		clientY: this.touch.clientY
		});
		this.canvas.dispatchEvent(this.mouseEvent);
		}, false);

		this.canvas.addEventListener("touchend", ()=>{
		this.mouseEvent = new MouseEvent("mouseup", {});
		this.canvas.dispatchEvent(this.mouseEvent);
		}, false);

		this.canvas.addEventListener("touchmove", (e)=>{
		this.touch = e.touches[0];
		this.mouseEvent = new MouseEvent("mousemove", {
		clientX: this.touch.clientX,
		clientY: this.touch.clientY
		});
		this.canvas.dispatchEvent(this.mouseEvent);
		}, false);

		//prevent scrolling
		document.body.addEventListener("touchstart", (e)=>{
			if (e.target == this.canvas) {
				e.preventDefault();
			}
			}, false);
			document.body.addEventListener("touchend",(e)=>{
			if (e.target == this.canvas) {
				e.preventDefault();
			}
			}, false);
			document.body.addEventListener("touchmove", (e)=>{
			if (e.target == this.canvas) {
				e.preventDefault();
			}
			}, false);
		
			this.dataUrl = this.canvas.toDataURL();

	}
	getMousePos(mouseEvent) {
		this.rect = this.canvas.getBoundingClientRect();
		return {
			x: mouseEvent.clientX - this.rect.left,
			y: mouseEvent.clientY - this.rect.top
		};
	}

	getTouchPos(touchEvent) {
		this.rect = this.canvas.getBoundingClientRect();
		return {
		x: touchEvent.touches[0].clientX - this.rect.left,
		y: touchEvent.touches[0].clientY - this.rect.top
		};
	}

	//drawing
	renderCanvas() {
		if (this.drawing) {
			this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
			this.ctx.lineTo(this.mousePos.x, this.mousePos.y);
			this.ctx.stroke(Signature);
			this.lastPos = this.mousePos;
		};
	}
	
	clearCanvas() {
			this.canvas.width = this.canvas.width;
	}

	drawLoop () {
		requestAnimFrame(drawLoop);
		renderCanvas();
	}
	
}
	
	var signature = new Signature()
	