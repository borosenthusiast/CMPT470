//var edit = document.getElementById("edit");
//edit.addEventListener("click", displayDetails);


function displayDetails(temp){
  var x = document.getElementById(temp);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

