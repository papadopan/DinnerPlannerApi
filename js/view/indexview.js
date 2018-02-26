var IndexView = function(container, model)
{
  //save the container to a variable
  //the controller can fetch it
  this.wrapper = container;
  //fetch the id for
  var maindiv = container.find("#indexview")[0];

  var description = document.createElement("DIV");
  description.classList.add("description");
  var p = document.createElement("P");
  p.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  var button = document.createElement("BUTTON");
  button.setAttribute("type", "button");
  button.setAttribute("name", "button");
  button.setAttribute("id", "start_button");
  button.classList.add("btn");
  button.classList.add("deliver");
  button.innerHTML = "Create Dinner";
  //start appending the children
  description.appendChild(p);
  description.appendChild(button);
  maindiv.appendChild(description);

  this.hide = function()
  {
    container.hide();
  }




}
