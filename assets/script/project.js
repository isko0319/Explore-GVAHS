function autocompleteFunction() {
    var input = document.getElementById("searchInput");
    var searchValue = input.value.toLowerCase();
    var itemsList = document.getElementsByClassName("item");

    // Show autocomplete suggestions
    var autocompleteList = document.getElementById("autocompleteList");
    autocompleteList.style.display = "block";

    // Loop through items to find matches
    for (var i = 0; i < itemsList.length; i++) {
        var currentItem = itemsList[i].textContent.toLowerCase();

        if (currentItem.includes(searchValue)) {
            // Display matching item
            itemsList[i].style.display = "block";
        } else {
            // Hide non-matching items
            itemsList[i].style.display = "none";
        }
    }
}

function showAutocompleteSuggestions(suggestions) {
    var autocompleteList = document.getElementById("autocompleteList");

    // Clear previous suggestions
    autocompleteList.innerHTML = "";

    // Display suggestions
    for (var i = 0; i < suggestions.length; i++) {
        var suggestion = suggestions[i];

        // Create a div for each suggestion
        var suggestionDiv = document.createElement("div");
        suggestionDiv.textContent = suggestion;

        // Set a click event to fill the search input with the selected suggestion
        suggestionDiv.onclick = function () {
            document.getElementById("searchInput").value = this.textContent;
            autocompleteList.innerHTML = ""; // Clear suggestions after selection
        };

        autocompleteList.appendChild(suggestionDiv);
    }
}
