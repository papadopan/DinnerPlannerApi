
var SearchView = function (container, model) {

  //save the container to a variable
  //the controller can fetch it
  this.wrapper = container;

   var types_of_dishes = model.getTypes();
  

   //use the type of dishes in the dropdown menu
   for (i in types_of_dishes)
   {
     var itemli = document.createElement("LI");
     var itema = document.createElement("A");
     itema.setAttribute("href" , "#");
     itema.innerHTML = types_of_dishes[i];
     itemli.appendChild(itema);
     var dropdown = container.find("#dropdown")[0];
     dropdown.appendChild(itemli);
   }


   //functions hide and show
   this.hide = function()
   {
     container.hide();
   }
   this.show = function()
   {
     container.show();
   }



}
