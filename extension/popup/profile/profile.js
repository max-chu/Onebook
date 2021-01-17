/*let profile = {
    name: "Jack Noseworthy",
    id: "1",
    img: "",
    company: "Carleton University",
    email: "jack.a.noseworthy@gmail.com",
    phonenum: "6135923666",
    location: "Ottawa, ON",
    birthday: "2001-11-13",
    notes: "Notes",
    tags: ["Cool", "BFF", "Vball Team", "CS Newb"],
    socials: {
        facebook: "www.facebook.com",
        linkedin: "www.linkedin.com",
        twitter: "www.twitter.com",
        instagram: "www.instagram.com"
    }
}*/

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


init();


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


        console.log(updates);
    });

    document.getElementById("delete-button").addEventListener("click", function(){
        console.log("delete");
    });

    document.getElementById("collapse-1").addEventListener("click", (e) => {
        e.preventDefault();
        console.log(document.getElementById("general-collapsible").classList.value);
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


    document.getElementById("profile-img").setAttribute("src", profile.avatar_url);

    document.getElementById("input-name").value = profile.first_name + " " + profile.last_name;
    document.getElementById("input-phone").value = profile.phonenum;
    document.getElementById("input-company").value = profile.company;
    document.getElementById("input-email").value = profile.links.find((account) => account.platform === "email").username;
    document.getElementById("input-location").value = profile.location;
    document.getElementById("input-birthday").value = profile.birthday;
    document.getElementById("input-notes").value = profile.notes;

    document.getElementById("input-fb").value = profile.links.find((account) => account.platform === "facebook").username;
    document.getElementById("input-li").value = profile.links.find((account) => account.platform === "linkedin").username;
    document.getElementById("input-tw").value = profile.links.find((account) => account.platform === "twitter").username;
    document.getElementById("input-ig").value = profile.links.find((account) => account.platform === "instagram").username;

    let tagsList = document.getElementById("tags-list");
    for(let tag of profile.tags){
        let li = document.createElement("li");
        let node = document.createTextNode(tag);
        li.appendChild(node);
        tagsList.appendChild(li);
    }


}