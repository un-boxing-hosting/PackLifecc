// JavaScript Document
const host = "https://packlifecarclub.com";
window.onload = async function () {
    const events = await fetch(`${host}/events.json`);
    const jsonEvents = await events.json();
    console.log(jsonEvents);
    var row = 0;
    var pastrow = 0;
    for (var i = 0; i < jsonEvents.list.length; i++) {
        //every 3rd event create a new row
            if (i % 3 == 0) {
                row++;
                var row = document.createElement("div");
                row.className = "row";
                row.id = "row" + row;
                document.getElementById("container").appendChild(row);
            }
            await CreateBlock(jsonEvents.list[i], `row${row}`);
    }
    for (var i = 0; i < jsonEvents.pastlist.length; i++) {
        //every 3rd event create a new row
            if (i % 3 == 0) {
                pastrow++;
                var pastrow = document.createElement("div");
                pastrow.className = "row";
                pastrow.id = "pastrow" + row;
                document.getElementById("past-container").appendChild(pastrow);
            }
            await CreateBlock(jsonEvents.pastlist[i], `pastrow${pastrow}`);
        

    }
}

async function CreateBlock(info, row) {
    console.log(info);
/*     info ={
        type: "present",
        details: "Test",
        link: "https://www.facebook.com/Orchardscarsandcoffee",
        imageLink: "pix/orchards-cars-coffee.jpg",
    } */
    var col = document.createElement("div");
    col.className = "col-md-4";
    var card = document.createElement("div");
    if (info.type == "present") {
        card.className = "panel panel-primary border border-5 border-success rounded-3";
    }
    if (info.type == "not-present") {
        card.className = "panel panel-primary border border-5 border-primary rounded-3";
    }
    if (info.type == "past") {
        card.className = "panel panel-primary border border-5 border-white rounded-3";
    }
    var cardHeader = document.createElement("div");
    cardHeader.className = "panel-heading";
    var a1 = document.createElement("a");
    a1.href = info.link;
    var h4 = document.createElement("h4");
    var strong = document.createElement("strong");
    strong.innerHTML = info.details;
    var cardBody = document.createElement("div");
    cardBody.className = "panel-body";
    var a2 = document.createElement("a");
    a2.href = info.imageLink;
    if (info.imageLink != "#") {
        var img = document.createElement("img");
        img.src = info.imageLink;
        img.className = "img-responsive";
        img.alt = "Image";
        img.style = "width:50%";
        a2.appendChild(img);
    }

    h4.appendChild(strong);
    a1.appendChild(h4);
    cardHeader.appendChild(a1);
    card.appendChild(cardHeader);
    cardBody.appendChild(a2);
    card.appendChild(cardBody);
    col.appendChild(card);
    document.getElementById(row).appendChild(col);
}