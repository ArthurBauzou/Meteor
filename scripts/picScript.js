// va changer aléatoirement le src d’une image en fonction des id dejà utilisés
async function reload(img, table) {
    let valid = false;
    while (!valid) {
        createNewId(table);
        let url = "https://picsum.photos/id/" + table[table.length - 1] + "/400";

        let urlValid = await fetch(url)
        if (urlValid.statusText == "OK") {
            img.src = url
            valid = true
        }
        else {
            console.log(img)
        }
    }
}

function createNewId(table) {
    let IdValid = false
    while (!IdValid) {
        let id = Math.floor(Math.random() * 1000) + 1;
        if (table.includes(id)) { continue }
        else { 
            table.push(id);
            IdValid = true;
        }
    }
}

function fullReload() {
    let imgs = document.querySelectorAll(".btnShower > img")
    imgs.forEach(el => {
        let check = el.parentNode.querySelector(".imgKeepBtn").getAttribute("checked")
        if (check == "false") { reload(el, idList) }
    })
}

// FONCTION PRINCIPALE = se lance automatiquement au chargement
// créer une table de 12 id uniques entre 1 et 1000
let idList = [];
while (idList.length < 6) { createNewId(idList) }
console.log(idList)
// création de div et d’img pour chaque id.
let results = document.getElementById("resultats");
idList.forEach(id => {
    let imgdiv = document.createElement("div");
    imgdiv.classList.add("col-xl-4");
    imgdiv.classList.add("col-md-6");
    imgdiv.classList.add("btnShower");
    let img = document.createElement("img");
    img.classList.add("img-fluid");
    let url = "https://picsum.photos/id/" + id + "/400";
    
    fetch(url).then(r => {
        if (r.ok) { img.src = url }
        else { reload(img, idList) }
    })
    
    let keepDiv = document.createElement("div");
    keepDiv.innerHTML = '<i class="fa-solid fa-check"></i>';
    keepDiv.classList.add("imgKeepBtn");
    keepDiv.setAttribute("checked", false)
    keepDiv.hidden = true;
    
    let reloadDiv = document.createElement("div");
    reloadDiv.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
    reloadDiv.classList.add("imgReloadBtn");
    reloadDiv.hidden = true;
    
    imgdiv.append(img);
    imgdiv.append(keepDiv);
    imgdiv.append(reloadDiv);
    results.append(imgdiv);
});

// LISTENERS ET FONCTIONS DES BOUTONS
// affichage des boutons de chaque image lors du survol
let btnShowers = document.querySelectorAll(".btnShower");
btnShowers.forEach(el => {
    el.addEventListener("mouseenter", (ev) => {
        ev.currentTarget.querySelector(".imgKeepBtn").hidden = false;
        ev.currentTarget.querySelector(".imgReloadBtn").hidden = false;
        
    });
    el.addEventListener("mouseleave", (ev) => {
        let checked = ev.currentTarget.querySelector(".imgKeepBtn").getAttribute("checked");
        ev.currentTarget.querySelector(".imgKeepBtn").hidden = (checked == "false") ? true : false
        ev.currentTarget.querySelector(".imgReloadBtn").hidden = true;
    });
})
// boutons « garder l’image »
let keepBtns = document.querySelectorAll(".imgKeepBtn");
keepBtns.forEach(el => {
    el.addEventListener('click', (ev) => {
        let checked = ev.currentTarget.getAttribute("checked");
        if (checked == "false") {
            ev.currentTarget.style.backgroundColor = "rgba(15,200,90,1)";
            ev.currentTarget.style.top = "0.5em"
            ev.currentTarget.setAttribute("checked", true)
        }
        else {
            ev.currentTarget.removeAttribute("style");
            ev.currentTarget.setAttribute("checked", false)
        }
    });
})
// boutons reload
let ReloadBtn = document.querySelectorAll(".imgReloadBtn");
ReloadBtn.forEach(el => {
    el.addEventListener('click', (ev) => {
        let img = ev.currentTarget.parentNode.querySelector("img");
        reload(img, idList);
    });
})