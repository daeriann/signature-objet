class Signature {
    
    constructor(){
        this.canvas = document.getElementById("sig-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = "#2222222";
        this.ctx.lineWith = 2;
        this.sigText = document.getElementById("sig-dataUrl")
        this.sigImage = document.getElementById("sig-image")
        this.clearBtn = document.getElementById("sig-clearBtn")
        this.submitBtn = document.getElementById("sig-submitBtn")
        this.drawing = false;
        this.mousePos = {x:0,y:0};
        this.lastPos = this.mousePos;

        this.addListeners();
        this.addAnimationFrame();
        this.drawloop();
    }

    addListeners = () => {
        //Clear Button
        this.clearBtn.addEventListener("click",() =>{
            this.clearCanvas();
            this.sigText.innerHTML = "Data URL for your signature will go here!"
            this.sigImage.setAttribute("src","")
        },false);
        //Submit Button
        this.submitBtn.addEventListener("click",() =>{
            let dataUrl = this.canvas.toDataURL();
            this.sigText.innerHTML = this.dataURL
            this.sigImage.setAttribute("src", dataUrl)
        },false);

        //Canvas Events
        // Mouse Down
        this.canvas.addEventListener("mousedown",(e) =>{
            this.drawing = true;
            this.lastPos = this.getMousePos(this.canvas, e);
        },false);
        // Mouse up
        this.canvas.addEventListener("mouseup",() => {
            this.drawing = false;
        },false);
        // Mouse Move
        this.canvas.addEventListener("mousemove",(e) => {
            this.mousePos = this.getMousePos(this.canvas, e);
        },false);
        // Touch Start
        this.canvas.addEventListener("touchstart", (e)=> {
		this.mousePos = this.getTouchPos(e);
		this.touch = e.touches[0];
		this.mouseEvent = new MouseEvent("mousedown", {
		clientX: this.touch.clientX,
		clientY: this.touch.clientY
		});
		this.canvas.dispatchEvent(this.mouseEvent);
		}, false);
        //Touch End
		this.canvas.addEventListener("touchend", ()=>{
		this.mouseEvent = new MouseEvent("mouseup", {});
		this.canvas.dispatchEvent(this.mouseEvent);
		}, false);
        // Touch Move
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
		

    }

    renderCanvas = () => {
    if (this.drawing) {
        this.ctx.moveTo(this.lastPos.x,this.lastPos.y);
        this.ctx.lineTo(this.mousePos.x,this.mousePos.y);
        this.ctx.stroke();
        this.lastPos = this.mousePos;
        }
    }
    clearCanvas = () => {
        this.canvas.width = this.canvas.width;
    }
    getMousePos = (canvasDom, mouseEvent) => {
        let rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        };
    }
    getTouchPos = (canvasDom,touchEvent) => {
        let rect = canvasDom.getBoundingClientRect();
        return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
        };
    }
    addAnimationFrame = () => {
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
    }
    drawloop = () => {
        requestAnimFrame(this.drawloop);
        this.renderCanvas();
    };
}

let sign = new Signature();
