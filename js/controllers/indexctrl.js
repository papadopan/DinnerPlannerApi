var IndexCtrl = function(view , generalController)
{

//view.wrapper is the container
  var maindiv = view.wrapper.find("#start_button");

  maindiv.click(function(){
      generalController.hideIndex();

  });


}
