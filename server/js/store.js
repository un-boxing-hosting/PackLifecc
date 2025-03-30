// JavaScript Document
const host = "https://" + window.location.hostname; //"https://packlifecarclub.com";
window.onload = async function () {
    var response = await fetch(`https://api.packlifecarclub.com/api/amazon`)
    //var response = await fetch(`http://localhost:3000/api/amazon`) 
   var json = await response.json();
   console.log(json);
   var row = 0;
   for (var i = 0; i < json.list.length; i++) {
       //every 3rd create a new row
           if (i % 3 == 0) {
               row++;
               var rowdiv = document.createElement("div");
               rowdiv.className = "row";
               rowdiv.id = "row" + row;
               document.getElementById("container").appendChild(rowdiv);
           }
           await CreateBlock(json.list[i], `row${row}`, json);
           if (i == json.list.length - 1) {
            document.getElementById("spinner-overlay").remove();
           }
   }
}

async function CreateBlock(info, row, json) {
    info = json[info];
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
    //if (info.type == "present") {
        card.className = "panel panel-primary border border-5 border-success rounded-3";
    //}
   /*  if (info.type == "not-present") {
        card.className = "panel panel-primary border border-5 border-primary rounded-3";
    }
    if (info.type == "past") {
        card.className = "panel panel-primary border border-5 border-white rounded-3";
    } */
    var cardHeader = document.createElement("div");
    cardHeader.className = "panel-heading";
    var a1 = document.createElement("a");
    a1.href = info.url;
    a1.target = "_blank";
    a1.rel = "noopener";
    var h4 = document.createElement("h4");
    var strong = document.createElement("strong");
    strong.innerHTML = info.title;
    var cardBody = document.createElement("div");
    cardBody.className = "panel-body";
    var a2 = document.createElement("a");
    a2.href = info.url;
    if (info.image != "#") {
        var img = document.createElement("img");
        img.src = info.image;
        img.className = "img-responsive";
        img.alt = "Image";
        img.style = "width:50%";
        a2.appendChild(img);
    }    cardBody.appendChild(a2);
    var prime = document.createElement("a");
    if (info.prime == true) {
        
        var primeImg = document.createElement("img");
        primeImg.src = "/pix/Prime-logo.png";
        primeImg.className = "img-responsive";
        primeImg.style = "width:60px; height:20px";
        prime.appendChild(primeImg);
        
    }
    var panelFooter = document.createElement("div");
    panelFooter.className = "panel-footer";
    var h41 = document.createElement("h4");
    var strong1 = document.createElement("strong");
    //a3.href = info.price;
    strong1.innerHTML = info.price;

    h4.appendChild(strong);
    a1.appendChild(h4);
    cardHeader.appendChild(a1);
    card.appendChild(cardHeader);

    card.appendChild(cardBody);
    h41.appendChild(strong1);
    panelFooter.appendChild(prime);
    panelFooter.appendChild(h41);
    card.appendChild(panelFooter);
    col.appendChild(card);
    console.log(row);   
    document.getElementById(row).appendChild(col);
}