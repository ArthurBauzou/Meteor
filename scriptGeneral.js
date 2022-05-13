let menu = document.getElementById("custonav");
let arrow = document.querySelector(".burgerButton i")
function showMenu() {
  if (menu.getAttribute("popped") == "false") {
    menu.style.left = "-0.7em";
    arrow.style.transform = "rotate(180deg)";
    menu.setAttribute("popped", "true");

  }
  else {
    menu.style.left = "";
    arrow.style.transform = "";
    menu.setAttribute("popped", "false");

  }
}