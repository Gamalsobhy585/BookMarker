var siteUrlInput = document.getElementById('siteUrl');
var siteNameInput = document.getElementById('siteName');
let saveBtn = document.getElementById('saveBtn');
let siteContainer = [];



saveBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (validateSite(siteNameInput) && validateSite(siteUrlInput)) {
        addBookMarker();
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter valid inputs.",
          });    }
});

siteNameInput.addEventListener('input', function() {
    validateSite(siteNameInput);
});

siteUrlInput.addEventListener('input', function() {
    validateSite(siteUrlInput);
});

function addBookMarker() {
    let site = {
        siteName: siteNameInput.value,
        siteUrl: siteUrlInput.value
    };
    
    siteContainer.push(site);
    localStorage.setItem('savedBookMarker', JSON.stringify(siteContainer));
    clearForm();
    
    showToast("Bookmark is saved");
}



function clearForm() {
    siteNameInput.value = '';
    siteUrlInput.value = '';
    siteUrlInput.classList.remove('is-valid');

    siteNameInput.classList.remove('is-valid');

}

function validateSite(element) {
    var regex = {
        siteName: /^[A-Za-z0-9 ]{2,50}$/, 
        siteUrl:/^(ftp|http|https)?(:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/,
    };

    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        if (element.nextElementSibling) {
            element.nextElementSibling.classList.replace('d-block', 'd-none');
        }
        return true;
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        if (element.nextElementSibling) {
            element.nextElementSibling.classList.replace('d-none', 'd-block');
        }
        return false;
    }
}



function showToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#0091f2",
        stopOnFocus: true,
    }).showToast();
}
siteNameInput.addEventListener('blur',function(){
    this.classList.remove('is-invalid');
    this.nextElementSibling.classList.add('d-none');
})
siteUrlInput.addEventListener('blur',function(){
    this.classList.remove('is-invalid');
    this.nextElementSibling.classList.add('d-none');
})