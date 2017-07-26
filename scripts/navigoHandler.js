
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

    sendJSONRequest(url, data, resultFn) {
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader("Content-Type", "application/json");

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

        request.send(JSON.stringify(data));
    }
}

var router = new Navigo(null, true);
var server = new Server();
var Mustache;

var files = {
    explore: ["explore.mustache", "project_list.mustache"]
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
        'profile/:id': function(params) {
            updateContent("./htmls/profile.html", function(data) {

                console.log(params.id);
                server.sendJSONRequest('profile', {"userId": params.id}, function(user){
                    console.log('prof:',user);
                    setContent(data);
                    projectpage(user);
                });
            });
        },
        'explore': function() {
            updateContent(files.explore[0], function(data) {
                updateContent(files.explore[1], (projectListTempl)=> {
                        server.sendRequest("/projectsList", function(view) {
                            contents[files.explore[0]].data = view;
                            console.log(view);
                            setContent(Mustache.render(data, view, {
                                project_list: projectListTempl
                            }));
                            exploreFn();
                        });
                });
            });
        },
        'login': function() {
            updateContent("./htmls/login.html", function(data) {
                setContent(data);
            });
        },
        'signup': function() {
            updateContent("./htmls/signup.html", function(data) {
                setContent(data);
            });
        },
        'startproject': function() {
            updateContent("./htmls/startproject.html", function(data) {
                setContent(data);
                startProjectFn();
            });
        },
        'profsettings': function() {
            updateContent("./htmls/profile-settings.html", function(data) {
                setContent(data);
                profileSettingsFn();
            });
        },
        'project': function() {
            updateContent("./htmls/project.html", function(data) {
                setContent(data);
                projectpage(data);
            });
        },
        '*': function() {
            updateContent("./htmls/home.html", function(data) {
                setContent(data);
            });
        }
    });

router.resolve();

function setContent(contentHtml) {
    var displayContent = document.getElementById('content');
    displayContent.innerHTML = contentHtml;
}
