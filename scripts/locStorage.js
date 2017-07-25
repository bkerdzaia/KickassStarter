function sendId(id) {
    server.sendJSONRequest('profile', {"userId": id}, function(usr) {
        document.getElementById("um_login").innerHTML = "Profile Settings";
        document.getElementById("um_login").href = "profsettings";
        document.getElementById("um_sign").innerHTML = "Logout";
        document.getElementById("um_sign").href = "logout";
        document.getElementById("myprofile").innerHTML = "My Profile";
        document.getElementById("myprofile").href = "profile";
    });
}

if (!localStorage.getItem("userId")) {
    console.log('fsddf');
    server.sendRequest('/userId', function(res) {
        if (!res) {
            return;
        }
        console.log('res',res);
        localStorage.setItem("userId", res);
        sendId(res);
    });
} else {
    sendId(localStorage.getItem("userId"));
}
