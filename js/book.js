let siteUrlInput = document.getElementById('siteUrl');
let siteNameInput = document.getElementById('siteName');
let bookmarksResults = document.getElementById("bookmarksResults");

if (localStorage.getItem('savedBookMarker') != null) {
    siteContainer = JSON.parse(localStorage.getItem('savedBookMarker'));
    displayBookMarker();
}

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



function displayBookMarker() {
    let box = ``;
    for (let j = 0; j < siteContainer.length; j++) {
        console.log(siteContainer[j].siteUrl);

        box += `
        
        <tr>
            <td scope="col">${j + 1}</td>
            <td scope="col">${siteContainer[j].siteName}</td>
           
            <td scope="col"><a href="${siteContainer[j].siteUrl}" target="_blank" class="btn p-sm-1 visit-btn btn-sm"><i class="fa-regular text-white fa-eye"></i> Visit</a></td>   
                     <td scope="col"><button onclick="deleteBookMarker(${j})" class="btn btn-danger delete-btn btn-sm"><i class="fa-regular text-white fa-trash-can"></i> Delete</button></td>
            
            </tr>`;
    }
    bookmarksResults.innerHTML = box;
}

function deleteBookMarker(index) {
    siteContainer.splice(index, 1);
    localStorage.setItem('savedBookMarker', JSON.stringify(siteContainer));
    displayBookMarker();
}



function formatUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
        return 'http://' + url;
    }
    return url;
}




