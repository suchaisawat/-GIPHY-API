  var animals = ["cat", "dog", "rabbit", "hamster", "goldfish", "bird", "ferret", "chicken", "frog"];
  // Generic function for capturing the movie name from the data-attribute
  function alertAnimalName() {
      var animalName = $(this).attr("data-name");
      alert(animalName);
  }
  // Function for displaying movie data
  function renderButtons() {
      // Deleting the movies prior to adding new movies
      // (this is necessary otherwise we will have repeat buttons)
      $("#buttons-view").empty();
      // Looping through the array of movies
      for (var i = 0; i < animals.length; i++) {
        
          var a = $("<button>");
          
          a.addClass("animal");
       
          a.attr("data-name", animals[i]);
         
          a.text(animals[i]);
         
          $("#buttons-view").append(a);
      }
  }
  function generateGif() {
      var animalClick = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animalClick + "&api_key=dc6zaTOxFJmzC&limit=10";
      console.log(queryURL);
      $.ajax({
              url: queryURL,
              method: "GET"
          })
          // After the data from the AJAX request comes back
          .done(function (response) {
              var results = response.data;
              console.log(response);
              for (var i = 0; i < results.length; i++) {
                  // Only taking action if the photo has an appropriate rating
                  if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                      // Creating a div with the class "item"
                      var gifDiv = $("<div class='item'>");
                      // Storing the result item's rating
                      var rating = results[i].rating;
                      console.log(rating);
                      // Creating a paragraph tag with the result item's rating
                      var p = $("<p>").text("Rating: " + rating);
                      // Creating an image tag
                      var animalImage = $("<img>");
                      // Giving the image tag an src attribute of a proprty pulled off the
                      // result item
                      animalImage.attr("src", results[i].images.fixed_height.url);
                      // Appending the paragraph and personImage we created to the "gifDiv" div we created
                      gifDiv.append(p);
                      gifDiv.append(animalImage);
                      // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                      $("#animalGif").prepend(gifDiv);
                  }
              }
          });
  };

  // This function handles events where one button is clicked
  $("#add-animal").on("click", function (event) {
      // Preventing the buttons default behavior when clicked (which is submitting a form)
      event.preventDefault();
      // This line grabs the input from the textbox
      var animalInput = $("#animal-input").val().trim();
      // Adding the movie from the textbox to our array
      animals.push(animalInput);
      // Calling renderButtons which handles the processing of our movie array
      renderButtons();
  });
  $(document).on("click", ".animal", alertAnimalName, generateGif);
  renderButtons();
