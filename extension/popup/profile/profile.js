let profile = {
    name: "Jack Noseworthy",
    id: "1",
    img: "",
    company: "Carleton University",
    email: "jack.a.noseworthy@gmail.com",
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
        if(form.name.value !== profile.name){
            updates.name = form.name.value;
        }
        if(form.company.value !== profile.company){
            updates.company = form.company.value;
        }
        if(form.email.value !== profile.email){
            updates.email = form.email.value;
        }
        if(form.location.value !== profile.location){
            updates.location = form.location.value;
        }
        if(form.birthday.value !== profile.birthday){
            updates.birthday = form.birthday.value;
        }
        if(form.notes.value !== profile.notes){
            updates.notes = form.notes.value;
        }
        if(form.fb.value !== profile.socials.facebook){
            updates.fb = form.fb.value;
        }
        if(form.li.value !== profile.socials.linkedin){
            updates.li = form.li.value;
        }
        if(form.tw.value !== profile.socials.twitter){
            updates.tw = form.tw.value;
        }
        if(form.ig.value !== profile.socials.instagram){
            updates.ig = form.ig.value;
        }
        console.log(updates);
    });

    document.getElementById("delete-button").addEventListener("click", function(){
        console.log("delete");
    });

    document.getElementById("collapse-1").addEventListener("click", function(){
        if(document.getElementById("general-collapsible").classList.value === "hidden"){
            document.getElementById("general-collapsible").classList.remove("hidden");
        }else{
            document.getElementById("general-collapsible").classList.add("hidden");
        }
    });

    document.getElementById("collapse-2").addEventListener("click", function(){
        if(document.getElementById("social-collapsible").classList.value === "hidden"){
            document.getElementById("social-collapsible").classList.remove("hidden");
        }else{
            document.getElementById("social-collapsible").classList.add("hidden");
        }
    });

    document.getElementById("collapse-3").addEventListener("click", function(){
        if(document.getElementById("tags-collapsible").classList.value === "hidden"){
            document.getElementById("tags-collapsible").classList.remove("hidden");
        }else{
            document.getElementById("tags-collapsible").classList.add("hidden");
        }
    });

    document.getElementById("profile-img").setAttribute("src", profile.img);

    document.getElementById("input-name").value = profile.name;
    document.getElementById("input-company").value = profile.company;
    document.getElementById("input-email").value = profile.email;
    document.getElementById("input-location").value = profile.location;
    document.getElementById("input-birthday").value = profile.birthday;
    document.getElementById("input-notes").value = profile.notes;

    document.getElementById("input-fb").value = profile.socials.facebook;
    document.getElementById("input-li").value = profile.socials.linkedin;
    document.getElementById("input-tw").value = profile.socials.twitter;
    document.getElementById("input-ig").value = profile.socials.instagram;

    let tagsList = document.getElementById("tags-list");
    for(let tag of profile.tags){
        let li = document.createElement("li");
        let node = document.createTextNode(tag);
        li.appendChild(node);
        tagsList.appendChild(li);
    }


}