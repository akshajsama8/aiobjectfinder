status_ = ""
objects = [];

function preload(){
    video = createCapture();
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}


function draw(){
    image(video, 0, 0, 480, 380);
    if (status_ != ""){
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerText = "Status: Object(s) are detected";
            fill("#2BE8B8"); 
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            nofill();
            stroke("#2BE8B8");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    object_name = document.getElementById("object_input").value;
    if (object_name != ""){
        console.log(object_name);
        objectDetector = ml5.objectDetector('cocoSSD', modelLoaded);
        document.getElementById('status').innerText = "Status: Detecting Object(s)";
    }
}

function modelLoaded(){
    console.log("Model is Loaded");
    console.log(object_name)
    status_ = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error, results){
    if (error){
        console.log("Error");
    }
    else{
        console.log(results);
        objects = results;
        if (objects[i].label == object_name){
            document.getElementById("number").innerText = "Object Found!"
        }
    }
}