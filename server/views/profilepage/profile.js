$ = jQuery

function getB64Img(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
    };
    reader.onerror = (error) => {
        console.log('Error', error);
    };
}

$(document).ready(function() {
    console.log("document ready")

    $('#userForm').submit(function(e) {
        e.preventDefault();

        let formData = new FormData();
        //let file = userpic.files[0];
        //let b64_string = getB64Img(file);
        //formData.append("file", b64_string);
        formData.append("file", userpic.files[0]);
        formData.append("bio", user_bio.value);
        //console.log(user_bio.value);
        console.log(formData);
        console.log(localStorage.getItem('token'));

        $.ajax({
            url: "/profile/submit",
            type: "POST",
            headers: {"Authorization": localStorage.getItem('token')},
            data: formData,
            error : function(err) {
                console.log('Error!', err)
            },
            success: function(data) {
                alert("he")
                console.log(data)
            },
            cache: false,
            contentType: false,
            processData: false
        });
        
    });

});