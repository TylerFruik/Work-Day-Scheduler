// ! This file was written from scratch. Code is commented to explain functionality.
// this function is wrapped in a jQuery call to enure that the code isn't
// run until the browser has finished rendering all html elements.
$(function () {
  // sets the current hour by calling the DayJS API
  var currentHour = dayjs().hour() - 5;
  console.log(currentHour);
  // iterates over each hour and puts previously saved data in the .description element.
  // The i < 18 is because 5PM has the hour-17 id.
  for (var i = 9; i < 18; i++) {
    $(`#hour-${i} .description`).val(localStorage.getItem(`hour-${i}`))
  }
  // This if statement determines the CSS styling. It compares the current hour
  // to the hour in each div and sets gray if its past, red if present, and green if its future.
  $('.time-block').each(function () {
    var rowHour = parseInt($(this).attr('id').split('-')[1])
    console.log(rowHour);
    if (rowHour < currentHour) {
      $(this).addClass('past');
      $(this).removeClass('present');
      $(this).removeClass('future');
    } 
    else if (rowHour === currentHour) {
      $(this).removeClass('past');
      $(this).addClass('present');
      $(this).removeClass('future');
    } else {
      $(this).removeClass('past');
      $(this).removeClass('present');
      $(this).addClass('future');
    }
  });
  $('.saveBtn').on('click', function () {
    var hourKey = $(this).parent().attr('id');
    var activity = $(this).siblings('.description').val()
    localStorage.setItem(hourKey, activity)
  });
  // Calls the function at the end of the program to generate the header
  // with the specified format.
  getCurrentDate();
});

function getCurrentDate() {
  var now = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(now);
}
