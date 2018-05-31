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
    clonedRow = sampleRow.clone();
    clonedRow.children().eq(0).text(scratcher.id);
    clonedRow.children().eq(1).text(scratcher.name);
    clonedRow.children().eq(2).text(scratcher.description);
    clonedRow.children().eq(3).text(scratcher.size);
    clonedRow.children().eq(4).text(scratcher.cost);

    return clonedRow;
  }

  getToken();

});