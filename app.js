 alert("Connect");
   

 
 // Initial array of movies
 var topics = ["cat", "dog", "rabbit", "hamster", "goldfish", "bird", "ferret", "chicken", "frog"];

function animalName() {
        var animalName = $(this).attr("data-name");

        alert(animalName);
      }
 function renderButtons() {
      $("#buttons-view").empty();
     for (var i = 0; i < topics.length -1 ; i++) {
         // Then dynamicaly generating buttons for each movie in the array
         // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
         var a = $("<button>");
         // Adding a class of movie to our button
         a.addClass("btn btn-primary");
         // Adding a data-attribute
         a.attr("data-name", topics[i]);
         a.attr("id", topics[i]);
         // Providing the initial button text
         a.text(topics[i]);
         // Adding the button to the HTML
         a.css("margin", "10px");
         $("#buttons-view").append(a);
     }
 }

    
 // This function handles events where one button is clicked
 $("#submit").on("click", function (event) {
     // Preventing the buttons default behavior when clicked (which is submitting a form)
     event.preventDefault();
     // This line grabs the input from the textbox
     var animal = $("#animal-input").val().trim();
     if (animal != ""){
          topics.push(animal); 
          renderButtons();}
    
 });

 $(document).on("click", ".btn btn-primary", animalName);
renderButtons();

 $("button").on("click", function () {
    
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
 });
    
    



 



 
