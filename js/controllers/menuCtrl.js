var MenuCtrl = function(view , model  , generalControler)
{

view.print_full_recipe.click(function()
{
    generalControler.print();
});
view.go_back.click(function(){
  generalControler.go_back();
});

}
