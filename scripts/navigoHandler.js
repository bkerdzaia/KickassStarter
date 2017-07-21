
var router = new Navigo(null, true);

router
    .on({
        'profile': function() {
            setContent('<p>profile</p>');
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
                    <img class="mySlides" src="./images/sl3.jpg">
                    <img class="mySlides" src="./images/sl1.jpg">
                    <img class="mySlides" src="./images/sl2.jpg">
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