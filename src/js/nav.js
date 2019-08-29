const navCheckbox = document.getElementById("toggle-navigation");
const navItems = document.getElementsByClassName("navigation__item");

for (let i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener("click", function() {
    navCheckbox.checked = false;
  });
}
