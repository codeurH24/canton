$(function(){
  window.Down = 0
  var decend = function(){
      window.Down += 1;
      console.log()
      //$(".dechet").css("top", window.Down+"px");
  }



  setInterval(decend(), 300);
})
