const contacts = [
    {
        "name": "Jack Noseworthy"
    },
    {
        "name": "Scott Langille",
    }
];

// chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
//     console.log(token);
//   });

init();

const form = document.getElementById("search-form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    displayContacts(contacts.filter((contact) => contact.name.toLowerCase().includes(form.search.value.toLowerCase())));

});

const addButton = document.getElementById("add-contact");
addButton.addEventListener('click', function(){
    document.location.href = "../profile/profile.html";
});

function init(){
    displayContacts(contacts);
}

function displayContacts(con){
    let ele = document.getElementById("contacts");
    ele.innerHTML = "";

    for(let contact of con){
        let contactDiv = document.createElement("div");
        contactDiv.setAttribute("class", "contact");

        let div = document.createElement("div");
        div.setAttribute("class", "contact-name");
        let node = document.createTextNode(contact.name);
        div.appendChild(node);

        div.addEventListener("click", function(){
            document.location.href = "../profile/profile.html";
        });

        let profilePic = document.createElement("img");
        profilePic.setAttribute("src", "");
        let picDiv = document.createElement("div");
        picDiv.setAttribute("class", "contact-img");
        picDiv.appendChild(profilePic);

        contactDiv.appendChild(picDiv);
        contactDiv.appendChild(div);
        ele.appendChild(contactDiv);
    }
}