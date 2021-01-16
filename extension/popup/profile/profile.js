let profile = {
    username: "Jack Noseworthy",
    notes: "Notes",
    tags: [],
    socials: [
        "www.facebook.com"
    ]
}

init();

function init(){

    document.getElementById("back-button").addEventListener("click", function(){
        location.href = "../contacts/contacts.html"
    });

    let ele = document.getElementById("general");

    let username = document.createElement("input");
    username.setAttribute("value", profile.username);
    username.setAttribute("id", "username");
    
    let notes = document.createElement("input");
    notes.setAttribute("value", profile.notes);
    notes.setAttribute("id", "notes");

    ele.appendChild(username);
    ele.appendChild(notes);

    ele.e = document.getElementById("tags");
    for(let tag of profile.tags){
        //Not exactly what the tags are gonna look like so I'm leaving this blank
    }

    ele = document.getElementById("socials")
    for(let social of profile.socials){
        let account = document.createElement("p")
        let node = document.createTextNode(social);
        account.appendChild(node);
        ele.appendChild(account);
    }

}