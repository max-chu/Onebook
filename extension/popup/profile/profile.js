let editMode = false;

let profile ={
    first_name: "Jack",
    last_name: "Noseworthy",
    birthday: "2001-11-13",
    company: "Carleton University", 
    location: "Ottawa, ON",
    avatar_url: "", 
    notes: "Notes",
    links: [
        {
            platform: "facebook",
            username: "www.facebook.com", 
        },
        {
            platform: "linkedin",
            username: "www.linkedin.com"
        },
        {
            platform: "twitter",
            username: "www.twitter.com"
        },
        {
            platform: "instagram",
            username: "www.instagram.com"
        },
        {
            platform: "email",
            username: "jack.a.noseworthy@gmail.com"
        }
    ], 
    phonenum: "6134155772",
    tags: ["Cool", "BFF", "Vball Team", "CS Newb"],
  }


let id = window.location.href.split("=")[1];

let global_token;

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
        global_token = token;
        if (token) {
            fetch("http://localhost:5000/me/friendships/" + id, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(res => res.json()).then(res => {
                console.log(res);
                profile = res;
                init();
            });
        }
});

function init(){

    document.getElementById("back-button").addEventListener("click", function(){
        location.href = "../contacts/contacts.html"
    });

    document.getElementById("save-button").addEventListener("click", (e) => {
        e.preventDefault();
        const form = document.getElementById("profile-form");
        let updates = {};
        updates.first_name = form.name.value.substring(0, form.name.value.indexOf(" "));
        updates.last_name = form.name.value.substring(form.name.value.indexOf(" ")+1);
        updates.birthday = form.birthday.value;
        updates.company = form.company.value;
        updates.location = form.location.value;
        updates.avatar_url = profile.img;  //Currently, changing img src is not supported
        updates.notes = form.notes.value;
        updates.phoneNumber = form.phone.value;
        let links = [
            {
                platform: "facebook",
                username: form.fb.value
            },
            {
                platform: "linkedin",
                username: form.li.value
            },
            {
                platform: "twitter",
                username: form.tw.value
            },
            {
                platform: "instagram",
                username: form.ig.value
            },
            {
                platform: "email",
                username: form.email.value
            }
        ];
        updates.links = links;
        let tags = [];
        let tagList = document.getElementsByClassName("tag");
        for(let tag of tagList){
            if(tag.getElementsByTagName("input")[1].checked){
                tags.push(tag.getElementsByTagName("input")[0].value);
            }
        }
        updates.tags = tags;



        console.log(updates);

        fetch("http://localhost:5000/me/friendships/" + id, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + global_token,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(updates)
        }).then(res => res.json()).then(res => {
            console.log(res);
            profile = res;
            init();
        });
    });

    document.getElementById("delete-button").addEventListener("click", function(){
        console.log("delete");
    });

    document.getElementById("collapse-1").addEventListener("click", (e) => {
        e.preventDefault();
        if(document.getElementById("general-collapsible").classList.value.includes("hidden")){
            document.getElementById("general-collapsible").classList.remove("hidden");
        }else{
            document.getElementById("general-collapsible").classList.add("hidden");
        }
    });

    document.getElementById("collapse-2").addEventListener("click", (e) => {
        e.preventDefault();
        if(document.getElementById("social-collapsible").classList.value.includes("hidden")){
            document.getElementById("social-collapsible").classList.remove("hidden");
        }else{
            document.getElementById("social-collapsible").classList.add("hidden");
        }
    });

    document.getElementById("collapse-3").addEventListener("click", (e) => {
        e.preventDefault();
        if(document.getElementById("tags-collapsible").classList.value.includes("hidden")){
            document.getElementById("tags-collapsible").classList.remove("hidden");
        }else{
            document.getElementById("tags-collapsible").classList.add("hidden");
        }
    });

    document.getElementById("collapse-4").addEventListener("click", (e) => {
        e.preventDefault();
        if(document.getElementById("settings-collapsible").classList.value.includes("hidden")){
            document.getElementById("settings-collapsible").classList.remove("hidden");
        }else{
            document.getElementById("settings-collapsible").classList.add("hidden");
        }
    });

    document.getElementById("add-tag-button").addEventListener("click", (e) => {
        e.preventDefault();
        let tags = document.getElementById("tag-list");
        let div = document.createElement("div");
        div.setAttribute("class", "input-section tag");
        let input = document.createElement("input");
        input.readOnly = false;
        input.setAttribute("value", "");
        input.setAttribute("type", "text");
        let check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.setAttribute("class", "hidden");
        let i = document.createElement("i");
        i.setAttribute("class", "material-icons delete-tag");
        let clear = document.createTextNode("clear");
        i.appendChild(clear);

        div.appendChild(input);
        div.appendChild(check);
        div.appendChild(i);
        tags.appendChild(div);

    });

    document.getElementById("edit-tags-button").addEventListener("click", (e) => {
        e.preventDefault();
        if(editMode){
            document.getElementById("edit-tags-button").innerHTML = "";
            let node = document.createTextNode("Edit tags");
            document.getElementById("edit-tags-button").appendChild(node);
            document.getElementById("add-tag-button").classList.add("hidden");
            for(let el of document.getElementsByClassName("tag")){
                el.getElementsByTagName("input")[0].readOnly=true;
                el.getElementsByTagName("input")[1].classList.remove("hidden");
            }
            for(let el of document.getElementsByClassName("delete-tag")){
                el.classList.add("hidden");
            }
        }else{
            document.getElementById("add-tag-button").classList.remove("hidden");
            document.getElementById("edit-tags-button").innerHTML = "";
            let node = document.createTextNode("Use tags");
            document.getElementById("edit-tags-button").appendChild(node);
            for(let el of document.getElementsByClassName("tag")){
                el.getElementsByTagName("input")[0].readOnly=false;
                el.getElementsByTagName("input")[1].setAttribute("class", "hidden");
            }
            for(let el of document.getElementsByClassName("delete-tag")){
                el.classList.remove("hidden");
            }
        }
        editMode = !editMode;

    });


    document.getElementById("profile-img").setAttribute("src", profile.avatar_url);

    document.getElementById("input-name").value = profile.first_name + " " + profile.last_name;
    document.getElementById("input-phone").value = profile.phonenum.phone_num;
    document.getElementById("input-company").value = profile.company;
    const gmail = profile.links.find((account) => account.platform === "email");
    console.log(gmail);
    document.getElementById("input-email").value = gmail ? gmail.username : "";
    document.getElementById("input-location").value = profile.location;
    document.getElementById("input-birthday").value = profile.birthday;
    document.getElementById("input-notes").value = profile.notes;
    console.log(profile.notes);

    const fb = profile.links.find((account) => account.platform === "facebook");
    document.getElementById("input-fb").value = fb ? fb.username : "";
    const li = profile.links.find((account) => account.platform === "linkedin");
    document.getElementById("input-li").value = li ? li.username : "";
    const tw = profile.links.find((account) => account.platform === "twitter");
    document.getElementById("input-tw").value = tw ? tw.username : "";
    const ig = profile.links.find((account) => account.platform === "instagram");
    document.getElementById("input-ig").value = ig ? ig.username : "";

    let tags = document.getElementById("tags-collapsible");
    for(let tag of profile.tags){
        let div = document.createElement("div");
        div.setAttribute("class", "input-section tag");
        let input = document.createElement("input");
        input.setAttribute("value", tag);
        input.setAttribute("type", "text");
        div.appendChild(input);
        tags.prepend(div);
    }



}