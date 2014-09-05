
window.onload = function(){
    
    window.main();
};

window.onresize = function(e){
    
    //Each time the window is resized, update the aspect ratio of the canvas
    window.updateAspectRatio();
};

window.updateAspectRatio = function(){
    
    window.aspectRatio = window.innerWidth / window.innerHeight;
    window.widthReductionFactor = window.innerWidth / window.internalWidth;
    window.heightReductionFactor = window.innerHeight / window.internalHeight;

	//If the observed canvas ratio is < the conceptual canvas ratio
	if(window.aspectRatio < window.internalAspect){
	//Fix the width to the screen size & calculate the height based on the width
		
		window.canvas.style.width = (window.internalWidth * window.widthReductionFactor);
		window.canvas.style.height = (parseInt(window.canvas.style.width, 10) / window.internalAspect);
		window.canvas.style.left = "0px";
		window.canvas.style.top = ( window.innerHeight - parseInt(window.canvas.style.height, 10) ) / 2;
		
	}
	else{
	//Fix the height to the screen size & calculate the width based on the height
	
		window.canvas.style.height = (window.internalHeight * window.heightReductionFactor);
		window.canvas.style.width = (parseInt(window.canvas.style.height, 10) * window.internalAspect);
		window.canvas.style.top = "0px";
		window.canvas.style.left = ( window.innerWidth - parseInt(window.canvas.style.width, 10) ) / 2;
	}
};

window.main = function(){

    //For the sake of the IDE not complaining
    var THREE = window.THREE;
    
    //set the scene size
    var internalWidth = window.internalWidth = 1920;
    var internalHeight = window.internalHeight = 1080;
    var internalAspect = window.internalAspect = internalWidth / internalHeight;
    
    // create a WebGL renderer, camera and a scene
    var renderer = window.renderer = new THREE.WebGLRenderer();
    var scene = window.scene = new THREE.Scene();
    
    
    //start the renderer
    renderer.setSize(internalWidth, internalHeight);
    
    //Attach the render-supplied DOM element and style it
    window.canvas = document.body.appendChild(renderer.domElement);
    window.canvas.style.position = "absolute";
    document.body.style.backgroundColor = "#000000";
    
    //Set the aspect ratio
    window.updateAspectRatio();
    
    /*
        Three JS Things
    */
    
	//Setup initial Cube
    var cube = window.cube = new THREE.Mesh(
        new THREE.BoxGeometry(
			100,
			100,
			100
        ),
        new THREE.MeshLambertMaterial(
            {
                color: 0xCC0000
    	    }
    	)
    );
    scene.add(cube);
    
	
	//Setup initial light 1
    var pointLight = window.pointLight = new THREE.PointLight(
        0xFFFFFF, //Colour
        2, //Intensity
        0 //Distance
    );
    pointLight.position.set(10, 50, 130);
    scene.add(pointLight);
    
	
	//Setup Initial light 2
    var pointLight2 = window.pointLight2 = new THREE.PointLight(
        0xFFFFFF, //Colour
        2, //Intensity
        0 //Distance
    );
    pointLight2.position.set(100, 100, -130);
    scene.add(pointLight2);
    
	
	//Setup the camera
    var camera = window.camera = new THREE.PerspectiveCamera(
        70, //Viewing Angle 
        internalAspect, //Aspect Ratio 
        0.1, //Near 
        10000 //Far
    );
    camera.position.z = 300;
    scene.add(camera);
	
	window.UI = {
	
		viewDown : undefined,
	}
    
    //Object for the actor
    window.actor = {
	
		moveForward : function(step){
			
			window.camera.position.setZ(window.camera.position.z - step);
		},
		moveBackward : function(step){
		
			window.camera.position.setZ(window.camera.position.z + step);
		},
		moveLeft : function(step){
		
			window.camera.position.setX(window.camera.position.x - step);
		},
		moveRight : function(step){
		
			window.camera.position.setX(window.camera.position.x + step);
		},
		movingLeft : false,
		movingRight : false,
		movingForward : false,
		movingBackward : false,
		
		move : function(){
		
			//To be called on update
			if(this.movingForward){
				this.moveForward(2);
			}
			if(this.movingBackward){
				this.moveBackward(2);
			}
			if(this.movingLeft){
				this.moveLeft(2);
			}
			if(this.movingRight){
				this.moveRight(2);
			}
		},
	};
    
    //Set rendering in motion
    window.render();
    
	//Set update in motion
	window.updateFrequency = 10;
	window.setInterval(window.updateState, window.updateFrequency);
	
};

window.render = function(){
    
	window.renderer.render(window.scene, window.camera);
	window.requestAnimationFrame(window.render);
};

window.updateState = function(){
//To be called every x miliseconds to update the state of the world

	//Enable movement
	window.actor.move();
}

/*
    UI
*/

window.oncontextmenu = function(){
//Disable right click antics

	return false;
}

window.onclick = function(e){
    
    //console.log(e);
	e.preventDefault();
};
window.onmousemove = function(e){
    
    //console.log(e);
	if(e.which == 3){
		if(window.UI.viewDown != undefined){
		
			//window.camera.rotation.set(0, (window.UI.viewDown.x - e.x) / window.canvas.clientWidth, 0);
			window.camera.rotateX( (window.UI.viewDown.y - e.y) / window.canvas.clientHeight);
			window.camera.rotateY( (window.UI.viewDown.x - e.x) / window.canvas.clientWidth);
			window.UI.viewDown = e;
			//console.log((window.UI.viewDown.x - e.x) / window.canvas.clientWidth)
		}
		else{
			console.log("no viewDown")
		}
	}
};

window.onkeydown = function(e){
    
    //console.log(e.keyCode);
    //console.log(e.which);
    //console.log(e.resolveKeyCode());
    
    var temp = e.resolveKeyCode();

    if(temp=="W"){
		
        window.actor.movingForward = true;
    }
    else if(temp=="A"){
        
        window.actor.movingLeft = true;
    }
    else if(temp=="S"){
		
        window.actor.movingBackward = true;
    }
    else if(temp=="D"){
		
        window.actor.movingRight = true;
    }
};
window.onkeyup = function(e){
    
    var temp = e.resolveKeyCode();
    //console.log(e);
	
    if(temp=="W"){
		
        window.actor.movingForward = false;
    }
    else if(temp=="A"){
        
        window.actor.movingLeft = false;
    }
    else if(temp=="S"){
		
        window.actor.movingBackward = false;
    }
    else if(temp=="D"){
		
        window.actor.movingRight = false;
    }
};
window.onkeypress = function(e){
    
};



window.onmouseenter = function(e){
    
    //console.log(e);
};
window.onmouseleave = function(e){
    
    //console.log(e);
};
window.onmousedown = function(e){
    
    //console.log(e.which);
	if(e.which == 3){
		window.UI.viewDown = e;
	}
};
window.onmouseup = function(e){
    
    //console.log(e);
	if(e.which == 3){
		window.UI.viewDown = undefined;
	}
};

KeyboardEvent.prototype.resolveKeyCode = function(){
	
	switch(this.keyCode){
	
		case 81 : return "Q";
		case 87 : return "W";
		case 69 : return "E";
		case 82 : return "R";
		case 84 : return "T";
		case 89 : return "Y";
		case 85 : return "U";
		case 73 : return "I";
		case 79 : return "O";
		case 80 : return "P";
		case 65 : return "A";
		case 83 : return "S";
		case 68 : return "D";
		case 70 : return "F";
		case 71 : return "G";
		case 72 : return "H";
		case 74 : return "J";
		case 75 : return "K";
		case 76 : return "L";
		case 90 : return "Z";
		case 88 : return "X";
		case 67 : return "C";
		case 86 : return "V";
		case 66 : return "B";
		case 78 : return "N";
		case 77 : return "M";
		default : return undefined;
	}
};