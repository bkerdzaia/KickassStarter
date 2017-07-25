

class Server {
    sendRequest(url, resultFn) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                resultFn(request.responseText);
//            resultFn(JSON.parse(request.responseText));
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

var files = {
    explore: ["explore-del.mustache", "project_list.mustache"]
};

var contents = {};

function updateContent(filename, onLoadFn) {
    if (contents[filename]) {
        onLoadFn(contents[filename].page);
        return;
    }
    server.sendRequest(filename, (data) => {
        contents[filename] = { page: data };
        onLoadFn(data);
    });
}


router
    .on({
        'profile': function() {
            updateContent("profile.html", function(data) {
                setContent(data);
            });
        },
        'explore': function() {
            updateContent(files.explore[0], function(data) {

                updateContent(files.explore[1], (projectListTempl)=> {
                        sendRequest("/projectsList", function(view) {
                            contents[files.explore[0]].data = view;
                            setContent(Mustache.render(data, view, {
                                project_list: projectListTempl
                            }));
                            exploreFn();
                        });
                });
            });
        },
        'login': function() {
            updateContent("login.html", function(data) {
                setContent(data);
            });
        },
        'signup': function() {
            updateContent("signup.html", function(data) {
                setContent(data);
            });
        },
        'startproject': function() {
            updateContent("startproject.html", function(data) {
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
