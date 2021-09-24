var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = " ";
    recognition.start();
}
recognition.onresult = function(event){
    console.log(event);

    var Content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = Content;
    console.log(Content);
    if(Content == "take my selfie") {
        console.log("taking selfie...")
        speak();
    }

}
function speak() {
    var synth = window.speechSynthesis;
    speak_data = "Taking selfie in 5 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attatch(camera);
    setTimeout(function() {
        take_snapshot();
        save();
    }, 5000);
}
camera = document.getElementById("camera");
Webcam.set({
    width:360,
    height:250,
    image_format:'png',
    png_quality:90
});

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'"/>';
    });
}
function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}
console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/BLPP8oW_T/', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function check() 
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}