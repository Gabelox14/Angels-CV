let typedTextOptions = {
    strings: ['data anlisys.','visualizations.','data models.','designs.','changes.',"solutions."],
    typeSpeed: 120,
    backSpeed: 90,
    loop: true
}
let typedTextInstance = new Typed('.ideas',typedTextOptions);
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
});
let carouselOptions = {
    onCycleTo: null,
    enableTouch: false,
    numVisible: 3
}
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, carouselOptions);    
});
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems);
  });
let scrollspyOptions = {
    
}
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.scrollspy');
    var instances = M.ScrollSpy.init(elems, scrollspyOptions);
});

function sendMail(){
    let firstname = document.getElementById("first_name").value;
    let lastname = document.getElementById("last_name").value;
    let mail = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let errorDisplay = document.getElementById("error");
    let processDisplay = document.getElementById("process");
    let sendBtn = document.getElementById("submitBtn");
    sendBtn.classList.add("disabled");
    errorDisplay.innerHTML = "";
    processDisplay.innerHTML = "Sending..."
    let body = {
        firstname: firstname,
        lastname: lastname,
        mail: mail,
        message: message
    }
    if((firstname=='')||(lastname=='')||(mail=='')||(message=='')){
        errorDisplay.innerHTML = 'Fill out everything, I need to get the information right! ;)'
        processDisplay.innerHTML = "";
        sendBtn.classList.remove("disabled");
        return;
    }
    if(validateEmail(mail)){
        errorDisplay.innerHTML = "";
        fetch("https://us-central1-gabelox14.cloudfunctions.net/app/sendMail",{
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(){
            errorDisplay.innerHTML = "";
            processDisplay.innerHTML = "Done, I'll keep in touch."
        }).catch(function(err){
            errorDisplay.innerHTML  = "Something went wrong... try later."
            processDisplay.innerHTML = ""
            sendBtn.classList.remove("disabled");
        });
    }else {
        errorDisplay.innerHTML  = "Your mail is invalid..."
        processDisplay.innerHTML = ""
        sendBtn.classList.remove("disabled");
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


