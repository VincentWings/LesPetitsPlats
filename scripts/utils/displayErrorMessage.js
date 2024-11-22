// Function to display an error message when no recipes match the search
export function displayErrorMessage(search) {
    // Clear all recipes currently displayed on the page
    const cardSection = document.querySelector("#section-recipes .row");
    cardSection.innerHTML = ""; // Remove all content inside the recipe section

    // Find the main container where the error message will be displayed
    const mainContainer = document.querySelector("#section-recipes");

    // Create a main container for the error message
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container"); // Add Bootstrap's container class for proper alignment

    // Create a row to organize the layout
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row"); // Add Bootstrap's row class for layout structure

    // Create a column for the error message
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-12"); // Add Bootstrap's col-12 class for full-width alignment

    // Create the error message element
    const errorMessage = document.createElement("div");
    errorMessage.setAttribute("role", "alert"); // This makes the message accessible for screen readers
    errorMessage.classList.add("error-message", "alert", "alert-warning"); // Add Bootstrap classes for styling
    errorMessage.textContent = `Aucune recette ne contient "${search}". Vous pouvez chercher "tarte aux pommes", "poisson", etc.`; // Set the error message text

    // Add the error message inside the column
    colDiv.appendChild(errorMessage);
    // Add the column inside the row
    rowDiv.appendChild(colDiv);
    // Add the row inside the container
    containerDiv.appendChild(rowDiv);

    // Add the complete error message structure to the main container
    mainContainer.appendChild(containerDiv);

    // Return the error message element (optional, if needed later)
    return errorMessage;
}
