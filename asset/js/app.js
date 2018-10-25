$(function(){

  $("#duck").hide();
  $("body").append('<img src="asset/image/logo.png" id="logo" alt="Save Duck" />');
  $("body").append('<img src="asset/image/play.png" id="play" alt="Jouer maintenant" />');
  $("#play").click(function(){
    $(this).hide();
    $("#logo").hide();
    game();
  });

  var game = function () {
    $("#duck").show();
    window.speedGame = 1;
    window.duckSpeed = -1;
    window.duckPosition = ( $(window).width() ) / 2;

    var objet1 = createObjet('dechetgobelet.png');
    tombe ("#"+window.lesObjets[objet1], (3+ window.speedGame));
    var objet2 = createObjet('dechetgobelet.png');
    tombe ("#"+window.lesObjets[objet2], (5 + window.speedGame));

    $("body").on("mousedown", ".dechet", function() {
      $(this).remove();
      if(!window.duckIsDead) {
        replyObject(randomImg(), (3+ window.speedGame));
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

      var  loopPositionDuck;
      loopPositionDuck = setInterval(function() {
        if(window.duckIsDead){
          clearInterval(loopPositionDuck);
        }
      var width = $(window).width();
      var limitLeft = width*0.2;
      var limitRight = width*0.7;

      if(limitLeft > window.duckPosition || limitRight < window.duckPosition) {
        window.duckSpeed = window.duckSpeed*-1;
        if(window.duckSpeed < 0) {
          $("#duck").css("transform", "scaleX(1.0)");
        } else {
          $("#duck").css("transform", "scaleX(-1.0)");
        }
      }
      window.duckPosition = window.duckPosition + window.duckSpeed;
      $("#duck").css("left", window.duckPosition+"px");


      if(Number(window.timer) > 5 && Number(window.timer) < 10) {
        window.speedGame =  3;
      }else if(Number(window.timer) >= 10 && Number(window.timer) < 20) {
        window.speedGame =  6;
      }else if(Number(window.timer) >= 20 && Number(window.timer) < 30) {
        window.speedGame =  8;
      }
    }, 30)
  }
});
