var DishListView = function(container, model) {

  //save the container to a variable
  //the controller can fetch it
  this.wrapper = container;


  this.maindiv = container.find("#info")[0];
  this.Search_Button = container.find("#search_button");
  var maindiv = this.maindiv;

  this.populate = function(selected_type, filter) {

    while (this.maindiv.firstChild) {
      this.maindiv.removeChild(this.maindiv.firstChild);
    }
      //call the method getSelectedDish with the user option
      model.getonlinedishes(selected_type , filter,function(dishes){

        for (i in dishes.results) {
          var div_class = document.createElement("DIV");
          var img = document.createElement("IMG");
          img.setAttribute("src" , "https://spoonacular.com/recipeImages/" + dishes.results[i].image);
          div_class.classList.add("button_pressed");
          div_class.setAttribute("data-identify", dishes.results[i].id);
          div_class.setAttribute("data-query" , filter);
          div_class.setAttribute("data-type" , selected_type);
          var child_div = document.createElement("DIV");
          child_div.classList.add('brief');
          child_div.innerHTML = dishes.results[i].title;
          div_class.appendChild(img);
          div_class.appendChild(child_div);
          maindiv.appendChild(div_class);
        }

      }, function(error){
        console.log("There is an error with your search, please try again")
      });



    //create the elements and add the classes for the css


  }

  this.showLoader = function()
  {
    while (this.maindiv.firstChild) {
      this.maindiv.removeChild(this.maindiv.firstChild);
    }

    this.loader.setAttribute("display" , "block");

  }


  //show function
  this.show = function() {
    container.show();
  }
  //hide function
  this.hide = function() {
    container.hide();
  }



}
