let dims = {
    x: 0,
    y: 0
};
let resu = document.getElementById("resultats");

function creaTable(x, y) {
    // récup dimentions depuis les inputs
    dims.x = document.getElementById("inputx").value;
    dims.y = document.getElementById("inputy").value;
    // vérification que les données sont cohérentes
    if (dims.x != 0 &&
        dims.x != '' &&
        dims.y != 0 &&
        dims.y != '') {
        // supprimer un éventuel tableau qui serait déjà généré
        let oldtable = resu.querySelector("table");
        if (oldtable) { oldtable.remove() }

        let table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("table-dark");
        table.classList.add("table-striped");

        // création d’une ligne en fonction de dims.y
        for (i = 0; i < dims.y; i++) {
            let row = document.createElement("tr");
            // Création d’une cellule dans cette ligne en fonction de dims.x
            // Lors du premier passage, on crée des TH et non des TD
            for (j = 0; j < dims.x; j++) {
                let tableCell;
                if (i == 0) {
                    tableCell = document.createElement("th");
                    tableCell.innerHTML = 'Colonne ' + (j + 1);
                }
                else {
                    tableCell = document.createElement("td")
                    tableCell.classList.add('text-center')
                    tableCell.innerHTML = i + '.' + (j+1);
                }
                row.append(tableCell)
            } // à la fin de cette boucle, la ligne est crée et remplie de cellules

            // Pour avoir un affichage correct, on doit créer un THEAD lors du premier passage, et un TBODY lors du second.
            if (i < 2) {
                if (i == 0) { table.append(document.createElement("thead")) }
                else { table.append(document.createElement("tbody")) }
            }
            // Puis il faut ajouter la ligne crée plus haut à cet élément THEAD ou TBODY
            let tbloc;
            if (i == 0) { tbloc = table.querySelector("thead") }
            else { tbloc = table.querySelector("tbody") }
            tbloc.append(row)
        }
        resu.append(table);
    }
}