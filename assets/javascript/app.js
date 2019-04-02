var themesArray = ["The Office", "Brooklyn 99", "Parks and Recreation", "Saturday Night Live", "Seinfled", "Arrested Development", "The Inbetweeners", "Unbreakable Kimmy Schmidt", "Community", "Scrubs", "30 Rock", "That 70's Show", "The Big Bang Theory", "Family Guy", "The Simpsons"];

$(document).ready(function () {
    generateButtons(themesArray, "searchButton", "#buttons");
    function generateButtons(themesArray, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();
        for (i = 0; i < themesArray.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", themesArray[i]);
            a.text(themesArray[i]);
            $(areaToAddTo).append(a);
        }
    }
    $(document).on("click", ".searchButton", function () {
        $("#gifsarea").empty();
        var apiKey = "6fznV5Iz4JOvztoxT4h2TPsR1noYRugr";
        var type = $(this).data("type");
        console.log(type);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=" + apiKey + "&limit=10";
        $.ajax({ url: queryURL, method: "GET" })
            .done(function (response) {
                for (i = 0; i < response.data.length; i++) {
                    var newDiv = $("<div class='search-item'>");
                    var rating = response.data[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var animated = response.data[i].images.fixed_height_small.url;
                    var still = response.data[i].images.fixed_height_small_still.url;
                    var image = $("<img>");
                    image.attr("src", still);
                    image.attr("data-still", still);
                    image.attr("data-animated", animated);
                    image.attr("data-state", "still");
                    image.addClass("searchImage");
                    newDiv.append(p);
                    newDiv.append(image);
                    $("#gifsarea").append(newDiv);
                }
            });
    });
    $(document).on("click", ".searchImage", function () {
        var state = $(this).attr("data-state");
        if (state == "still") {
            $(this).attr("src", $(this).data("animated"));
            $(this).attr("data-state", "animated");
        }
        else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });
    $("#addtheme").on("click", function (event) {
        event.preventDefault();
        var newTheme = $("input").eq(0).val().trim();
        if (newTheme == "" || !themesArray.includes(newTheme)) {
            themesArray.push(newTheme);
            generateButtons(themesArray, "searchButton", "#buttons");
        }
    });
});