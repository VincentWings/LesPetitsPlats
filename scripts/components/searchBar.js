/*********************************************************************************
*
* Search Bar
*
/*********************************************************************************/

// Import necessary functions for updating the UI and filtering recipes
import {
  displayRecipesNumber
} from "../utils/displayRecipesNumber.js";
import {
  filterRecipes
} from "../utils/filters.js";
import {
  TagManager
} from "../utils/tags.js";

// This class handles the search bar interactions and filters recipes based on user input
export class SearchBar {
  constructor(recipes, filterOptions) {
    this.recipes = recipes; // List of all recipes
    this.filterOptions = filterOptions; // Object to store search and filter options

    // Get DOM elements related to the search bar
    this.searchForm = document.querySelector(".searchform"); // The form containing the search bar
    this.searchBar = document.getElementById("searchbar"); // The input field where the user types
    this.searchButton = document.getElementById("btn-search"); // The button to submit the search

    this.initialize(); // Set up event listeners and prepare the search bar
  }

  // Initialize event listeners for search bar functionality
  initialize() {
    this.initializeEventListeners();
  }

  // Highlight the search results in the displayed recipes
  highlightSearchResults(searchText) {
    const recipeElements = document.querySelectorAll(".recipe"); // Select all recipe elements
    recipeElements.forEach((recipe) => {
      const content = recipe.innerHTML; // Get the HTML content of each recipe
      const regex = new RegExp(`(${searchText})`, "gi"); // Create a case-insensitive regex for the search text
      const highlightedContent = content.replace(
        regex,
        `<span class="highlight-red">$1</span>` // Wrap matching text with a span for styling
      );
      recipe.innerHTML = highlightedContent; // Replace the content with the highlighted version
    });
  }

  // Clear highlights from the displayed recipes
  clearHighlights() {
    const recipeElements = document.querySelectorAll(".recipe"); // Select all recipe elements
    recipeElements.forEach((recipe) => {
      recipe.innerHTML = recipe.textContent; // Reset the content to plain text
    });
  }

  // Check if the search bar input is valid
  checkInputValueValidity(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    const searchText = this.searchBar.value.trim(); // Remove extra spaces from the input
    console.log("Search input:", searchText); // Log the input for debugging

    // If input has 3 or more characters, filter recipes and highlight matches
    if (searchText.length >= 3) {
      this.clearHighlights(); // Clear any previous highlights
      this.filterOptions.searchbarText = searchText; // Save the input in filter options
      filterRecipes(this.recipes, this.filterOptions); // Update the displayed recipes
      this.highlightSearchResults(searchText); // Highlight matching results
    } else {
      // If input is too short, reset filters and remove highlights
      this.filterOptions.searchbarText = ""; // Clear the search text
      filterRecipes(this.recipes, this.filterOptions); // Reset the recipe display
      this.clearHighlights(); // Remove any highlights
      displayRecipesNumber([]); // Show 0 recipes
    }
  }

  // Add all the event listeners for the search bar
  initializeEventListeners() {
    // When the user focuses on the search bar, add a highlight class
    this.searchBar.addEventListener("focus", () => {
      this.searchBar.classList.add("highlight"); // Add the highlight class
    });

    // When the user leaves the search bar, remove the highlight class
    this.searchBar.addEventListener("blur", () => {
      this.searchBar.classList.remove("highlight"); // Remove the highlight class
    });

    // When the user clicks the search button, check the input
    this.searchButton.addEventListener("click", (event) => {
      this.checkInputValueValidity(event);
    });

    // When the user presses Enter in the search bar, check the input
    this.searchBar.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.checkInputValueValidity(event);
      }
    });

    // When the input changes, clear filters and highlights if the search bar is empty
    this.searchBar.addEventListener("input", () => {
      const searchText = this.searchBar.value.trim(); // Get the current input
      console.log("Search bar input changed:", searchText);

      if (searchText === "") {
        console.log("Search bar empty, resetting filters and removing highlights");
        this.filterOptions.searchbarText = ""; // Clear search text
        this.clearHighlights(); // Remove any highlights
        filterRecipes(this.recipes, this.filterOptions); // Reset the displayed recipes
      }
    });
  }
}
