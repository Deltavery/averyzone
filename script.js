let bouncer_object = document.getElementById("bouncer");
let bouncer_position = [500, 500];
let bouncer_velocity = [0,0];
let bouncer_offset = [142, 48];
let lower_bounds = [100,100];
let upper_bounds = [window.innerWidth - 100, window.innerHeight - 100];

let most_recent_mouse_pos = [0,0];

window.onload = function() {  
    
    // runs this function every time the mouse moves, up to 10 times a second
    addEventListener("mousemove", on_mouse_move);

    // runs this function 10 times a second
    setInterval(physics_update, 10);
}

function physics_update(){

    console.log("haha");
    console.log(bouncer_velocity);
    console.log(bouncer_position);

    // 0=x, 1=y
    for (let axis of [0,1]){

        // applies free movement, including friction
        bouncer_position[axis] += bouncer_velocity[axis];
        bouncer_velocity[axis] /= 2;

        // prevents going off the side of the screen, bounces
        if (bouncer_position[axis] < lower_bounds[axis]){
            bouncer_position[axis] = lower_bounds[axis] - (bouncer_position[axis] - lower_bounds[axis]);
            bouncer_velocity[axis] *= -1;
        }
        if (bouncer_position[axis] > upper_bounds[axis]){
            bouncer_position[axis] = upper_bounds[axis] - (bouncer_position[axis] - upper_bounds[axis]);
            bouncer_velocity[axis] *= -1;

        }

        // mouse effect on bouncer
        let displacement = bouncer_position[axis] - most_recent_mouse_pos[axis];
        let strength = Math.sqrt(1 / (displacement**2)) * 10;
        let velocity_to_add = displacement * strength;
        bouncer_velocity[axis] += velocity_to_add;
    }

    // update actual position of bouncer
    bouncer_object.style.left = String(bouncer_position[0] - bouncer_offset[0]) + "px";
    bouncer_object.style.top = String(bouncer_position[1] - bouncer_offset[1]) + "px" ;

}


function on_mouse_move(event) {

    // awesome trail
    let newBall = document.createElement("div");
    newBall.className = "ball";
    newBall.style.top = String(event.clientY) + "px";
    newBall.style.left = String(event.clientX) + "px";
    document.body.appendChild(newBall);

    // tracking position for the bouncer
    most_recent_mouse_pos[0] = event.clientX;
    most_recent_mouse_pos[1] = event.clientY;
}


