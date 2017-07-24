

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
var Mustache;

router
    .on({
        'startproject': function() {
            server.sendRequest("startproject.html", function(data) {
                setContent(data);
            });
        },
        'profile': function() {
            server.sendRequest("profile.html", function(data) {
                setContent(data);
            });
        },
        'explore': function() {
            server.sendRequest("explore-del.html", function(data) {

                server.sendRequest("/projectsList", function(view) {
                    setContent(Mustache.render(data, view));
                });
            });
        },
        'login': function() {
            server.sendRequest("login.html", function(data) {
                setContent(data);
            });
        },
        'profsettings': function() {
            server.sendRequest("profile-settings.html", function(data) {
                setContent(data);
            });
        },
        'signup': function() {
            server.sendRequest("signup.html", function(data) {
                setContent(data);
            });
        },
        'project': function() {
            server.sendRequest("project.html", function(data) {
                setContent(data);
            });
        },

        '*': function() {
            console.log('disp home');
            display('home');
        }
    });

router.resolve();


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
                    <button class="button" onclick="plusDivs(1)"><span>Next </span></button>
                </div>
                </div>

                <div class="border"></div>


                <div class="mfunded">
                    <a><h1>Invested & Started Businesses</h1></a>
                    <div class="project_main">
                        <a href="project" data-navigo><h3>Project Description & Title & ...</h3></a>
                        <a>
                            <img src="./images/proj1.jpg">
                        </a>
                        <p>This SHit is project description</p>
                    </div>
                    <div class="project_main">
                        <a href="project" data-navigo><h3>Project Description & Title & ...</h3></a>
                        <a>
                            <img src="./images/proj1.jpg">
                        </a>
                        <p>This SHit is project description</p>
                    </div>
                    </div><div class="project_main">
                        <a href="project" data-navigo><h3>Project Description & Title & ...</h3></a>
                        <a>
                            <img src="./images/proj1.jpg">
                        </a>
                        <p>This SHit is project description</p>
                    </div>
                </div>
            </div>

            <div class="border" style="float: left"></div>`);
    }
}
