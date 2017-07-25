
var slideIndex = 1;
//showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (x === undefined) {
        return;
    }
    if (n > x.length) {slideIndex = 1;}
    if (n < 1) {slideIndex = x.length;}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
}

/* functions for explore */
function scrollTo(id) {
    document.body.scrollTop = document.getElementById(id).offsetTop;
}

function listFilesTo(id, value) {
    var projectListTemplate = contents[files.explore[1]].page;
    var projectListData = contents[files.explore[0]].data;
    if (!projectListTemplate || !projectListData || !projectListData.projectsList) return;
    let data = {
        projectsList: []
    };
    for (let el of projectListData.projectsList) {
        if (el.name.startsWith(value)) {
            data.projectsList.push(el);
        }
    }
    document.getElementById(id).innerHTML = Mustache.render(projectListTemplate, data);
}

/* end functions for explore */

var exploreFn = function() {
    document.getElementById('search').addEventListener('keypress', (event) => {
        if(event.which==13){
            event.preventDefault();
        }
    });
};
