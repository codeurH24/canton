function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

window.timer = 0;
window.countScore = 0;
window.upPool = 0.78; //Surface de la mare par rapport à la taille de l'écran
window.duckIsDead = false;
window.lesObjets = [];
window.intervals = [];
window.speedTombe = [];
var createObjet = function(img){
  var nbrObjet = window.lesObjets.length;
  window.intervals.push(nbrObjet)
  window.lesObjets[nbrObjet] = "dechet"+nbrObjet;
  $("body").append('<img src="asset/image/'+img+'" id="dechet'+nbrObjet+'" class="dechet" alt="dechet'+nbrObjet+'" />')
  var postionLeft = getRandomInt(50)
  postionLeft += 20;
  $(".dechet").css({
    width: "50px",
    height: "50px",
    position:"absolute"
  })
  $("#dechet"+nbrObjet).css({
    left: postionLeft+"%",
  })
  return nbrObjet;
}

var tombe = function(objet, speed){
    var idobject = objet.replace("dechet", "");
    window.speedTombe[idobject] = 0;
    var interval;
    interval = setInterval(function(){
      if($(objet).length == 0) {
        clearInterval(interval);
      }
      window.speedTombe[idobject] += speed;
       $(objet).css("top", window.speedTombe[idobject]+"px");
    }, 30);

    window.intervals[idobject] = interval
}

var destoyObject = function(object){
  var limit = limitSurface();
  limit = limit - 50;
  if( $("#"+object).length != 0 &&  $("#"+object).position().top > limit ){
    $("#"+object).remove();
    var topPollution = parseInt($("#pollution").css("top"));
    console.log(topPollution);
    if(topPollution <= -223) {

      duckDead();
    } else {
      window.pollution -= 20;
      $("#pollution").css("top", window.pollution + "%");
      var idobject = object.replace("dechet", "");
      if (!window.duckIsDead) {
        replyObject();
      }
    }
  }
}

var collisionObject = function(object){
  var limit = limitSurface();
  limit = limit - 50;
  if( $("#"+object).length != 0 &&  $("#"+object).position().top > limit ){
    var duckLeft = parseInt($("#duck").css("left"));
    var duckWidth = $("#duck").width();
    var duckRight = duckWidth + duckLeft;
    var glassLeft = $("#"+object).position().left;
    var glassWidth = $("#"+object).width();
    var glassRight = glassWidth + glassLeft;
    if(duckRight > glassLeft && duckRight < (glassRight + duckWidth)) {
      return true;
    } else {
      return false;
    }
  }
}

var replyObject = function() {
  var object = createObjet('dechetgobelet.png');
  tombe ("#"+window.lesObjets[object], 3);
}

var limitSurface = function () {
  var height = $(window).height();
  var limit = parseInt(height*window.upPool);
  return limit;
}


var duckDead = function() {
  if(!window.duckIsDead) {
    $("#duck").css({
      transform : "rotate(180deg)",
      top : "+=75"
    });
  }
  window.duckIsDead = true;
}
