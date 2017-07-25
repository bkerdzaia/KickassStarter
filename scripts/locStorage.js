function sendId(id) {
    server.sendJSONRequest('profile', {"userId": id}, function(usr) {
        document.getElementById("um_login").innerHTML = "Profile Settings";
        document.getElementById("um_login").href = "profsettings";
        document.getElementById("um_sign").innerHTML = "Logout";
        document.getElementById("um_sign").href = "logout";
        document.getElementById("um_sign").addEventListener('click', function(event){
            server.sendRequest('logout', function(res){});
            document.getElementById('umenu').innerHTML = `

                <a href="#">
                    <img src="./images/kaslogo.png">
                </a>
                <a href="#">
                    Home
                </a>
                <a href="#/explore">
                    Explore
                </a>
                <a id="um_login" href="login" data-navigo>
                    Login
                </a>
                <a id="um_sign" href="signup" data-navigo>
                    Sign Up
                </a>

            `;
            localStorage.removeItem('userId');
            router.navigate('');
        });
        document.getElementById("myprofile").innerHTML = "My Profile";
        document.getElementById("myprofile").href = "profile";
    });
}

if (!localStorage.getItem("userId")) {
    server.sendRequest('/userId', function(res) {
        if (!res) {
            return;
        }
        localStorage.setItem("userId", res);
        sendId(res);
    });
} else {
    sendId(localStorage.getItem("userId"));
}
