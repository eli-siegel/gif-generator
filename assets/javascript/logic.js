$(document).ready(function() {    

    var ballers = ["Kareem Abdul-Jabbar", "Michael Jordan", "Magic Johnson", "Lebron James", "Larry Bird", "Shaquille O'Neal", "Kobe Bryant"];

    function displayBallerGif() {
        var baller = $(this).attr("data-name");
        // Constructing a queryURL using the baller name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        baller + "&api_key=tECzTI9A25TRanyjLJh9Sio4DJWJPa7F&limit=10";

        $.ajax({
        url: queryURL,
        method: "GET"
            })

            .then(function(response) {
                console.log(queryURL);
                console.log(response);
                var results = response.data;

                $("#gif-div").empty();

                for (var i = 0; i < results.length; i++) {
                    var ballerDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var ballerGIF = $("<img>");
                    ballerGIF.attr("src", results[i].images.fixed_height_still.url);
                    ballerGIF.attr("data-still", results[i].images.fixed_height_still.url)
                    ballerGIF.attr("data-animate", results[i].images.fixed_height.url)
                    ballerGIF.attr("data-state", "still")
                    ballerGIF.addClass("gif");
                    ballerDiv.append(ballerGIF);
                    ballerDiv.append(p);
                    console.log(ballerGIF);
                    $("#gif-div").prepend(ballerDiv);
                }

                $(".gif").on("click", function(){
                    console.log(this);
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });

        }
        
    // Function for displaying gifs
      function renderButtons() {

        $("#button-div").empty();

        // Looping through the array of names
        for (var i = 0; i < ballers.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          
          var a = $("<button>");
          a.addClass("baller-btn");
          // Adding a data-attribute
          a.attr("data-name", ballers[i]);
          // Providing the initial button text
          a.text(ballers[i]);
          // Adding the button to the buttons-view div
          $("#button-div").append(a);
        }
      }
    
    $("#add-baller").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var baller = $("#baller-input").val().trim();
    
        // Adding baller name from the textbox to our array
        //if (baller.val()  != String) {
        ballers.push(baller);
    
        // Calling renderButtons
        renderButtons();
       // }
    });
    
    $(document).on("click", ".baller-btn", displayBallerGif);

    renderButtons();
        
});



