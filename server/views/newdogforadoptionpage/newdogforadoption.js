$('#img').change(function () {
	document.getElementById("imageTable").innerHTML="";
	console.log(this.files.length);

    for (var i=0, len = this.files.length; i < len; i++) {
        (function (j, self) {
            var reader = new FileReader()
            reader.onload = function (e) {


            var table = document.getElementById("imageTable");
			var row = table.insertRow(-1);
			
			var imageCell = row.insertCell(0);
			var imageSection = document.createElement("section");
			imageSection.setAttribute("class", "uploadedImage");
			imageCell.appendChild(imageSection);

			var image = document.createElement("img");
			image.setAttribute("class", "image");
			imageSection.appendChild(image);
			var imageFile = event.target;
			image.src = imageFile.result;

			var nameCell = row.insertCell(1);
			nameCell.innerHTML = self.files[j].name;
            }
            reader.readAsDataURL(self.files[j])
        })(i, this);
    }
});