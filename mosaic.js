function filterSelection(c) {
    var x, i;
  x = document.getElementsByClassName("column");
  if (c == "ALL") c = "";
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1 ) AddClass(x[i], "show");
  }
}

function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

function htmlPopulateXML(){
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
      };
      xhttp.open("GET", "TEMAS_H.xml", true);
      xhttp.send();
  }

function myFunction(xml) {
      var i, txt, xmlDoc; 
      xmlDoc = xml.responseXML;
      txt = "";
      var x = xmlDoc.getElementsByTagName("image");
      var nameValue = xmlDoc.getElementsByTagName("name");
      var editorValue = xmlDoc.getElementsByTagName("editor");
      var pathValue = xmlDoc.getElementsByTagName("path");
      
      for (i = 0; i < x.length; i++) { 
        txt += "<div class='column show " + editorValue[i].innerHTML + "'>" + 
         "<img src='"+ encodeURIComponent(pathValue[i].innerHTML) +"' style='width:100%'>" +
            "<h4>"+nameValue[i].innerHTML + "</h4></div>";
      }
      document.getElementById("gallery").innerHTML = txt;
   }


function onload(){
    htmlPopulateXML();
// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

filterSelection("all")
}