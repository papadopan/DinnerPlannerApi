var DishDetail = function(container, model) {

  //save the container to a variable
  //the controller can fetch it
  this.wrapper = container;


  var loadPlanner = function() {

      var id = model.getcurrent();

      var number = model.getNumberOfGuests();
      model.getdishdetails(id , function(dish){
        var maindiv = container.find("#planning")[0];
        while (maindiv.firstChild) {
          maindiv.removeChild(maindiv.firstChild);
        }

        var planning = container.find("#planning")[0];

        var plan_desc = document.createElement("DIV");
        plan_desc.classList.add("plan_desc");

        var heading = document.createElement("H1");
        heading.innerHTML = dish.title;
        var img = document.createElement("IMG");

        img.setAttribute("src" ,  dish.image);

        var p = document.createElement("P");
        p.innerHTML = dish.instructions;


        var button = document.createElement("BUTTON");
        button.setAttribute("type", "button");
        //button.setAttribute("name" , "button");
        button.setAttribute("class", "deliver");
        button.setAttribute("id", "back_to_search");
        button.innerHTML = "Back to search";

        plan_desc.appendChild(heading);
        plan_desc.appendChild(img);
        plan_desc.appendChild(p);
        plan_desc.appendChild(button);

        planning.appendChild(plan_desc);

        var plan_info = document.createElement("DIV");
        plan_info.classList.add("plan_info");

        var plan_table = document.createElement("DIV");
        plan_table.classList.add("plan_table");

        var h1 = document.createElement("H1");
        h1.innerHTML = "INGREDIENTS FOR " + number + "PEOPLE";

        var table = document.createElement("TABLE");
        table.classList.add("table");

        var tbody = document.createElement("TBODY");

        for (i in dish.extendedIngredients) {

          var tr = document.createElement("TR");
          var td = document.createElement("TD");
          td.innerHTML = dish.extendedIngredients[i].name;
          var td1 = document.createElement("TD");
          td1.innerHTML = dish.extendedIngredients[i].amount * number;
          var td2 = document.createElement("TD");
          td2.innerHTML = dish.extendedIngredients[i].unit;
          var td3 = document.createElement("TD");
          td3.innerHTML = dish.extendedIngredients[i].id ;

          tr.appendChild(td);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tbody.appendChild(tr);

        }
        var hr = document.createElement("HR");
        var button = document.createElement("BUTTON");
        button.setAttribute("type", "button");
        button.setAttribute("name", "button");
        button.setAttribute("class", "deliver");
        button.setAttribute("id", "add_to_the_menu");
        button.setAttribute("data-id", id);
        button.innerHTML = "Add to the menu";

        var total = document.createElement("P");
        total.innerHTML = dish.pricePerServing * number + " SEK";

        table.appendChild(tbody);
        plan_table.appendChild(h1);
        plan_table.appendChild(table);
        plan_table.appendChild(hr);
        plan_table.appendChild(button);
        plan_table.appendChild(total);
        plan_info.appendChild(plan_table);

        planning.appendChild(plan_info);


      }, function(error){
        console.log("There is an error with your search, please try again")
      });




  }




  //functions show and hide
  this.hide = function() {
    container.hide();
  }
  this.show = function() {
    container.show();
  }

  //update and add observer
  this.update = function() {
    loadPlanner();
  }
  //i am an observer of the model
  model.addObservers(this);
  loadPlanner();


}
