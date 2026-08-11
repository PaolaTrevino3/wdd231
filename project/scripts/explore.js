import {
  getFavorites,
  toggleFavorite
} from "./storage.js";

import {
  applyTheme,
  resetTheme
} from "./themes.js";

const grid =
  document.querySelector("#ingredient-grid");

const errorMessage =
  document.querySelector("#ingredient-error");

const filterButtons =
  document.querySelectorAll(".filter-chip");

const savedCount =
  document.querySelector("#saved-count");

const dialog =
  document.querySelector("#ingredient-dialog");

const closeDialog =
  document.querySelector("#close-dialog");

const dialogCategory =
  document.querySelector("#dialog-category");

const dialogTitle =
  document.querySelector("#dialog-title");

const dialogBenefit =
  document.querySelector("#dialog-benefit");

const dialogSkin =
  document.querySelector("#dialog-skin");

const dialogStep =
  document.querySelector("#dialog-step");

const dialogLevel =
  document.querySelector("#dialog-level");

const dialogNote =
  document.querySelector("#dialog-note");

const dialogSave =
  document.querySelector("#dialog-save");

let ingredients = [];
let currentIngredient = null;

async function loadIngredients() {

  try {

    const response =
      await fetch("data/ingredients.json");

    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status}`
      );
    }

    ingredients =
      await response.json();

    displayIngredients(ingredients);

    applyCategoryFromURL();

    updateSavedCount();

  } catch (error) {

    console.error(
      "Unable to load ingredients:",
      error
    );

    grid.innerHTML = "";

    errorMessage.hidden = false;

  }

}

function displayIngredients(items) {

  const favorites = getFavorites();

  grid.innerHTML =
    items.map((item) => {

      const isSaved =
        favorites.includes(item.id);

      return `
        <article class="ingredient-card">

          <p class="ingredient-category">
            ${item.categoryLabel}
          </p>

          <h2>
            ${item.name}
          </h2>

          <p class="ingredient-benefit">
            ${item.benefit}
          </p>

          <div class="ingredient-meta">

            <span>
              <strong>Skin:</strong>
              ${item.skinTypes.join(", ")}
            </span>

            <span>
              <strong>Step:</strong>
              ${item.routineStep}
            </span>

            <span>
              <strong>Level:</strong>
              ${item.level}
            </span>

          </div>

          <div class="ingredient-actions">

            <button
              class="details-button"
              type="button"
              data-details="${item.id}"
            >
              Learn More
            </button>

            <button
              class="save-button ${isSaved ? "saved" : ""}"
              type="button"
              data-save="${item.id}"
              aria-label="${isSaved ? "Remove" : "Save"} ${item.name}"
            >
              ${isSaved ? "♥" : "♡"}
            </button>

          </div>

        </article>
      `;

    }).join("");

}

function filterIngredients(category) {

  const filtered =
    category === "all"
      ? ingredients
      : ingredients.filter(
          (item) =>
            item.category === category
        );

  displayIngredients(filtered);

}

filterButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      filterButtons.forEach(
        (chip) =>
          chip.classList.remove("selected")
      );

      button.classList.add("selected");

      filterIngredients(
        button.dataset.category
      );

      applyTheme(
        button.dataset.category
      );

    }
  );

});

grid.addEventListener(
  "click",
  (event) => {

    const detailsButton =
      event.target.closest("[data-details]");

    const saveButton =
      event.target.closest("[data-save]");


    if (detailsButton) {

      const id =
        detailsButton.dataset.details;

      currentIngredient =
        ingredients.find(
          (item) =>
            item.id === id
        );

      openIngredientDialog(
        currentIngredient
      );

    }


    if (saveButton) {

      const id =
        saveButton.dataset.save;

      toggleFavorite(id);

      const currentCategory =
        document.querySelector(
          ".filter-chip.selected"
        )?.dataset.category || "all";

      filterIngredients(
        currentCategory
      );

      updateSavedCount();

    }

  }
);

function openIngredientDialog(item) {

  if (!item) {
    return;
  }

  applyTheme(item.theme);

  dialogCategory.textContent =
    item.categoryLabel;

  dialogTitle.textContent =
    item.name;

  dialogBenefit.textContent =
    item.benefit;

  dialogSkin.textContent =
    item.skinTypes.join(", ");

  dialogStep.textContent =
    item.routineStep;

  dialogLevel.textContent =
    item.level;

  dialogNote.textContent =
    item.note;

  updateDialogButton();

  dialog.showModal();

}

function updateDialogButton() {

  if (!currentIngredient) {
    return;
  }

  const favorites = getFavorites();

  const isSaved =
    favorites.includes(
      currentIngredient.id
    );

  dialogSave.textContent =
    isSaved
      ? "Remove from Saved"
      : "Save Ingredient";

}

dialogSave.addEventListener(
  "click",
  () => {

    if (!currentIngredient) {
      return;
    }

    toggleFavorite(
      currentIngredient.id
    );

    updateDialogButton();

    updateSavedCount();

  }
);

closeDialog.addEventListener(
  "click",
  () => {

    dialog.close();

    resetTheme();

  }
);

dialog.addEventListener(
  "close",
  resetTheme
);

function updateSavedCount() {
  savedCount.textContent =
    getFavorites().length;
}

function applyCategoryFromURL() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const category =
    params.get("category");

  if (!category) {
    return;
  }

  const matchingButton =
    [...filterButtons].find(
      (button) =>
        button.dataset.category === category
    );

  if (!matchingButton) {
    return;
  }

  filterButtons.forEach(
    (button) =>
      button.classList.remove("selected")
  );

  matchingButton.classList.add(
    "selected"
  );

  filterIngredients(category);

  applyTheme(category);

}

loadIngredients();
