function init() {
    draw();
    // console.log(orbs);
}

// *********** Drawing *********
player.locX = Math.floor(500*Math.random() + 10)
player.locY = Math.floor(500*Math.random() + 10)

function draw() {

    // wipe out entire canvas whenever draw is called so that we can start over.
    // clear the screen off so that old stuff is gone from last frame
    
    context.setTransform(1, 0, 0, 1, 0, 0);

    context.clearRect(0,0,canvas.width,canvas.height)

    // clamp the camera to the player
    const camX = -player.locX + canvas.width/2; // distance to move in horizontal direction
    const camY = -player.locY + canvas.height/2; // distance to move in vertical direction
    // translate allows us to move the canvas around
    context.translate(camX, camY);

    context.beginPath()
    context.fillStyle = "rgb(255,0,0)" // fill with red color
    // arg 1,2 are x,y of center of the arc
    // arg 3 is radius of the circle 
    // arg 4 is the angle where to start on the circle in radians, 0 = 3 o'clock
    // arg 5 where to stop in radians
    // context.arc(player.locX, player.locY, 10, 0, Math.PI*2) // to create a circle
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "rgb(0,255,0)";
    context.stroke();

    orbs.forEach((orb) => {
        context.beginPath();
        context.fillStyle = orb.color;
        context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI*2)
        context.fill();
    })

    requestAnimationFrame(draw) // recursively call the draw function forever
}

canvas.addEventListener('mousemove',(event)=>{
    console.log(event)
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    if(angleDeg >= 0 && angleDeg < 90){
        console.log('Mouse is in the lower right quadrant');
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
    }else if(angleDeg >= 90 && angleDeg <= 180){
        console.log('mouse is in the lower left quadrant');
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
    }else if(angleDeg >= -180 && angleDeg < -90){
        console.log('mouse is in the upper left quadrant');
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
    }else if(angleDeg < 0 && angleDeg >= -90){
        console.log('mouse is in the upper right quadrant');
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
    }

    speed = 10
    xV = xVector;
    yV = yVector;

    if((player.locX < 5 && player.xVector < 0) || (player.locX > 500) && (xV > 0)){
        player.locY -= speed * yV;
    }else if((player.locY < 5 && yV > 0) || (player.locY > 500) && (yV < 0)){
        player.locX += speed * xV;
    }else{
        player.locX += speed * xV;
        player.locY -= speed * yV;
    }    
})