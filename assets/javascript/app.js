// Initial array of rappers
      var topics = ["J. Cole", "Kendrick Lamar", "Lil Yachty", "Post Malone", "Chance the Rapper", "Kanye", "Future", "Lil Uzi Vert", "21 Savage", "Big Sean", "Young Thug", "Travis Scott", "Migos", "Gucci Mane", "Desiigner"];

      // displayRapperGifs function re-renders the HTML to display the appropriate content
      function displayRapperGifs() {

        var rapper = $(this).attr("data-name");
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + rapper + "&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC";

        //"http://www.omdbapi.com/?t=" + rapper + "&y=&plot=short&apikey=40e9cece";

        // Creates AJAX call for the specific rapper button being clicked
        $.ajax({
          url: giphyURL,
          method: "GET"
        }).done(function(response) {

          $("#gifs-view").empty();
          $("#gifs-view").prepend("<h4> Click on the image to play the Gif </h4>");

          //console.log(response.data[0].rating);
          for (var j = 0; j < response.data.length; j++) {

            // Creating a div to hold the gif
            var gifDiv = $("<div class='gifClass'>");

            // Retrieving the URL for the image
            var imgURL = response.data[j].images.fixed_height_still.url;
            var movieURL = response.data[j].images.fixed_height.url;
            // console.log(imgURL);

            // Creating an element to hold the image
            var image = $("<img>")
              .attr("src", imgURL)
              .attr("data-video", movieURL)
              .attr("data-still", imgURL)
              .attr("data-state", "off")
              .addClass("gifImage");

            // Appending the image
            gifDiv.append(image);

            // Storing the rating data
            var rating = response.data[j].rating;

            // Creating an element to have the rating displayed
            var gifRating = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            gifDiv.append(gifRating);

            // Putting the entire gif above the previous gifs
            $("#gifs-view").append(gifDiv);
          }

        });

      }

      // Function for displaying rapper data
      function renderButtons() {

        // Deletes the rappers prior to adding new rappers
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Loops through the array of rappers
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generates buttons for each rapper in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of rapper to our button
          a.addClass("rapper btn btn-primary");
          // Added a data-attribute
          a.attr("data-name", topics[i]);
          a.attr("type", "button");
          // Provided the initial button text
          a.text(topics[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add rapper button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var rapper = $("#gif-input").val().trim();

        // The rapper from the textbox is then added to our array
        topics.push(rapper);

        // Calling renderButtons which handles the processing of our rapper array
        renderButtons();

        $("#gif-input").val("");

      });

      // Adding click event listeners to all elements with a class of "rapper"
      $(document).on("click", ".rapper", displayRapperGifs);

            // Calling the renderButtons function to display the intial buttons
      renderButtons();

      
      $("#gifs-view").on("click", ".gifImage", function(){
        var state = $(this).attr("data-state");
        if (state == "off") {
          var takeOut = $(this).attr("data-video");
          $(this).attr('src', takeOut);
          state = $(this).attr("data-state", "on");
        }
        else {
          var putIn = $(this).attr("data-still");
          $(this).attr('src', putIn);
          state = $(this).attr("data-state", "off"); 
        }
      });


