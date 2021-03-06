
// Store Original html
var students = $(".student-item");
var studentNumber = students.length;

// Create Search Bar
var searchInputHtml = "<input id='search-input' placeholder='Search for students...' value=''>";
var searchButtonHtml = "<button id='search-button'>Search</button>";
var searchField = "<div class = 'student-search'>" + searchInputHtml + searchButtonHtml + "</div>";

$( "h2" ).after( searchField );

// Display filtered html

// Creating Search function
var searchStudents;
var searchInput = "";

searchStudents = function($students) {
  // cycle through each element, and show it if there's is a match
  $(".student-list").empty();
  var i;
  for ( i = 0; i < studentNumber; i++ ) {
    var name, email, info;
    name =  students.eq(i).find("h3").html().toLowerCase();
    email = students.eq(i).find("span").html().toLowerCase();
    info = name + " " + email;
    var list = students.eq(i)[0];
   if (info.includes(searchInput)) {
     // Render the page with displayHtml
     $(".student-list").append(list);
   }
  }
  if ($(".student-item").length === 0) {
    console.log("No Result Found");
    var message = "<p>No result found, please search again</p>";
    $(".student-list").append(message);
  }
  makeButtons();
  bindButtons();
  setActivePageSearch();
};

// Display active page
function setActivePage(n) {
  var x = n * 10;
  $(".student-item:visible").fadeOut(400, function() {
    $(".student-item").slice(x-10,x).fadeIn();
  });
  // take out the active class from the previous button
  var i;
  for (i = 0; i < $("#page-number li").length; i++) {
    $("#page-number li a").eq(i).attr("class","");
  }
  // add active class to current button
  $("#page-number li a").eq(n-1).attr("class","active");
}

// don't show animation when dynamically search student
function setActivePageSearch() {
  $(".student-item").hide();
  $(".student-item").slice(0,10).show();
  // take out the active class from the previous button
  var i;
  for (i = 0; i < $("#page-number li").length; i++) {
    $("#page-number li a").eq(i).attr("class","");
  }
  // add active class to current button
  $("#page-number li a").eq(0).attr("class","active");
}


//  Creating pagination buttons
function makeButtons() {
  var htmlButton = "";
  var i;
  var listNumber = $(".student-item").length;
  var pageNumber = Math.floor(listNumber/10) + 1;
  for (i = 0; i < pageNumber; i++) {
    var n = i+1;
  htmlButton += "<li><a class=''>" + n + "</a></li>";
}
$("#page-number").html(htmlButton);
}


// Bind each button with a click event
function bindButtons() {
  var i;
  for (i = 0; i < $("#page-number li").length; i++) {
  //  ???
 $("#page-number li a").eq(i).click(function() {
      var activePageNumber = $(this).html();
      setActivePage(activePageNumber);
    });
  }
}

// Bind Type to create value
$("#search-input").keyup(function() {
  searchInput = $(this).val().toLowerCase();
  //Extra Credit #2: dynamically filtering
  searchStudents();
});

// Bind the search function with pressing enter;
$("#search-input").keyup(function(e) {
  if(e.keyCode == 13) {
    searchStudents();
  }
});
// bind search button with search event
$("#search-button").click(function() {
  searchStudents();
});


makeButtons();
bindButtons();
setActivePageSearch();
