$(function(){

  var objet1 = createObjet('dechetgobelet.png');
  tombe ("#"+window.lesObjets[objet1], 3);
  var objet2 = createObjet('dechetgobelet.png');
  tombe ("#"+window.lesObjets[objet2], 5);

  $("body").on("mousedown", ".dechet", function() {
    $(this).remove();
    if(!window.duckIsDead) {
      replyObject();
    }
    window.countScore += 1;
    $(".score span").text(window.countScore);
  });

  //A X px suppression de l'objet
  setInterval(function(){
    var n = window.lesObjets.length;
    for(var i = 0; i < n; i++) {
      if(collisionObject(window.lesObjets[i])) {
        if(!window.duckIsDead) {
          duckDead();
        }
      }
      destoyObject(window.lesObjets[i], 500);
    }
  }, 200);

  // Timer
  setInterval(function(){
    window.timer++;
    $(".timer span").text(window.timer);
  }, 1000);

  //Placement canard
  setInterval(function(){
    if(!window.duckIsDead) {
      var duckHeight = $("#duck").height();
      var surfaceDuck = limitSurface() - duckHeight;
      $("#duck").css("top", surfaceDuck + "px");
    }
  }, 100);
window.pollution = 15;
$("#pollution").css("top", "15%");
  //Placement pollution
  //  setInterval(function(){
  //    var pollutionHeight = $("#pollution").height();
  //    var surfacePollution = limitSurface()
  //    $("#pollution").css("top", surfacePollution + "px");
  // }, 100);
});
