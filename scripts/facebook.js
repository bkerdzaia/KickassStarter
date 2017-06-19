
//when facebook log in is pressed we execute this one
window.fbAsyncInit = function() {
	FB.init({
		appId : '1248881405129739',
		xfbml : true,
		version : 'v2.6'
	});
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			getInfo();
		} else if (response.status === 'not_authorized') {
			login();

		} else {
			login();

		}
	});
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function login() {
	FB.login(function(response) {
		if (response.status === 'connected') {
			getInfo();
		} else if (response.status === 'not_authorized') {
			login();
		} else {

		}
	}, {
		scope : 'email, user_birthday, user_location, user_hometown'
	});
}

function getInfo() {
	console.log('Welcome!  Fetching your information.... ');
	FB.api(
					'/me?fields=name, email, id, picture.width(150).height(150)',
					'GET',
					function(response) {
						console.log('Good to see you, ' + response.name + '.'
								+ ' Email: ' + response.email
								+ ' Facebook ID: ' + response.id
								+ ' Facebook Photo: '
								+ response.picture.data.url);
						// var userfirstName = response.first_name;
						// var lastName = response.last_name;
						// var useremail = response.email;
						// var usersex = response.gender;
						// var userbithday = response.birthday;
						// var hometown = response.hometown;
						// var location = response.location;

						document.getElementById('fusername').value = response.name;
						document.getElementById('fpassword').value = response.id;
						document.getElementById('femail').value = response.email;
						document.getElementById('fphoto').value = response.picture.data.url;

						document.getElementById('myForm').submit();

						// alert(hometown);

					});
}