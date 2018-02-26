var SideBarView = function(container, model) {

	//controller can find these buttons
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	this.confirmation = container.find("#confirmation");



var loadSideBar = function()
{

					var maindiv = container.find("#dish_space")[0];
					while (maindiv.firstChild)
					{
						 maindiv.removeChild(maindiv.firstChild);
					 }

						var number = model.getNumberOfGuests();
						container.find("#numberList").html(number);
						// //add the ordered dishes to the menu
						// var dish_space = container.find("#dish_space")[0];

						sum = 0;
						var price_list = document.createElement("DIV");
						price_list.classList.add("price_list");
						price_list.setAttribute("id" , "price_list");
						var p = document.createElement("P");
						var dish_menu = model.getFullMenu(function(data){

									var order = document.createElement("DIV");
									order.classList.add("order_dishes");

									var span1 = document.createElement("SPAN");
									var span2 = document.createElement("SPAN");

									span1.innerHTML = data.title;
									span2.innerHTML = "SEK " + data.pricePerServing * number;

									order.appendChild(span1);
									order.appendChild(span2);

									dish_space.appendChild(order);
									sum+=data.pricePerServing;


									p.innerHTML = "SEK " + sum* number;

									price_list.appendChild(p);

									maindiv.appendChild(price_list);

						}, function(error){
							console.log("There is a problem")
						});


}

	this.update = function()
	{
			loadSideBar();
	}

	this.show = function(){
		container.show();
	}
	this.hide = function(){
		container.hide();
	}

	//attach this view to listen to the changes of the Dinner Model
	model.addObservers(this);
	loadSideBar();

}
