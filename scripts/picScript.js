
// va changer aléatoirement le src d’une image en fonction des id dejà utilisés
function reload(img, table) {
    createNewId(table)
    console.log(table)
}

function createNewId(table) {
    let IdValid = false
    while (!IdValid) {
        let id = Math.floor(Math.random() * 1000) + 1;
        if (table.includes(id)) {
            console.log(id + " est déja passé");
            continue
        }
        else { 
            table.push(id);
            IdValid = true;
        }
    }
}

// function fullReload() {}

// LISTENERS ET FONCTIONS DES BOUTONS
// affichage des boutons de chaque image lors du survol
let btnShowers = document.querySelectorAll(".btnShower");
btnShowers.forEach(el => {
    el.addEventListener("mouseenter", (ev) => {
        ev.currentTarget.querySelector(".imgKeepBtn").hidden = false;
        ev.currentTarget.querySelector(".imgReloadBtn").hidden = false;
        
    });
    el.addEventListener("mouseleave", (ev) => {
        ev.currentTarget.querySelector(".imgKeepBtn").hidden = true;
        ev.currentTarget.querySelector(".imgReloadBtn").hidden = true;
    });
})
// boutons « garder l’image »
let keepBtns = document.querySelectorAll(".imgKeepBtn");
keepBtns.forEach(el => {
    el.addEventListener('click', (ev) => {
        ev.currentTarget.style.backgroundColor = "rgba(15,200,90,1)";
    });
})

// FONCTION PRINCIPALE = se lance automatiquement au chargement
// créer une table de 12 id uniques entre 1 et 1000
let idList = [];
while (idList.length < 12) { createNewId(idList) }
console.log(idList)
// création de div et d’img pour chaque id.
let results = document.getElementById("resultats");
idList.forEach(id => {
    let imgdiv = document.createElement("div");
    imgdiv.classList.add("col-xl-4");
    imgdiv.classList.add("col-md-6");
    let img = document.createElement("img");
    img.classList.add("img-fluid");
    let url = "https://picsum.photos/id/" + id + "/400";

    fetch(url).then(r => {
        if (r.ok) { img.src = url }
        else { img.src = "/Meteor/images/bad404.jpg" }
    })

    imgdiv.append(img);
    results.append(imgdiv);
});
