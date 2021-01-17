document.getElementById("contacts-button").addEventListener("click", function(){
    location.href = "../contacts/contacts.html"
});


chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    document.getElementById("sync-button").addEventListener("click", () => {
        if (token) {
            fetch("http://localhost:5000/me/contacts", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(res => res.json()).then(res => {
                console.log(res);
                location.href = "../contacts/contacts.html";
            });
        }
    })
});

