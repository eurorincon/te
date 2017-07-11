
document.write('<style>.crtls-wrapper{font-family: helvetica; position: fixed; bottom:5px; right: 5px; display: block; width: 400px; height: 200px; background-color: rgba(200, 200, 200, 0.5); padding: 10px; border-radius: 7px; box-shadow: 2px 2px 3px rgba(20, 20, 20, 0.5); border: 1px solid #999;}.crtls-wrapper button{color:grey; background-color: #fff; border-radius:6px; overflow:hidden; border: none; cursor:pointer;}.crtls-wrapper button:hover{color:green; background-color: lightgreen;}.timers{text-align: center; margin-bottom: 20px; background-color: #fff; padding: 5px; border-radius:6px;}#time{/* width: 60px; height: 30px; */}#play{width: 60px; height: 30px; margin-left: 20px}#pause{width: 70px; height: 30px;}#reverse{width: 70px; height: 30px;}#resume{width: 70px; height: 30px;}#restart{width: 70px; height: 30px;}#slider{margin-top: 10px;height: 10px;}#go-to{margin-top: 10px; margin-left: auto; margin-right: auto; display: block; width: 80px; text-align: center;}input[type=submit]:hover{background-color: green;}.goto{text-align:center; margin: 10px auto 0; padding: 3px; display: block; border: 1px solid grey; color: grey; border-radius:6px; width: 150px; &:hover{background-color: lightgreen; border:1px solid green; color:green;}}</style><div class="crtls-wrapper" id="draggable"> <div class="timers">time: <span id="time">1</span>s / progress: <span id="totalDuration">1</span></div><button id="play">PLAY</button> <button id="pause">PAUSE</button> <button id="reverse">REVERSE</button> <button id="resume">RESUME</button> <button id="restart">RESTART</button> <div id="slider"></div><input type="text" id="go-to"class="counter" placeholder="segundos"> <span class="goto">GO TO</span></div>');

$(document).ready(function() {

    $("#go-to").on('change', function() {
        tl.seek($(this).val());
        tl.stop();
        var calcTime = (tl.time() * 100) / tl.duration();
        $("#slider").slider("value", calcTime);
    });

    $("#play").click(function() {
        tl.play();
    });

    $("#pause").click(function() {
        tl.pause();
    });

    $("#reverse").click(function() {
        tl.reverse();
    });

    $("#resume").click(function() {
        tl.resume();
    });

    $("#restart").click(function() {
        tl.restart();
    });

    //when the timeline updates, call the updateSlider function
    tl.eventCallback("onUpdate", updateSlider);
    tl.eventCallback("onStart", updateDuration);

    var totalDuration = document.getElementById("totalDuration"),
        time = document.getElementById("time");
    
    $("#slider").slider({
        range: false,
        min: 0,
        max: 100,
        step: .1,
        slide: function(event, ui) {
            tl.pause();
            //adjust the timeline's progress() based on slider value
            tl.progress(ui.value / 100);
        }
    });
    function updateSlider() {
        $("#slider").slider("value", tl.progress() * 100);
        time.innerHTML = tl.time().toFixed(2);
    }
    function updateDuration() {     
        totalDuration.innerHTML = tl.totalDuration().toFixed(2);
    }
    $( function() {
        $( "#draggable" ).draggable();
    } );
    tl.progress(0)
});
