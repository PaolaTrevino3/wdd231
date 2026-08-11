import {
  saveProfile,
  getProfile
} from "./storage.js";

const form =
  document.querySelector("#routine-form");

const previewButton =
  document.querySelector("#preview-button");

const preview =
  document.querySelector("#routine-preview");

const savedProfile =
  getProfile();

if (savedProfile) {

  document.querySelector("#name").value =
    savedProfile.name || "";

  document.querySelector("#email").value =
    savedProfile.email || "";

  document.querySelector("#skin-type").value =
    savedProfile.skinType || "";

  document.querySelector("#concern").value =
    savedProfile.concern || "";

}

const routines = {

  hydration: {
    morning: [
      "Gentle cleanser",
      "Hydrating serum",
      "Moisturizer",
      "Broad-spectrum sunscreen"
    ],

    evening: [
      "Gentle cleanser",
      "Hydrating serum",
      "Moisturizer"
    ]
  },

  breakouts: {
    morning: [
      "Gentle cleanser",
      "Niacinamide",
      "Lightweight moisturizer",
      "Broad-spectrum sunscreen"
    ],

    evening: [
      "Gentle cleanser",
      "Salicylic acid product",
      "Moisturizer"
    ]
  },

  redness: {
    morning: [
      "Gentle cleanser",
      "Centella or soothing serum",
      "Barrier-support moisturizer",
      "Broad-spectrum sunscreen"
    ],

    evening: [
      "Gentle cleanser",
      "Soothing serum",
      "Barrier-support moisturizer"
    ]
  },

  brightening: {
    morning: [
      "Gentle cleanser",
      "Vitamin C",
      "Moisturizer",
      "Broad-spectrum sunscreen"
    ],

    evening: [
      "Gentle cleanser",
      "Niacinamide",
      "Moisturizer"
    ]
  },

  texture: {
    morning: [
      "Gentle cleanser",
      "Hydrating serum",
      "Moisturizer",
      "Broad-spectrum sunscreen"
    ],

    evening: [
      "Gentle cleanser",
      "Gentle exfoliating treatment",
      "Moisturizer"
    ]
  },

  renewal: {
    morning: [
      "Gentle cleanser",
      "Antioxidant serum",
      "Moisturizer",
      "Broad-spectrum sunscreen"
    ],

    evening: [
      "Gentle cleanser",
      "Retinoid or renewal treatment",
      "Barrier-support moisturizer"
    ]
  }

};

previewButton.addEventListener(
  "click",
  () => {

    const skinType =
      document.querySelector(
        "#skin-type"
      ).value;

    const concern =
      document.querySelector(
        "#concern"
      ).value;

    const routineLength =
      document.querySelector(
        'input[name="routine-length"]:checked'
      )?.value;


    if (
      !skinType ||
      !concern ||
      !routineLength
    ) {

      preview.innerHTML = `
        <p class="eyebrow">
          Almost there
        </p>

        <h2>
          Complete your routine choices.
        </h2>

        <p>
          Select a skin type, main goal,
          and routine preference first.
        </p>
      `;

      return;

    }


    const selected =
      routines[concern];


    let morning =
      selected.morning;

    let evening =
      selected.evening;


    if (routineLength === "simple") {

      morning =
        morning.slice(0, 4);

      evening =
        evening.slice(0, 3);

    }


    preview.innerHTML = `

      <p class="eyebrow">
        Your Glow Routine
      </p>

      <h2>
        A ${routineLength} routine for ${skinType} skin.
      </h2>

      <div class="routine-columns">

        <section class="routine-column">

          <h3>
            Morning
          </h3>

          <ol>
            ${morning
              .map(
                (step) =>
                  `<li>${step}</li>`
              )
              .join("")}
          </ol>

        </section>


        <section class="routine-column">

          <h3>
            Evening
          </h3>

          <ol>
            ${evening
              .map(
                (step) =>
                  `<li>${step}</li>`
              )
              .join("")}
          </ol>

        </section>

      </div>

    `;

  }
);

form.addEventListener(
  "submit",
  () => {

    const formData =
      new FormData(form);

    const profile = {

      name:
        formData.get("name"),

      email:
        formData.get("email"),

      skinType:
        formData.get("skin-type"),

      concern:
        formData.get("concern"),

      routineLength:
        formData.get("routine-length")

    };

    saveProfile(profile);

  }
);
