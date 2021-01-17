let contacts = [
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
        tags: ["backend", "second year"]
    },
    {
        name: "Max Chu",
        tags: ["backend", "first year"]
    },
];


chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    fetch('http://localhost:5000/me/friendships', {
        headers: {
            authorization: "Bearer " + token
        }
    }).then(function(res){
        return res.json();
    }).then(function(res){
        contacts = res;
        console.log(res);
        init();
    })
});


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
    if(contacts === undefined || contacts.length < 1) {
        document.location.href = "../welcome/welcome.html";
    } else {
        displayContacts(contacts);
    }
}

function displayContacts(con){
    let ele = document.getElementById("contacts");
    ele.innerHTML = "";

    for(let contact of con){
        let contactDiv = document.createElement("div");
        contactDiv.setAttribute("class", "contact");

        let div = document.createElement("div");
        div.setAttribute("class", "contact-name");
        let node = document.createTextNode(contact.first_name + " " + contact.last_name);
        div.appendChild(node);

        contactDiv.addEventListener("click", function(){
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