var usuarios = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "glaseca"];
var apiUrl = "https://wind-bow.gomix.me/twitch-api";

var getStatus = function (){
  usuarios.forEach(function(usuario) {
    $.getJSON(apiUrl+"/streams/"+usuario+"?callback=?", function(msg) {
        var estado = msg.stream!==null ? "online" : "offline";
        $.getJSON(apiUrl+"/channels/"+usuario+"?callback=?", function(data) {
          var logo = data.logo != null ? data.logo : "http://www.freeiconspng.com/uploads/no-image-icon-5.png";
          var name = data.display_name != null ? data.display_name : usuario;
          var url = data.url != null ? data.url : "";
          var views = data.views != null ? data.views : "";
          var status = data.status != null ? data.status : "";
          url = status != "404" ? url : "#";
          status = status != "404" ? status : "Channel does not exist";
          
          html = '<div class="row">\
          <div class="col-xs-2 col-sm-1" id="icon">\
            <img src="' + logo + '" class="logo">\
          </div>\
          <div class="col-xs-5 col-sm-2" id="name">\
            <a class="' + estado + '" href="' + url + '" target="_blank">' + name + '</a>\
          </div>\
          <div class="col-xs-14 col-sm-7" id="status">' +  status + '</div>\
          <div class="col-xs-4 col-sm-2" id="views">'+ views + '</div>\
         </div>';
         $("#box").append(html);
        });
    });
  })
};

$(document).ready(function() {
  getStatus();
  $(".radio-inline").change(function() {
    var radioValue = $("input[name='optradio']:checked").val();
    switch(radioValue){
      case "all":
        $(".online").each(function() {
          $(this).parent().parent().show();
        });
        $(".offline").each(function() {
          $(this).parent().parent().show();
        });        
        break;
      case "online":
        $(".online").each(function() {
          $(this).parent().parent().show();
        });
        $(".offline").each(function() {
          $(this).parent().parent().hide();
        });
        break;
      case "offline":
        $(".online").each(function() {
          $(this).parent().parent().hide();
        });
        $(".offline").each(function() {
          $(this).parent().parent().show();
        });
        break;
    }    
  });
});