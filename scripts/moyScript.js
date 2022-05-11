// vérifie que la chaine de caractères n’est pas composée que d’espaces
function purgespace(s) {
    return s.trim().length === 0;
}

// nettoyer les divs de notes avant de les recolorer
function purgeClass(e) {
    e.classList.remove("note-critique");
    e.classList.remove("note-cool");
    e.classList.remove("note-royal");
    e.classList.remove("note-awesome");
    let smile = e.querySelector("div.noteSmile");
    if (smile) { smile.remove() };
}

// crée un petit badge rigolo pour renforcer l’effet de la coloration des notes
function createSmile(e, type) {
    let smile = document.createElement("div");
    smile.classList.add("noteSmile")
    let icon = document.createElement("i");
    icon.classList.add("fa-solid");
    switch (type) {
        case 'critique': icon.classList.add("fa-face-dizzy"); break;
        case 'royal': icon.classList.add("fa-face-frown"); break;
        case 'cool': icon.classList.add("fa-face-smile"); break;
        case 'awesome': icon.classList.add("fa-face-laugh-beam"); break;
            defaut: console.log("fonction createSmile : mauvais paramètre de type");
    }
    smile.append(icon);
    e.append(smile)
}

// crée une div pour la note
function createNote(n) {
    let notediv = document.createElement("div");
    notediv.classList.add("noteDiv")
    notediv.classList.add("bg-dark")
    notediv.classList.add("border-dark")
    notediv.innerHTML = n
    document.getElementById('notes').append(notediv);
}

// récupère les notes entrées, trie les valeurs non valides et les place dans des divs
function addnotes() {
    let notes = document.querySelector("#notebtn input");
    let tablenote = notes.value.split(' ');
    tablenote.forEach(element => {
        if (!purgespace(element)) {
            let nnum = Number(element);
            if (!isNaN(nnum)) {
                createNote(nnum);
            }
        }
    });
    notes.value = '';
}

// gérer la touche entrée sur l’input
let notes = document.querySelector("#notebtn input");
notes.addEventListener('keydown', (e) => {
    if (e.code === "Enter") { addnotes() }
});

// calcul du max
function getMaxNote() {
    let divs = document.querySelectorAll("#notes div.noteDiv");
    
    if (divs.length != 0) {
        let maxdiv = divs[0];
        let oldcrown = document.querySelector("div.noteBest");
        if (oldcrown) { oldcrown.remove() };

        divs.forEach(e => {
            if (parseFloat(e.innerHTML) > parseFloat(maxdiv.innerHTML)) {
                maxdiv = e
            }
        })
        console.log(maxdiv)
        console.log(maxdiv.innerHTML)
        let crown = document.createElement("div");
        crown.classList.add("noteBest");
        let icon = document.createElement("i");
        icon.classList.add("fa-solid")
        icon.classList.add("fa-crown")
        crown.append(icon);
        maxdiv.append(crown);
    }
}

// fonction principale : fait la moyenne et colore les notes en fonction
function moyenne(e) {
    let divs = document.querySelectorAll("#notes div.noteDiv");
    if (divs.length != 0) {
        // calcul de la moyenne
        let moyenne = 0
        divs.forEach(e => { moyenne += parseFloat(e.innerHTML) });
        moyenne /= divs.length;
        moyenne = Math.round(moyenne * 10);
        moyenne /= 10;
        // affichage de la moyenne
        let moyDiv = document.querySelector(".moyDiv");
        moyDiv.innerHTML = "Moyenne = " + moyenne;
        moyDiv.style.display = "block";
        // ajout des couleurs et des smiles. 0.15 > 0.5 > 0.85 > 1
        divs.forEach(e => {
            purgeClass(e);
            if (parseFloat(e.innerHTML) <= moyenne * 0.3) {
                e.classList.add("note-critique");
                createSmile(e, 'critique')
            }
            else if (parseFloat(e.innerHTML) < moyenne) {
                e.classList.add("note-royal");
                createSmile(e, 'royal')
            }
            else if (parseFloat(e.innerHTML) < moyenne * 1.7) {
                e.classList.add("note-cool");
                createSmile(e, 'cool')
            }
            else {
                e.classList.add("note-awesome");
                createSmile(e, 'awesome')
            }
        });
    }
}
