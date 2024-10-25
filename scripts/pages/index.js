/*********************************************************************************
*
* Index.js
*
/*********************************************************************************/

import { Recipe } from "../models/recipe.js"; // Importing the Recipe class from the models directory
import { RecipeCard } from '../templates/recipecard.js'; // Importing the RecipeCard class to create recipe cards for display

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

    console.log(recipes); // Logs the recipes array to the console

    return recipes; // Returns the recipes array
  } catch (error) {
    // Logs any fetch or JSON parsing errors to the console
    console.error("Failed to retrieve recipes:", error);
    return []; // Returns an empty array if there's an error
  }
}

/**
 * Displays recipes in the HTML by creating and inserting recipe cards.
 * 
 * @param {Array} recipes - An array of recipe objects to display
 * @param {string} inputText - The user's search input for recipe filtering (optional)
 */
const displayRecipes = (recipes, inputText) => {
  const sectionRecipes = document.querySelector('#section-recipes .container');
  sectionRecipes.innerHTML = ''; // Clears the container before inserting new recipe cards

  // Checks if there are no recipes to display
  if (recipes.length === 0) {
    sectionRecipes.className = 'container recipes-not-found';
    const recipesNotFoundDOM = document.createElement('p');
    recipesNotFoundDOM.textContent = `No recipes contain '${inputText}'. Try searching for “apple pie,” “fish,” etc.`;
    sectionRecipes.appendChild(recipesNotFoundDOM); // Adds message if no recipes match the search
  } else if (recipes.length > 0) {
    sectionRecipes.className = 'container recipes-found';
    
    // Creates a div with the 'row' class to arrange recipe cards in a row
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    // Iterates over each recipe to create and display a recipe card
    recipes.forEach((recipeData) => {
      const recipe = new Recipe(recipeData); // Creates an instance of the Recipe class
      const recipeCard = new RecipeCard(recipe); // Creates a RecipeCard instance to handle display
      const cardDOM = recipeCard.createRecipeCard(); // Creates the HTML structure for the recipe card

      // Adds each recipe card to the row div
      rowDiv.appendChild(cardDOM);
    });

    // Appends the row div containing recipe cards to the main section
    sectionRecipes.appendChild(rowDiv);
  }
};

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
  }
}

// Starts the app by calling the init function
init();