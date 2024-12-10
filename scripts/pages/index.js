/*********************************************************************************
*
* Index.js
*
/*********************************************************************************/

import { Recipe } from "../models/recipe.js"; // Importing the Recipe class from the models directory
import { RecipeCard } from "../templates/recipeCard.js"; // Importing the RecipeCard class to create recipe cards for display
import { displayRecipes } from "../utils/displayRecipes.js";
import { displayRecipesNumber } from "../utils/displayRecipesNumber.js";
import { DropdownManager } from "../components/dropdown.js";
import { SearchBar } from "../components/searchBar.js";

// Event listener that triggers once the page's content has fully loaded
document.addEventListener("DOMContentLoaded", function () {
  init(); // Starts the initialization process by calling the init function
});

/**
 * Fetches the recipe data from a local JSON file.
 *
 * @returns {Array} - Returns an array of recipes if the fetch is successful, or an empty array if there's an error.
 */
async function getRecipes() {
  const url = "data/recipes.json"; // Path to the JSON file containing the recipe data

  try {
    // Fetches the recipe data from the specified URL
    const response = await fetch(url);

    // Checks if the response is successful; if not, throws an error
    if (!response.ok) {
      throw new Error(`Network Error: ${response.statusText}`);
    }

    // Converts the response to JSON format
    const data = await response.json();
    const { recipes } = data; // Destructures to get the recipes array

    //console.log(recipes); // Logs the recipes array to the console

    return recipes; // Returns the recipes array
  } catch (error) {
    // Logs any fetch or JSON parsing errors to the console
    console.error("Failed to retrieve recipes:", error);
    return []; // Returns an empty array if there's an error
  }
}

/**
 * Initializes the app by loading and displaying the recipes.
 *
 * Calls the getRecipes function to fetch recipes and passes them to displayRecipes
 * if recipes were successfully retrieved.
 */
async function init() {
  const recipes = await getRecipes(); // Fetches recipes and waits for the data

  // If recipes are successfully fetched, display them
  if (recipes.length > 0) {
    displayRecipes(recipes); // Displays all recipes in the HTML
    displayRecipesNumber(recipes); // Displays the number of recipes

    // Initialize the filter options for the SearchBar
    const filterOptions = {
      searchbarText: "",
      filters: {
        selectedIngredients: [],
        selectedAppliances: [],
        selectedUstensils: [],
      },
    };

    // Create and initialize the SearchBar
    new SearchBar(recipes, filterOptions);

    new DropdownManager("dropdown-ingredients", recipes, "ingredients", filterOptions);
    new DropdownManager("dropdown-appliances", recipes, "appliance", filterOptions);
    new DropdownManager("dropdown-utils", recipes, "ustensils", filterOptions);
  }
}

// Starts the app by calling the init function
init();
