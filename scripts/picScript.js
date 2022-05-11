let imgIds = [];
while (imgIds.length < 12) {
    let id = Math.floor(Math.random() * 1000) + 1;
    if (imgIds.includes(id)) { console.log(imgIds + " contient déjà " + id); continue }
    else { imgIds.push(id) }
}

// function fullReload() {}

let results = document.getElementById("resultats");
imgIds.forEach(id => {
    let imgdiv = document.createElement("div");
    imgdiv.classList.add("col-xl-4");
    imgdiv.classList.add("col-md-6");
    let img = document.createElement("img");
    img.classList.add("img-fluid");
    fetch("https://picsum.photos/id/" + id + "/400").then(r => {
        img.src = r.ok ? "https://picsum.photos/id/" + id + "/400" : "/Meteor/images/bad404.jpg";
    })
    imgdiv.append(img);
    results.append(imgdiv);
});

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

let keepBtns = document.querySelectorAll(".imgKeepBtn");
keepBtns.forEach(el => {
    el.addEventListener('click', (ev) => {
        ev.currentTarget.style.backgroundColor = "rgba(15,200,90,1)";
    });
})