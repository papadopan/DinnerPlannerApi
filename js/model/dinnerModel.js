//DinnerModel Object constructor
var DinnerModel = function(generalController) {

	//in order to keep the id for the planner
	var current = 690978;
	var type="salads";
	var query = "burger";
	this.setcurrent = function(num)
	{
		current = num;
		notifyObservers();
	}

	this.getcurrent = function() {
		return current;
	}

	//Create observers for the model
	var observers = [];

	this.addObservers = function(observer)
	{
		observers.push(observer)
	}

	var notifyObservers = function()
	{
			for (i in observers)
			{
				observers[i].update();
			}
	}

	this.removeObserver = function(observer)
	{
		//find the index of the observer
		var index = observers.indexOf(observer);
		//remove the observer from the array
		observers.splice(index,1);
	}


	//TODO Lab 1 implement the data structure that will hold number of guest
	// and selected dishes for the dinner menu

	//number of the guests
	var  NumberOfGuests =1;
	//array with the ids of the dishes
	var ordered_dishes = [];
	//array with the types of the dishes
	var types = [ "main course" , "side dish" , "dessert" , "appertizer" , "salad" , "bread" , "breakfast" , "soup" , "beverage", "sauce" , "drink"];

	this.getTypes = function()
	{
		return types;
	}

	//DONE
	this.setNumberOfGuests = function(num)
  {
		//TODO Lab 1
    NumberOfGuests = num;
		notifyObservers();

	}

	//DONE
	this.getNumberOfGuests = function() {
		//TODO Lab 1
    return NumberOfGuests;
	}

	//DONE
	//Returns the dish that is on the menu for selected type
	this.getSelectedDish = function(type) {
		//TODO Lab 1
		for (i in ordered_dishes)
		{
			var dish = this.getDish(ordered_dishes[i]);
			if (dish.type == type)
			{
				return dish;
			}
		}


	}

	//DONE
	//fetch all the dishes of every type concat to one array and return
	this.getAllMenuDishes = function()
	{
		//use the arrays to retrieve info for all the type of dishes
		var starter = this.getAllDishes("starter");
		var dessert = this.getAllDishes("dessert");
		var main = this.getAllDishes("main dish");

		//concat the arrays to one
		starter = starter.concat(main);
		all = starter.concat(dessert)

		return all;



	}
  //DONE
	//Returns all the dishes on the menu.
	this.getFullMenu = function(callback , errorCallback) {
		// TODO Lab 1


		for (i in ordered_dishes)
		{
			$.ajax( {

			type: "GET",
			 url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+ ordered_dishes[i] + "/information",
			 headers: {
				 'X-Mashape-Key': "Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB"
			 },
			 success: function(data) {
				 generalController.loaderOff();
				 callback(data);
			 },
			 error: function(error) {
				 errorCallback(error)
			 }
		 })


		}

	}


	//DONE
	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		//TODO Lab 1
		var alldishes = new Array();
		var ingredient = new Array();

		//add to the array alldishes the dishes from the ordered_dishes
		for (i in this.ordered_dishes)
		{
			alldishes[i] = this.getDish(this.ordered_dishes[i]);
		}
		//assign to the new array the ingedients
		for (i in alldishes)
		{
			for (j in alldishes[i].ingredients)
			{
				ingredient.push(alldishes[i].ingredients[j]);
			}
		}

		//returns the name of all the ingredients of all the dishes
		return ingredient;

	}


	this.getDishPrice = function(id)
	{
		var sum = 0;
		var dish = this.getDish(id);
		for (i in dish.ingredients)
		{
			sum = sum + dish.ingredients[i].price;
		}

		return sum;

	}
	//DONE
	//Returns the total price of the menu (all the ingredients).
	this.getTotalMenuPrice = function(callback , errorCallback) {
		//TODO Lab 1

		for (i in ordered_dishes)
		{
			$.ajax( {

			type: "GET",
			 url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+ ordered_dishes[i] + "/information",
			 headers: {
				 'X-Mashape-Key': "Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB"
			 },
			 success: function(data) {
				 generalController.loaderOff();
				 callback(data)
			 },
			 error: function(error) {
				 errorCallback(error)
			 }
		 })


		}
	}

	// DONE
	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		//TODO Lab 1

		// //store the dish to a variable
		// var new_dish = this.getDish(id);
		// found = false;
		// //iterate through the array
		// for (i in ordered_dishes)
		// {
		// 	//every time store the dish from the ordered_dishes
		// 	var current = this.getDish (ordered_dishes[i]);
		// 	//check if the type of the new dish is the same with the existing ones
		// 	if (new_dish.type == current.type)
		// 	{
		// 		//if it is replace it
		// 		ordered_dishes[i] = id;
		// 		found =true;
		// 	}
		// }
		// //if they did not found any same type it means that the person did not order any dish of that type so just push the id to the ordered_dishes
		// if (found == false)
		// {
		// 	ordered_dishes.push(id);
		// }
		ordered_dishes.push(id);
		notifyObservers();
	}

	//DONE
	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		//TODO Lab 1
		for (i in this.ordered_dishes)
		{
			if (id == this.ordered_dishes[i])
			{
				this.ordered_dishes.splice(i,1);
			}
		}

	}


	this.getonlinedishes = function (type , filter,callback , errorCallback) {

		$.ajax( {

		type: "GET",
		 url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query="+filter +"&type=" + type +"&number=100",
		 headers: {
			 'X-Mashape-Key': "Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB"
		 },
		 success: function(data) {
			 generalController.loaderOff();
			 callback(data)
		 },
		 error: function(error) {
			 errorCallback(error)
		 }
	 })

	}

	//DONE
	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type,filter) {
	  return dishes.filter(function(dish) {
		var found = true;
		if(filter)
    {
			found = false;
			dish.ingredients.forEach(function(ingredient) {
				if(ingredient.name.indexOf(filter)!=-1) {
					found = true;
				}
			});
			if(dish.name.indexOf(filter) != -1)
			{
				found = true;
			}
		}
	  	return dish.type == type && found;
	  });
	}
	this.getdishdetails = function (id , callback , errorCallback) {
		$.ajax( {

		type: "GET",
		 url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+ id + "/information",
		 headers: {
			 'X-Mashape-Key': "Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB"
		 },
		 success: function(data) {
			 generalController.loaderOff();
			 callback(data)
		 },
		 error: function(error) {
			 errorCallback(error)
		 }
	 })
	}

	//DONE
	//function that returns a dish of specific ID
	this.getDish = function (id) {
	  for(key in dishes){
			if(dishes[key].id == id) {
				return dishes[key];
			}
		}
	}


	// the dishes variable contains an array of all the
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name,
	// quantity (a number), price (a number) and unit (string
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
    'class':'toast',
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
    'class':'sourdough',
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
    'class':'bakedbrie',
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
    'class':'meatballs',
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
    'class':'bakedbrie',
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
    'class':'meatballs',
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
    'class':'meatballs',
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
    'class':'icecream',
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
    'class':'icecream',
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
    'class':'icecream',
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}
