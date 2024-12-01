// JavaScript Document
const host = "https://" + window.location.hostname; //"https://packlifecarclub.com";
window.onload = async function () {
    var response = await fetch(`${host}/json/members.json`);
    var json = await response.json();
    //console.log(json);
    var row = 0;
    for (var i = 0; i < json.list.length; i++) {
        //every 3rd event create a new row
        if (i % 2 == 0) {
            row++;
            var rowdiv = document.createElement("div");
            rowdiv.className = "row";
            rowdiv.id = "row" + row;
            document.getElementById("container").appendChild(rowdiv);
        }
        //console.log(json.list[i]);
        await createBlock(json.members[json.list[i]], `row${row}`);
        if (i == json.list.length - 1) {
            document.getElementById("spinner-overlay").remove();
        }
    }
}


async function createBlock(info, row) {
    //console.log(info);
    var col = document.createElement("div");
    col.className = "col-md-6";
    var card = document.createElement("div");
    card.className = "panel panel-primary border border-5 border-primary rounded-3";
    var cardHeader = document.createElement("div");
    cardHeader.className = "panel-heading";
    var a1 = document.createElement("a");
    //a1.href = info.link; //this is the link to the member's page soon to be created
    a1.target = "_blank";
    //a1.rel = "noopener noreferrer";
    var img = document.createElement("img");
    img.src = info.image;
    img.className = "img-fluid mr-3 cars";
    //img.alt = info.details;
    a1.appendChild(img);
    cardHeader.appendChild(a1);
    card.appendChild(cardHeader);
    var cardBody = document.createElement("div");
    cardBody.className = "panel-body";
    cardBody.innerHTML = `<h4>${info.name} (${info.title})</h4>`;
    card.appendChild(cardBody);
    col.appendChild(card);
    col.appendChild(document.createElement("br"));
    document.getElementById(row).appendChild(col);
}