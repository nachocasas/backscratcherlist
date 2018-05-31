$(function(){

  var API_URL = 'http://localhost/api/index.php';
  
  function getToken(){
    $.when($.ajax(API_URL+'/getAuth').then(function(data){
      var token = data.token;
      getScratchers(token);
    }))
  }

  function getScratchers(token){
    $.ajax({
      url: API_URL+"/scratchers",
      beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", token);
      }
    }).done(function(data) {
      var tBody = $('.data-table tbody');
      var sampleRow = tBody.children().first();
      $.each(data, function(i){
        tBody.append(cloneAndFill(sampleRow,data[i]));
     })

     sampleRow.remove();
    });
  }

  function cloneAndFill(sampleRow, data){
    var clonedRow = sampleRow.clone();
    var children = clonedRow.children();
    $(children[0]).text(data.id);
    $(children[1]).text(data.name);
    $(children[2]).text(data.description);
    $(children[3]).text(data.size);
    $(children[4]).text(data.cost);

    return clonedRow;
  }

  getToken();

});