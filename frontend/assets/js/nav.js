function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

$("#menuButton").on("click", () => {
  $("#mySidenav").removeClass("d-none");
  $("#mySidenav").addClass("d-flex");
  $("body").css("overflow", "hidden");
  $("#menuButton").hide();
});
$("#close").on("click", () => {
  $("#mySidenav").removeClass("d-flex");
  $("#mySidenav").addClass("d-none");
  $("body").css("overflow", "auto");
  $("#menuButton").show();
});