$(function(){
  window.lesObjets = []
  window.intervals = []
  var createObjet = function(){
    var nbrObjet = window.lesObjets.length;
    window.intervals.push(nbrObjet)
    window.lesObjets[nbrObjet] = "dechet"+nbrObjet;
    console.log("new id: "+nbrObjet)
    $("body").append('<img src="asset/image/dechet.png" id="dechet'+nbrObjet+'" class="dechet" alt="dechet" />')
    $(".dechet").css({
      backgroundColor: "#800000",
      width: "50px",
      height: "50px",
      borderRadius: "100%",
      position:"absolute"
    })
    return nbrObjet;
  }


  window.Down = 0;
  var tombe = function(objet, speed){
      var interval;
      interval = setInterval(function(){
        window.Down += 4;
         $(objet).css("top", window.Down+"px");
      }, speed);
      var idobject = objet.replace("dechet", "");
      window.intervals[idobject] = interval
  }
  var objet = createObjet();
  tombe ("#"+window.lesObjets[objet], 30);



  setInterval(function(){
    if( $("#"+window.lesObjets[objet]).length != 0 &&  $("#"+window.lesObjets[objet]).position().top > 500 ){
      $("#"+window.lesObjets[objet]).remove()
      var idobject = window.lesObjets[objet].replace("dechet", "");
      clearInterval(window.intervals[idobject]);
    }
  }, 200);
});
