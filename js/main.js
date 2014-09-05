
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
    
    var sphere = window.sphere = new THREE.Mesh(
        new THREE.SphereGeometry(
            50, //Radius
            16, //Segments 
            16  //Rings
        ),
        new THREE.MeshLambertMaterial(
            {
                color: 0xCC0000
    	    }
    	)
    );
    scene.add(sphere);
    
    var pointLight = window.pointLight = new THREE.PointLight(
        0xFFFFFF, //Colour
        2, //Intensity
        0 //Distance
    );
    pointLight.position.set(10, 50, 130);
    scene.add(pointLight);
    
    var pointLight2 = window.pointLight2 = new THREE.PointLight(
        0xFFFFFF, //Colour
        2, //Intensity
        0 //Distance
    );
    pointLight2.position.set(100, 100, -130);
    scene.add(pointLight2);
    
    var camera = window.camera = new THREE.PerspectiveCamera(
        45, //Viewing Angle 
        internalAspect, //Aspect Ratio 
        0.1, //Near 
        10000 //Far
    );
    camera.position.z = 300;
    scene.add(camera);
    
    window.keyControlled = camera;
    
    //Object for the actor
    window.actor = {};
    
    
    window.render();
    window.updateState = function(){
        
    }
    
};

window.render = function(){
    
	window.renderer.render(window.scene, window.camera);
	window.requestAnimationFrame(window.render);
};

/*
    UI
*/

window.onclick = function(e){
    
    //console.log(e);
};
window.onmousemove = function(e){
    
    //console.log(e);
};

window.onkeydown = function(e){
    
    //console.log(e.keyCode);
    //console.log(e.which);
    //console.log(e.resolveKeyCode());
    
    var temp = e.resolveKeyCode();
    var step = 5;
    
    if(temp=="W"){
        
        window.keyControlled.position.setZ(window.keyControlled.position.z - step);
    }
    else if(temp=="A"){
        
        window.keyControlled.position.setX(window.keyControlled.position.x - step);
    }
    else if(temp=="S"){
        
        window.keyControlled.position.setZ(window.keyControlled.position.z + step);
    }
    else if(temp=="D"){

        window.keyControlled.position.setX(window.keyControlled.position.x + step);
    }
};
window.onkeyup = function(e){
    
    //console.log(e);
};
window.onkeypress = function(e){
    
    //console.log(e);
};



window.onmouseup = function(e){
    
    //console.log(e);
};
window.onmouseenter = function(e){
    
    //console.log(e);
};
window.onmouseleave = function(e){
    
    //console.log(e);
};
window.onmousedown = function(e){
    
    //console.log(e);
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