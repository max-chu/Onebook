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
        let a = document.createElement("a");
        let node = document.createTextNode(contact.first + " " + contact.last);
        a.appendChild(node);
        ele.appendChild(a);
    }
}