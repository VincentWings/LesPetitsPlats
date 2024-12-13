/*********************************************************************************
*
* Filters
* 
*
/*********************************************************************************/

// Import helper functions for displaying recipes, error messages, and recipe counts
import {
    displayErrorMessage
} from "../utils/displayErrorMessage.js";
import {
    displayRecipes
} from "../utils/displayRecipes.js";
import {
    displayRecipesNumber
} from "../utils/displayRecipesNumber.js";

// Main function to filter recipes
export function filterRecipes(recipes, filterOptions) {
    // Prevent default behavior of the span.btn inside the search form
    document.querySelectorAll('form.search-form span.btn').forEach(span => {
        span.addEventListener('click', function(event) {
            // Prevent form submission when clicking on a span with class 'btn'
            if (event.target.tagName.toLowerCase() === 'span') {
                event.preventDefault();
                console.log("Le comportement par défaut du span a été empêché.");
                
                // Optionally, you can trigger a search or other action here
                const searchQuery = document.querySelector('.search-form input[type="search"]').value;
                console.log("Rechercher avec le texte : ", searchQuery);
                
                // You can call a search function if necessary
                // searchRecipes(searchQuery);
            }
        });
    });

    // Extract values from the filter options
    const {
        searchbarText,
        filters
    } = filterOptions;
    const {
        selectedIngredients,
        selectedAppliances,
        selectedUstensils
    } = filters;

    // Create a case-insensitive search pattern using the search text
    const regex = new RegExp(searchbarText, "gi");

    // Remove any existing error message
    const errorMessage = document.querySelector(".error-message");
    if (errorMessage) errorMessage.remove();

    // If no filters are applied, show all recipes
    if (!searchbarText && selectedIngredients.length === 0 && selectedAppliances.length === 0 && selectedUstensils.length === 0) {
        // Trigger a custom event to update dropdowns with all recipes
        const newFilterRecipes = new CustomEvent("new-filter", {
            detail: recipes
        });
        document.getElementById("dropdown-ingredients").dispatchEvent(newFilterRecipes);
        document.getElementById("dropdown-appliances").dispatchEvent(newFilterRecipes);
        document.getElementById("dropdown-utils").dispatchEvent(newFilterRecipes);

        // Display all recipes and update the count
        displayRecipes(recipes);
        displayRecipesNumber(recipes);
        return; // Exit the function
    }

    // Use the filter method to apply all conditions
    const filteredRecipes = recipes.filter(recipe => {
        // Check if the recipe matches the search text
        const matchSearchBar = !searchbarText ||
            regex.test(recipe.name) ||
            regex.test(recipe.description) ||
            recipe.ingredients.some(ing => regex.test(ing.ingredient));

        // Check if the recipe matches the selected appliance
        const matchAppliances = selectedAppliances.length === 0 ||
            selectedAppliances.some(appliance => recipe.appliance.toLowerCase().includes(appliance.toLowerCase()));

        // Check if the recipe matches all selected ingredients
        const matchIngredients = selectedIngredients.length === 0 ||
            selectedIngredients.every(selectedIng =>
                recipe.ingredients.some(recipeIng => recipeIng.ingredient.toLowerCase().includes(selectedIng.toLowerCase()))
            );

        // Check if the recipe matches all selected ustensils
        const matchUstensils = selectedUstensils.length === 0 ||
            selectedUstensils.every(ustensil =>
                recipe.ustensils.map(u => u.toLowerCase()).includes(ustensil.toLowerCase())
            );

        // Return true if the recipe matches all conditions
        return matchSearchBar && matchIngredients && matchAppliances && matchUstensils;
    });

    // Display filtered recipes or show an error if none match
    if (filteredRecipes.length > 0) {
        // Trigger a custom event to update dropdowns with filtered recipes
        const newFilterRecipes = new CustomEvent("new-filter", {
            detail: filteredRecipes
        });
        document.getElementById("dropdown-ingredients").dispatchEvent(newFilterRecipes);
        document.getElementById("dropdown-appliances").dispatchEvent(newFilterRecipes);
        document.getElementById("dropdown-utils").dispatchEvent(newFilterRecipes);

        // Display the filtered recipes and update the count
        displayRecipes(filteredRecipes);
        displayRecipesNumber(filteredRecipes);
    } else {
        // If no recipes match, show an error and update the count to 0
        displayErrorMessage(searchbarText);
        displayRecipesNumber([]);
    }
}