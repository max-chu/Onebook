const contacts = [
    {
        "first": "Jack",
        "last": "Noseworthy",
    }
];

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    console.log(token);
  });

init();

function init(){
    let ele = document.getElementById("contacts");
    for(let contact of contacts){
        let button = document.createElement("button");
        let node = document.createTextNode(contact.first + " " + contact.last);
        button.appendChild(node);
        ele.appendChild(button);

        button.addEventListener("click", function(){
            location.href = "../profile/profile.html"
        });
    }
}