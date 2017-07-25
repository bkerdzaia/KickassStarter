
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
    var categories = ['Food', 'Art', 'Tech', 'Finance'];
    categories = categories.filter((el) => {
        var checkbox = document.getElementById(el);
        checkbox.addEventListener('change', function(event) {
            listFilesTo(id, value);
        });
        return checkbox.checked;
    });
    data.projectsList = projectListData.projectsList
        .filter((el)=>{
            if (!value || value === "") {
                return true;
            }
            if (categories.length === 0) {
                return el.name.match(value);
            }
            return el.name.match(value) && categories.indexOf(el.category)>=0;
        });
    document.getElementById(id).innerHTML = Mustache.render(projectListTemplate, data);
}

var exploreFn = function() {
    document.getElementById('search').addEventListener('keypress', (event) => {
        if(event.which==13){
            event.preventDefault();
        }
    });
};


/* end functions for explore */
var startProjectFn = () => {
    server.sendRequest('userId', function(res) {
        document.getElementById('userId').value = res;
    });
};



/*this function does all the stuff about project page*/
function projectpage(data) {
    document.getElementById("fundedInfo").innerText = 100*(data.project.budget/data.project.targetMoney) + "% out of 100% is invested"
    document.getElementById("fundedMoney").innerText = "Current investments: " +  data.project.money + " USD"
    document.getElementById("projjjName").innerText = data.project.name
    document.getElementById("projjjDesc").innerText = data.project.description
    document.getElementById("shareInfo").innerText = data.project.sharesPercenage
    document.getElementById("fundrate").style.width = 100*(data.project.budget/data.project.targetMoney) +"%"

    var cont = ""
    for(var i = 0; i < data.cofounders.length; i++){
        cont = cont + "<li><a href='#'>" + data.cofounders[i].cofounderName + "</a></li>"
    }
    document.getElementById("ulinvestors").innerHTML = cont;

}