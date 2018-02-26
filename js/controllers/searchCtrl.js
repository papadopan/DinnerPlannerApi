var SearchCtrl = function(view , model , generalController)
{

  //change the text to the dropdown menu
  view.wrapper.find("#dropdown li a").click( function (){
    view.wrapper.find("#search").text(this.textContent);
  });

  view.wrapper.find("#btn").click(function(){
    view.wrapper.find("div").toggleClass("cross");
  })

}
