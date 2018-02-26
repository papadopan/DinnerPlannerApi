var MenuView = function(container, model) {


  this.print_full_recipe = container.find("#print_full_recipe");
  this.go_back = container.find("#go_back");

  var showAll = function() {
    //fetch the number of guets
    var number = model.getNumberOfGuests();

    container.find("#people").text(number);

    //clear all the previous
    var maindiv = container.find("#dish_list")[0];
    while (maindiv.firstChild) {
      maindiv.removeChild(maindiv.firstChild);
    }

    //start adding the new ones
    var dish_list = container.find("#dish_list")[0];

    var total_money=0;

    var span = document.createElement("SPAN");
    span.classList.add("vl");
    var total = document.createElement("DIV");
    total.classList.add("total");
    var sum = document.createElement("DIV");
    sum.classList.add("sum");
    var p1 = document.createElement("P");
var p2 = document.createElement("P");
    //fetch all the dishes
    var dishes = model.getFullMenu(function(data){

      var first = document.createElement("DIV");
      first.classList.add("menu_items");
      var img = document.createElement("IMG");
      img.setAttribute("src" ,  data.image);

      //img.setAttribute("src" , "./images/" + data.image);
      first.append(img);
      var brief = document.createElement("DIV");
      brief.classList.add("brief");
      brief.innerHTML = data.title

      var price = data.pricePerServing;

      price = price * number;
      var p = document.createElement("P");
      p.innerHTML = price + " SEK";

      first.appendChild(brief);
      first.appendChild(p);

      dish_list.appendChild(first);

       total_money += data.pricePerServing * number;



      p1.innerHTML = "Total:";


      p2.innerHTML = total_money + "SEK";

      sum.appendChild(p1);
      sum.appendChild(p2);

      total.appendChild(sum);


      dish_list.appendChild(span);
      dish_list.appendChild(total);



    },function(error){
      console.log("There is a problem with the dishes from the menu")
    });











  }

  this.show = function() {
    container.show();
  }
  this.hide = function() {
    container.hide();
  }

  this.update = function() {
    showAll();

  }

  model.addObservers(this);

  showAll();


}
