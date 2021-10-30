// Declare variables

var currentDay = $("#currentDay");
var timeBlocks = $(".time-block");
var scheduleArea = $(".schedule");

var toDoItems = [];
 var today = moment();
var currentDate = (today.format("LL"));
var currentHour = today.format("H");

// If no To-Dos, create array of objects
function startSchedule(){

//for every time block 
  timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {
      // Sets To-Do hour to same as data-hour
      hour: thisBlockHr,
      // Text to accept string
      text: "",
    }
    // add todoObj to toDoItems array
    toDoItems.push(todoObj);
  });

  // Save object to local storage
  localStorage.setItem("todos", JSON.stringify(toDoItems));
}

// Change color based on hour
function setUpTimeBlocks(){
    timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      //add style to time blocks to show where we are in the day
      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present")
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past")
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future")
      }
    });
}

function renderSchedule(){
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDoItems);
}

function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
      //set its text to what was added to textarea
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

// On doc load
$(document).ready(function(){
  // Format time-blocks
  setUpTimeBlocks();
  
  if(!localStorage.getItem("todos")){
    startSchedule();
  } 
  currentDay.text(currentDate);

  renderSchedule();

  scheduleArea.on("click", "button", saveHandler);
  
});


