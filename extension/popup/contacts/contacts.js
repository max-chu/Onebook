const contacts = [
    {
        name: "Jack Noseworthy",
        tags: ["second year", "frontend"],
        id: "1"
    },
    {
        name: "Scott Langille",
        tags: ["ui/ux", "first year", "frontend"],
        id: "2"
    },
    {
        name: "Tom Zhu",
        tags: ["backend", "second year"],
        id: "3"
    }
];

// chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
//     console.log(token);
//   });

init();

const searchInput = document.getElementById("search-field");
searchInput.addEventListener('input', (e) => {
    e.preventDefault();
    console.log(searchInput.value);
    displayContacts(contacts.filter((contact) => (contact.name.toLowerCase().includes( searchInput.value.toLowerCase() ) ) || (contact.tags.find((tag) => tag.toLowerCase().includes(searchInput.value.toLowerCase()))) ) );
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
            window.location.href = "../profile/profile.html?contact="+contact.id;
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