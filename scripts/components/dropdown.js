/*********************************************************************************
*
* Dropdown
*
/*********************************************************************************/

import { chooseOptions } from "../utils/filterOptions.js";

export class DropdownManager {
	constructor(id, dataArray, dataKey, filterOptions) {
		this.id = id;
		this.dataArray = dataArray;
		this.dataKey = dataKey;
		this.filterOptions = filterOptions;
		
		this.uniqueItems = new Set();
		this.itemsArray = [];
		this.capitalizedItemsArray = [];
		this.currentIndex = -1; // For keyboard navigation
		
		this.dropdown = document.getElementById(`${this.id}`); // The dropdown
		this.dropdownBtn = document.querySelector(`#${this.id} .dropdown-btn-filter`); // The button
		this.combobox = document.querySelector(`#${this.id} .option-list`); // The combobox node
		this.dropdownInput = document.querySelector(`#${this.id} .form-control`); // The Input
		this.dropdownElement = document.querySelector(`#${this.id} ul`); // The elements list		
		
		this.collectUniqueItems();
		this.initializeEventListeners();
	}
	
	/***********************************/
	/* Create the list of the elements */
	/***********************************/
	
	// Browse the recipe table to collect unique items
	collectUniqueItems(newRecipes) {
		
		const recipes = newRecipes || this.dataArray;
		this.uniqueItems = new Set();
		
		recipes.forEach(item => {
			
			if (item?.[this.dataKey]) {
				switch (typeof item[this.dataKey]) {
					
				case "object":   
					item[this.dataKey].forEach(subItem => {
						if (subItem?.ingredient) {
							this.uniqueItems.add(subItem.ingredient.toLowerCase());
						} else {
							this.uniqueItems.add(subItem.toLowerCase());
						}
					});
					break;
					
				case "string":
					this.uniqueItems.add(item[this.dataKey].toLowerCase());
					break;
					
				default:
					console.log("Erreur, format de données non pris en compte");
				} 
			}  
		});
		this.convertItemsToArray();
	}
	
	// Create an array of unique elements
	convertItemsToArray() {
		this.itemsArray = Array.from(this.uniqueItems);
		this.capitalizeItems();
	}
	
	// Re-capitalise the first letter of the first word
	capitalizeItems() {
		this.capitalizedItemsArray = this.itemsArray.map(item =>
			item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
		).sort();
		
		this.renderDropdownItems(this.capitalizedItemsArray);
	}
	
	/******************/
	/* Create the DOM */
	/******************/
	
	renderDropdownItems(array) {
		
		this.dropdownElement.innerHTML = "";
		
		array.forEach(item => {
			const element = document.createElement("li");
			element.setAttribute("role", "option");
			element.setAttribute("tabindex", "-1"); // ajout
			element.classList.add("dropdown-item", "d-flex", "flex-wrap", "align-items-center", "py-2");
			element.textContent = `${item}`;
			
			this.dropdownElement.appendChild(element);
		});
		
		chooseOptions(this.dataArray, this.filterOptions, this.id);
	}
	
	
	/***************************/
	/* Manage filter functions */
	/***************************/
	
	comboboxAutocomplete() {
		// Retrieve the current input value
		const filter = this.dropdownInput.value.trim().toLowerCase();
		const filteredOptions = [];		
		let count = 0;
		
		if (filter.length > 0) {
			
			const regex = new RegExp(filter, "gi");
			
			this.capitalizedItemsArray.forEach(item => {
				if (regex.test(item)) {
					// Add the element to filteredOptions
					count = filteredOptions.push(item);
				}
			});
			
			// Update the options in the drop-down list according to the filtered options
			if (count > 0) {
				this.renderDropdownItems(filteredOptions);
			} else {
				this.dropdownElement.innerHTML = `<span class="no-results">Aucun élément ne correspond</span>`;
			}
		} else {
			this.collectUniqueItems(this.dataArray); // Display the initial list of item
		}
	}
	
	
	/**********************************/
	/* Navigation management & events */
	/**********************************/
	
	// Functions for unfolding or folding the drop-down list
	dropdownOpen() {
		this.dropdown.setAttribute("aria-expanded", "true");
		this.dropdownBtn.setAttribute("aria-expanded", "true");
		this.dropdownInput.setAttribute("tabindex", "0");
	}
	
	dropdownClose() {
		this.dropdown.setAttribute("aria-expanded", "false");
		this.dropdownBtn.setAttribute("aria-expanded", "false");
		this.dropdownInput.setAttribute("tabindex", "-1");
	}
	
	toggleDropdown() {
		const isExpanded = this.dropdownBtn.getAttribute("aria-expanded") === "true";
		
		if (!isExpanded) {
			this.dropdownOpen();
		} else {
			this.dropdownClose();
		}
	}
	
	// Check if the screen is touch-sensitive
	isTouchScreen() {
		return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
	}

	// Use the arrow keys to scroll through the list
	browseOptions(event) {
		const options = this.dropdownElement.querySelectorAll("[role=\"option\"]");
	
		switch (event.key) {

		case "Backspace":
		case "Delete":
			this.comboboxAutocomplete();
			break;

		case "ArrowDown":
			event.preventDefault();
			if (this.currentIndex < options.length - 1) {
				this.currentIndex += 1;
			} else {
				this.currentIndex = 0;
			}
			console.log(this.currentIndex);
			options[this.currentIndex].focus();
			break;

		case "ArrowUp":
			event.preventDefault();
			if (this.currentIndex > 0) {
				this.currentIndex -= 1;
			} else {
				this.currentIndex = options.length - 1;
			}
			console.log(this.currentIndex);
			options[this.currentIndex].focus();
			break;

		case "Escape":
			this.combobox.setAttribute("aria-expanded", "false");
			this.dropdownInput.focus();
			break;
		}
	}
	
	
	// Initialization method for configuring event listeners
	initializeEventListeners() {
		
		// Updating filters
		this.dropdown.addEventListener("new-filter", (e) => {
			this.collectUniqueItems(e.detail); // e.detail contains a table of filtered recipes
			
		});
		
		// If the screen is not touch-sensitive
		if (!this.isTouchScreen()) {
			
			// Setting up hover events
			this.dropdown.addEventListener("mouseover", this.dropdownOpen.bind(this));
			this.dropdown.addEventListener("mouseout", this.dropdownClose.bind(this));
			
			// Setting up keyboard Enter button events
			this.dropdownBtn.addEventListener("keydown", (event) => {
				if (event.key === "Enter") {
					this.toggleDropdown();
				}
				if (event.key === "Escape") {
					this.dropdownClose();
				}
			});
			
			// If the screen is touch-sensitive 
		} else {
			
			// Setting up click events
			this.dropdownBtn.addEventListener("click", this.toggleDropdown.bind(this));
			
			// Add an event to close the dropdown on an external click
			document.addEventListener("click", (event) => {
				if (!this.dropdown.contains(event.target)) {
					this.dropdownClose();
				}
			});
		}
		
		// Input event
		this.dropdownInput.addEventListener("input", this.comboboxAutocomplete.bind(this));
		this.dropdownInput.addEventListener("keydown", (event) => {
			this.browseOptions(event);
		});

	}
}

// Select the dropdown button and the icon within it
const dropdownButton = document.querySelector('.section-filters__filters .btn');
const icon = dropdownButton.querySelector('.bi');

// Function to toggle the dropdown
const toggleDropdown = () => {
    // Toggle between bi-chevron-down and bi-chevron-up classes on the icon
    icon.classList.toggle('bi-chevron-down');
    icon.classList.toggle('bi-chevron-up');
};

// Add the event listener to the button
dropdownButton.addEventListener('click', toggleDropdown);

// Export the function to be used in other files
export { toggleDropdown };