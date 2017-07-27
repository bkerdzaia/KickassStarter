"use strict";
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
    // var categories = ['Food', 'Art', 'Tech', 'Finance'];
    // categories.forEach((el) => {
    //     var checkbox = document.getElementById(el);
    //     checkbox.addEventListener('change', function(event) {
    //         listFilesTo(id, value);
    //     });
    // });
};


/* end functions for explore */
var startProjectFn = () => {
    document.getElementById('userId').value = localStorage.getItem('userId');
};

var changeProjectImage = (input, id) => {
    var file = input.files[0];
    var reader  = new FileReader();
    reader.onloadend = () => {
        document.getElementById(id).value = reader.result;
    };
    if (file) {
        reader.readAsDataURL(file);
    }
};



/*this function does all the stuff about project page*/
function projectpage(data) {
    document.getElementById("fundedInfo").innerText = 100*(data.project.budget/data.project.targetMoney) + "% out of 100% is invested";
    document.getElementById("fundedMoney").innerText = "Current investments: " +  data.project.money + " USD";
    document.getElementById("projjjName").innerText = data.project.name;
    document.getElementById("projjjDesc").innerText = data.project.description;
    document.getElementById("shareInfo").innerText = data.project.sharesPercenage;
    document.getElementById("fundrate").style.width = 100*(data.project.budget/data.project.targetMoney) +"%";

    var cont = "";
    for(var i = 0; i < data.cofounders.length; i++){
        cont = cont + "<li><a href='#'>" + data.cofounders[i].cofounderName + "</a></li>";
    }
    document.getElementById("ulinvestors").innerHTML = cont;

}


var profileSettingsFn = () => {

       let elems = document.getElementsByClassName("form-elem-input");
       for (let el of elems) {
           el.addEventListener('focus', function() {
               el.parentElement.classList.add('input-focus');
           });
           el.addEventListener('blur', function() {
               el.parentElement.classList.remove('input-focus');
           });
       }
       tabHandle();
       editPencilListener();

      document.getElementById('editCancel').addEventListener('click', function(event){
        cancelPencilChanges();
      });
      document.getElementById('editSave').addEventListener('click', function(event){
          savePencilChanges();
      });
      document.getElementById('securitySave').addEventListener('click', function(event){
          savePassword();
      });
};

/* profile settings functions */
function drop(ev) {
   ev.stopPropagation();
   ev.preventDefault();
   var files = ev.dataTransfer.files;
   if (files.length > 0) {
       var file = files[0];
       if (file.type.match(/image.*/)) {
           var reader = new FileReader();
           reader.onload = function(e2) {
               var img = document.createElement('img');
               img.src= e2.target.result;
               document.getElementById("imageDrop").innerHTML = "<img src=\"" +e2.target.result+"\">";
           }
           reader.readAsDataURL(file);
       }
   } else {
       var imageUrl = ev.dataTransfer.getData('text/html');
       var rex = /src="?([^"\s]+)"?\s*/;
       var url = rex.exec(imageUrl);
       document.getElementById("imageDrop").innerHTML = "<img src=\"" +url[1]+"\">";
   }
}

function getActiveElem(elems) {
   for (let el of elems) {
       if (el.classList.contains('active')) {
           return el;
       }
   }
}

function tabHandle() {
   let elems = document.getElementsByClassName("tabs-list-item-content");
   for (let el of elems) {
       el.addEventListener('click', function() {
           let elems = document.getElementsByClassName("tabs-list-item-content");
           let act = getActiveElem(elems);
           if (act === el) {
               return;
           }
           /* make el active */
           el.classList.add('active');
           let panes = document.getElementsByClassName("tabs-pane");
           let pane = panes[Array.prototype.indexOf.call(elems, el)];
           pane.classList.add('tab-show');
           /* make others inactive */
           act && act.classList.remove('active');
           act && panes[Array.prototype.indexOf.call(elems, act)].classList.remove('tab-show');
       });
   }
}

function editPencilListener() {
   let elems = document.getElementsByClassName("icon-pencil");
   for (let el of elems) {
       el.addEventListener('click', function() {
           var divElem = el.parentElement.parentElement.firstElementChild;
           var spanElem = divElem.lastElementChild;
           spanElem.style.display = 'none';
           let inputNode = document.createElement('input');
           inputNode.type = "text";
           inputNode.className = spanElem.className;
           inputNode.value = spanElem.innerText;
        //    divElem.removeChild(spanElem);
           divElem.appendChild(inputNode);
           el.style.display = 'none';
           inputNode.focus();
       });
   }
}

function cancelPencilChanges() {
   let elems = document.getElementsByClassName("icon-pencil");
   for (let el of elems) {
       var divElem = el.parentElement.parentElement.firstElementChild;
       if (divElem.childNodes.length <= 5) {continue;}
       var inputElem = divElem.lastElementChild;
       divElem.removeChild(inputElem);
       el.style.display = 'block';
       var spanElem = divElem.lastElementChild;
       spanElem.style.display = '';
   }
}

function savePencilChanges() {
   let elems = document.getElementsByClassName("icon-pencil");
   var changeData = {};
   for (let el of elems) {
       var divElem = el.parentElement.parentElement.firstElementChild;
       if (divElem.childNodes.length <= 5) {continue;}
       var inputElem = divElem.lastElementChild;
       var spanElem = divElem.children[1];
       spanElem.innerHTML = inputElem.value;
       changeData[divElem.firstElementChild.innerHTML] = inputElem.value;
       divElem.removeChild(inputElem);
       spanElem.style.display = '';
       el.style.display = 'block';
   }
   console.log(changeData);
}

/*this function does all the stuff about profile page*/
function profilepage(user) {
    document.getElementById("profName").innerText = user.user.username;
    document.getElementById("profemail").innerText = user.user.email;
    document.getElementById("profPhoto").innerText = user.user.photo;

}
