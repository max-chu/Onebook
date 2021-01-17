const contacts = [
    {
        name: "Jack Noseworthy",
        tags: ["second year", "frontend"],
        id: "1",
        avatar_url: "https://media-exp1.licdn.com/dms/image/C5603AQFWejZd3v__Ag/profile-displayphoto-shrink_400_400/0/1599081448212?e=1616630400&v=beta&t=IdUpQ3T-ngzPeMC1N-ECKwFaHxwtliQdLoTBXT1FG0Y",
    },
    {
        name: "Scott Langille",
        tags: ["ui/ux", "first year", "frontend"],
        id: "2",
        avatar_url: "https://media-exp1.licdn.com/dms/image/C5603AQHP3qwKwMsDAg/profile-displayphoto-shrink_400_400/0/1605405507271?e=1616630400&v=beta&t=07e7PMRaRg4Nd1xSaP3W_H_BAK_q74q_3tGzwFV6VHM",
    },
    {
        name: "Tom Zhu",
        tags: ["backend", "second year"],
        avatar_url: "https://media-exp1.licdn.com/dms/image/C4E03AQEilcvEoANsJw/profile-displayphoto-shrink_400_400/0/1593458448493?e=1616630400&v=beta&t=yaOQX8__i47ejVVF914DBJw9rvAe-Cc9mzVc-V_4AVE",
    },
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
        let node = document.createTextNode(contact.name);
        div.appendChild(node);

        contactDiv.addEventListener("click", function(){
            window.location.href = "../profile/profile.html?contact="+contact.id;
        });

        let profilePic = document.createElement("img");
        profilePic.setAttribute("src", contact.avatar_url);
        profilePic.width = "44";
        profilePic.height = "44";
        let picDiv = document.createElement("div");
        picDiv.setAttribute("class", "contact-img");
        picDiv.appendChild(profilePic);

        contactDiv.appendChild(picDiv);
        contactDiv.appendChild(div);
        ele.appendChild(contactDiv);
    }
}