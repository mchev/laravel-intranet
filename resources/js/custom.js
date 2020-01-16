$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  $("#menu-toggle i").toggleClass("fa-chevron-left fa-chevron-right")
});