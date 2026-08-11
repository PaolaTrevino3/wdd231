const params =
  new URLSearchParams(
    window.location.search
  );


const name =
  params.get("name");

const email =
  params.get("email");

const skinType =
  params.get("skin-type");

const concern =
  params.get("concern");

const routineLength =
  params.get("routine-length");


const heading =
  document.querySelector(
    "#result-heading"
  );

const details =
  document.querySelector(
    "#result-details"
  );


if (name) {

  heading.textContent =
    `${name}'s Glow Profile`;

}


const values = [

  {
    label: "Name",
    value: name
  },

  {
    label: "Email",
    value: email
  },

  {
    label: "Skin type",
    value: skinType
  },

  {
    label: "Main goal",
    value: concern
  },

  {
    label: "Routine",
    value: routineLength
  }

];


details.innerHTML =
  values
    .filter(
      (item) => item.value
    )
    .map(
      (item) => `

        <div class="result-detail">

          <span>
            ${item.label}
          </span>

          <strong>
            ${item.value}
          </strong>

        </div>

      `
    )
    .join("");
