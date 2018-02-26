$(function() {
	//We instantiate our model
	var model = new DinnerModel(this);

var loader = new LoaderView($("#loader") , model);

	var indexview = new IndexView($("#index") , model);
	var indexctrl = new IndexCtrl(indexview, this);
	// And create the instance of ExampleView
	//and attach the controller to the view
	var sidebarView = new SideBarView($("#sidebar"),model);
	var sidebarctrl = new SideBarCtrl(sidebarView , model , this);

	//create the instance for the MoneyView...the view with all the dishes and  the prices
	//and attach the controller to the view
	var menu = new MenuView($("#menu"),model);
	var menuctrl = new MenuCtrl(menu , model, this);

	//create the overview...it is the view with all the dishes populates the search
	//and attach the controller to the view
	var dishList = new DishListView($("#nside"),model);
	var dishListctrl = new DishListCtrl(dishList , model, this);

	//create the instance for the overview....creates the list with the li items
	//and attach the controller to the view
	var searchView = new SearchView($("#nside"),model);
	var searchctrl = new SearchCtrl(searchView , model , this);

	//create the instance for the planning....the view with the table of the ingredients
	//and attach the listener to the view
	var dishDetail = new DishDetail($("#plan"),model);
	var dishDetalctrl = new DishDetailCtrl (dishDetail , model , this )
	//creates the description view....the view with the three dishes and the preparation content
	var final_description = new DescView ($("#final_description"),model);

//hide the first view and go to the second
this.hideIndex = function()
{
	indexview.hide();
	sidebarView.show();
}
//hide the planner view and go to the main page
this.showFullMenu = function()
{
	// loader.show();
	indexview.hide();
	sidebarView.show();
	dishList.show();
	dishDetail.hide();
}
//display specific dish
this.displaySpecificDish = function()
{
	loader.show();
	dishList.hide();
	dishDetail.show();
}
//confirm the order
this.confirmation = function()
{

	indexview.hide();
	sidebarView.hide();
	menu.show();
}

this.go_back = function()
{
	menu.hide();
	sidebarView.show();
	dishList.show();
	dishDetail.hide();
}
this.print = function()
{

	menu.hide();
	final_description.show();
}
this.loaderOn = function()
{
	loader.show();
}
this.loaderOff = function()
{
	loader.hide();
}


});
