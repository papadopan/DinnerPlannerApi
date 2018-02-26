var SideBarCtrl = function(view , model , generalControler)
{
  //
  // Buttons functionality
  //
  //add functionality about adding guests
  view.plusButton.click(function() {
    generalControler.loaderOn();
    var sum = model.getNumberOfGuests();
    sum = sum + 1;
    model.setNumberOfGuests(sum);
  });
  //add functionality about decreasing guests

  view.minusButton.click(function() {
    generalControler.loaderOn();
    var sum = model.getNumberOfGuests();
    sum--;
    if (sum <= 1) {
      sum = 1;
    }
    model.setNumberOfGuests(sum);
  });

  //when the confirmation button is clicked
  view.confirmation.click(function(){
    generalControler.confirmation();
  });


}
