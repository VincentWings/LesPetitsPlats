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

  // Check if the search bar input is valid
  checkInputValueValidity(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    const searchText = this.searchBar.value.trim(); // Remove extra spaces from the input
    //console.log("Search input:", searchText); // Log the input for debugging

    // If input has 3 or more characters, filter recipes
    if (searchText.length >= 3) {
      this.filterOptions.searchbarText = searchText; // Save the input in filter options
      filterRecipes(this.recipes, this.filterOptions); // Update the displayed recipes
    } else {
      // If input is too short, reset filters
      //console.log("Input too short, resetting filters");
      this.filterOptions.searchbarText = ""; // Clear the search text
      filterRecipes(this.recipes, this.filterOptions); // Reset the recipe display
      displayRecipesNumber([]); // Show 0 recipes
    }
  }

  // Add all the event listeners for the search bar
  initializeEventListeners() {
    // Highlight search bar when focused
    this.searchBar.addEventListener("focus", () => {
      this.searchForm.classList.add("highlight");
    });

    // Remove highlight when focus is lost
    this.searchBar.addEventListener("blur", () => {
      this.searchForm.classList.remove("highlight");
    });

    // Trigger search when the user types in the search bar
    this.searchBar.addEventListener("input", () => {
      const searchText = this.searchBar.value.trim();
      //console.log("Search bar input changed:", searchText);

      if (searchText.length >= 3) {
        //console.log("Valid input detected, filtering recipes");
        this.filterOptions.searchbarText = searchText;
        filterRecipes(this.recipes, this.filterOptions);
      } else {
        //console.log("Input too short, resetting filters");
        this.filterOptions.searchbarText = "";
        filterRecipes(this.recipes, this.filterOptions);
      }
    });

    // Trigger search when the button is clicked
    this.searchButton.addEventListener("click", (event) => {
      this.checkInputValueValidity(event);
    });

    // Trigger search when Enter is pressed
    this.searchBar.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.checkInputValueValidity(event);
      }
    });
  }
}