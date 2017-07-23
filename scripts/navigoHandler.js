

class Server {
    sendRequest(url, resultFn) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            // Success!
              resultFn(request.responseText);
//            resultFn(JSON.parse(request.responseText));
          } else {
            // We reached our target server, but it returned an error

          }
        };

        request.onerror = function() {
          // There was a connection error of some sort
        };

        request.send();
    }
}

var router = new Navigo(null, true);
var server = new Server();

router
    .on({
        'profile': function() {
            server.sendRequest("profile.html", function(data) {
                setContent(data);
            });
        },
        'explore': function() {
            server.sendRequest("explore.html", function(data) {
                setContent(data);
            });
        },
        'login': function() {
            server.sendRequest("login.html", function(data) {
                setContent(data);
            });
        },
        'signup': function() {
            server.sendRequest("signup.html", function(data) {
                setContent(data);
            });
        },
        'lstartproject': function() {
            server.sendRequest("lstartproject.html", function(data) {
                setContent(data);
            });
        },
        '*': function() {
            display('home');
        }
    })
    .resolve();

function setContent(contentHtml) {
    var displayContent = document.getElementById('content');
    displayContent.innerHTML = contentHtml;
}

function display(path) {
    if (path === 'home') {
        setContent(`
            <div class="picSliderFrame">
                <div class = "picSFImgs">
                    <img class="mySlides" src="./images/sl3.jpg" style="display:block;">
                    <img class="mySlides" src="./images/sl1.jpg" style="display:none;">
                    <img class="mySlides" src="./images/sl2.jpg" style="display:none;">
                </div>

                <div class="center">
                    <a class="prevNextButton" onclick="plusDivs(-1)"> Prev</a>
                    <a class="prevNextButton" onclick="plusDivs(1)">Next </a>
                </div>
                </div>

                <div class="border"></div>

                <div class="mfunded">
                <a><h3>Invested & Started Businesses</h3></a>
                <a>
                    <img src="./images/proj1.jpg" style="float:left">
                </a>
                <div>
                    <h3>Project Description & Title & ...</h3>
                    <p>This SHit is project description</p>
                </div>
            </div>

            <div class="border" style="float: left"></div>`);
    }
}
