// temp connection values
let connections = [
  {
    name: "Jack Noseworthy",
    notes: "",
    socials: {
      linkedIn: "",
    },
  },
  {
    name: "John Doe",
    notes: "",
    socials: {
      linkedIn: "",
    },
  },
  {
    name: "Tom Zhu",
    notes: "",
    socials: {
      /*   linkedIn: "https://www.linkedin.com/in/zhu-tom/", */
    },
  },
];

init();

// Initialize original

function init() {
  if (document.location.href.startsWith("https://www.linkedin.com/in/")) {
    for (let con of connections) {
      if (
        con.socials.linkedIn &&
        document.location.href === con.socials.linkedIn
      ) {
        displayContact(con);
        return;
      }
    }
    promptNewContact();
  }
}

// If the user existed in the book. Tell them that this contact is already in the contact list

function displayContact(con) {
  // var body = document.getElementsByTagName("body")[0];
  let noteNode = document.createElement("div");
  noteNode.setAttribute("id", "new-contact-message");

  let button = document.createElement("button");
  let textNode = document.createTextNode("X");
  button.appendChild(textNode);
  noteNode.appendChild(button);
  //  body.prepend(closeButtonContact);

  let p = document.createElement("p");
  let closeDiv = document.createElement("div");
  let text = document.createTextNode(
    "You already have " + con.name + " in your contacts. "
  );
  p.appendChild(text);
  closeDiv.appendChild(p);
  noteNode.appendChild(closeDiv);

  // DISREGARD FOR NOW
  //   let p = document.createElement("p");
  //   let text = document.createTextNode(con.name + " " + con.socials.linkedIn);
  //   p.appendChild(text);
  //   noteNode.appendChild(p);

  button.addEventListener("click", function () {
    noteNode.remove();
  });
}

function promptNewContact() {
  let name = document
    .getElementsByClassName("inline t-24 t-black t-normal break-words")[0]
    .textContent.trim();

  let profilePicLink = document.getElementById("ember64").src;

  //checks if the full name equals to a name already in the database

  let potentialCons = [];
  for (let con of connections) {
    if (con.name === name) {
      potentialCons.push(con);
    }
  }

  let noteNode = document.createElement("div");
  noteNode.setAttribute("id", "new-contact-message");
  // noteNode.setAttribute("class", "htn-sticky-note-class");

  // (create new contact) the close X button

  let button = document.createElement("button");
  let closeDiv = document.createElement("div");
  closeDiv.id = "close-button";
  let textNode = document.createTextNode("X");
  button.appendChild(textNode);
  closeDiv.appendChild(button);
  noteNode.appendChild(closeDiv);

  // (create new contact) image element

  let imgDiv = document.createElement("div");
  let logo = document.createElement("img");
  logo.src = chrome.runtime.getURL("assets/logo.svg");
  logo.width = 100;
  logo.height = 100;

  //   imgDiv.width = 100 + "px";
  //   imgDiv.height = 100 + "px";
  //   imgDiv.getAttribute("background-image") = chrome.runtime.getURL("assets/logo.svg");

  //   imgDiv.appendChild(logo);
  //   noteNode.appendChild(imgDiv);

  // if the button/X is clicked, then close the whole pop-up
  button.addEventListener("click", function () {
    noteNode.remove();
  });

  //checks if the person

  if (potentialCons.length !== 0) {
    console.log(potentialCons);
    let p = document.createElement("p");
    let node = document.createTextNode(
      "This profile may belong to one of your existing users. Would you like to add this profile to one of these accounts?"
    );
    p.appendChild(node);
    noteNode.appendChild(p);

    let potCons = document.createElement("div");
    potCons.setAttribute("id", "potential-cons");

    for (let con of potentialCons) {
      let button = document.createElement("button");
      let text = document.createTextNode(con.name);
      button.appendChild(text);
      potCons.appendChild(button);

      button.addEventListener("click", function () {
        connections.find(
          (contact) => contact.name === con.name
        ).socials.linkedIn = document.location.href;
        console.log(connections);
      });
    }
    noteNode.appendChild(potCons);
  } else {
    let p = document.createElement("p");
    let node = document.createTextNode(
      "We couldn't find any existing connections that might own this account."
    );
    p.appendChild(node);
    noteNode.appendChild(p);
  }

  // (create new contact) add to existing contact button element

  //Create a button
  let existingButton = document.createElement("button");
  existingButton.id = "existing-button";
  //Create some text
  let existingText = document.createTextNode("Add to existing contact");
  //Create a div
  let existingDiv = document.createElement("div");
  //Put the text in the button
  existingButton.appendChild(existingText);
  //Put the button in the div
  //   existingDiv.appendChild(existingButton);
  //Put the div on the page
  noteNode.appendChild(existingButton);

  existingButton.addEventListener("click", function () {
    noteNode.innerHTML = "";
    for (let con of connections) {
      let button = document.createElement("button");
      button.className = "list-name";
      let text = document.createTextNode(con.name);
      button.appendChild(text);
      noteNode.appendChild(button);
      //   noteNode.appendChild(document.createElement("br"));

      button.addEventListener("click", function () {
        connections.find(
          (contact) => contact.name === con.name
        ).socials.linkedIn = document.location.href;
        console.log(connections);
      });
    }
  });

  // (create new contact) create new contact button element

  let newButton = document.createElement("button");
  newButton.id = "new-button";
  let newText = document.createTextNode("Create new contact");
  let newDiv = document.createElement("div");
  newButton.appendChild(newText);
  newDiv.appendChild(newButton);
  noteNode.appendChild(newButton);

  newButton.addEventListener("click", function () {});

  //************NOT NEEDED ANYMORE *****************************/
  //     noteNode.innerHTML = "";

  //     let formEl = document.createElement("form");
  //     formEl.setAttribute("id", "add-connection-form");

  //     let genDiv = document.createElement("div");
  //     genDiv.setAttribute("id", "general");

  //     let genTitle = document.createElement("h3");
  //     let genText = document.createTextNode("General");
  //     genTitle.appendChild(genText);
  //     genDiv.appendChild(genTitle);

  //     let username = document.createElement("input");
  //     username.setAttribute("value", name);
  //     username.setAttribute("id", "name");
  //     username.setAttribute("name", "name");

  //     let notes = document.createElement("input");
  //     notes.setAttribute("value", "notes");
  //     notes.setAttribute("id", "notes");
  //     notes.setAttribute("name", "notes");

  //     genDiv.appendChild(username);
  //     genDiv.appendChild(notes);
  //     formEl.appendChild(genDiv);

  //     let tagDiv = document.createElement("div");
  //     tagDiv.setAttribute("id", "tags");

  //     let tagTitle = document.createElement("h3");
  //     let tagText = document.createTextNode("Tags");
  //     tagTitle.appendChild(tagText);
  //     tagDiv.appendChild(tagTitle);
  //     formEl.appendChild(tagDiv);

  //     let socDiv = document.createElement("div");
  //     socDiv.setAttribute("id", "tags");

  //     let socTitle = document.createElement("h3");
  //     let socText = document.createTextNode("Socials");
  //     socTitle.appendChild(socText);
  //     socDiv.appendChild(socTitle);

  //     let socLinked = document.createElement("p");
  //     let socLinkText = document.createTextNode(document.location.href);
  //     socLinked.appendChild(socLinkText);
  //     socDiv.appendChild(socLinked);

  //     formEl.appendChild(socDiv);

  //     let add = document.createElement("button");
  //     add.setAttribute("type", "submit");
  //     let addText = document.createTextNode("Add Connection");
  //     add.appendChild(addText);
  //     formEl.appendChild(add);

  //     noteNode.appendChild(formEl);

  //     add.addEventListener("click", (e) => {
  //       e.preventDefault();
  //       newCon = {
  //         name: formEl.name.value,
  //         notes: formEl.notes.value,
  //         socials: {
  //           linkedIn: document.location.href,
  //         },
  //       };
  //       connections.push(newCon);
  //       console.log(connections);
  //     });
  //   });

  // noteNode.style.left = 0 + "px";
  // noteNode.style.top = 10 + "px";
  var body = document.getElementsByTagName("body")[0];
  body.prepend(noteNode);
  var body = document.getElementsByTagName("body")[0];
  body.prepend(noteNode);
}
