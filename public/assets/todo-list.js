$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      console.log(todo);

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo
      }).done(function(data){
        //do something with the data via front-end framework
        location.reload();
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        dataType: 'JSON',
        url: '/todo/' + item
      }).done(function(data){
        //do something with the data via front-end framework
        location.reload();
      }).fail(function(data){
        //do something with the data via front-end framework
        console.log(data);
      });
  });

});
