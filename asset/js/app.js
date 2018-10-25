$(function(){

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


  window.lesObjets = []
  window.intervals = []
  window.speedTombe = []
  var createObjet = function(img){
    var nbrObjet = window.lesObjets.length;
    window.intervals.push(nbrObjet)
    window.lesObjets[nbrObjet] = "dechet"+nbrObjet;
    console.log("new id: "+nbrObjet)
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


  window.Down = 0;
  var tombe = function(objet, speed){
      var idobject = objet.replace("dechet", "");
      window.speedTombe[idobject] = 0;
      var interval;
      console.log('tombe: '+objet)
      interval = setInterval(function(){
        window.speedTombe[idobject] += speed;
         $(objet).css("top", window.speedTombe[idobject]+"px");
      }, 30);

      window.intervals[idobject] = interval
  }
  var destoyObject = function(object, top){
    if( $("#"+object).length != 0 &&  $("#"+object).position().top > top ){
      $("#"+object).remove()
      var idobject = object.replace("dechet", "");
      clearInterval(window.intervals[idobject]);
    }
  }
  var objet1 = createObjet('dechetgobelet.png');
  tombe ("#"+window.lesObjets[objet1], 3);
  var objet2 = createObjet('dechetgobelet.png');
  tombe ("#"+window.lesObjets[objet2], 5);



  setInterval(function(){
    destoyObject(window.lesObjets[objet1], 500)
    destoyObject(window.lesObjets[objet2], 500)
  }, 200);
});
