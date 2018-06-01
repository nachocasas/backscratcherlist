$(function(){

  var API_URL = 'https://backscratcher-api-3105.herokuapp.com';

  var loading = $('.loading-overlay');

  function getToken(){
    loading.addClass('active');
    $.when($.ajax(API_URL+'/getAuth').then(function(data){
      var token = data.token;
      getScratchers(token);
    }))
  }

  function getScratchers(token){
    $.ajax({
      url: API_URL+"/scratchers",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", token);
      }
    }).done(function(data) {
      var tBody = $('.data-table tbody');
      var sampleRow = tBody.children().first();
      $.each(data, function(i){
        tBody.append(cloneAndFill(sampleRow,data[i]));
     })

     sampleRow.remove();
     loading.removeClass('active');
    });
  }

  function cloneAndFill(sampleRow, data){
    clonedRow = sampleRow.clone();
    clonedRow.children().eq(0).text(data.id);
    clonedRow.children().eq(1).text(data.name);
    clonedRow.children().eq(2).text(data.description);
    clonedRow.children().eq(3).text(data.size);
    clonedRow.children().eq(4).text(data.cost);

    return clonedRow;
  }

  getToken();

});