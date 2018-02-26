var DescView = function (container, model)
{

  var showDesc = function()
  {



  var maindiv = container.find("#present")[0];
  while (maindiv.firstChild)
  {
     maindiv.removeChild(maindiv.firstChild);
   }

  var all = model.getFullMenu( function(data){

    var present = container.find("#present")[0];

    var plates_list = document.createElement("DIV");
    plates_list.classList.add("plates_list");
    var plate_description = document.createElement("DIV");
    plate_description.classList.add("plate_description");
    var img = document.createElement("IMG");
    img.setAttribute("src" ,  data.image);
    var heading = document.createElement("H1");
    heading.innerHTML = data.title ;
    var p = document.createElement("P");
    p.innerHTML = data.instructions;
    plate_description.appendChild(img);
    plate_description.appendChild(heading);
    plate_description.appendChild(p);
    plates_list.appendChild(plate_description);


    var plate_prep = document.createElement("DIV");
    plate_prep.classList.add("plate_prep");
    var heading4 = document.createElement("H4");
    heading4.innerHTML = "preparation";
    var p1 = document.createElement("P");
    p1.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    var p2 = document.createElement("P");
    p2.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


    plate_prep.appendChild(heading4);
    plate_prep.appendChild(p1);
    plate_prep.appendChild(p2);

    plates_list.appendChild(plate_prep);
    present.appendChild(plates_list);



  }, function(error){
    console.log("There is a problem with the dishes from the description view")
  });
  for (i in all)
    {


    }
  }

  this.show = function(){
    container.show();
  }
//i am an observer of the model
    model.addObservers(this);

    this.update = function()
    {
      showDesc();
    }

    showDesc();

}
