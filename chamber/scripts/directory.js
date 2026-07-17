const memberContainer =
document.querySelector("#members");

const gridButton =
document.querySelector("#grid-button");

const listButton =
  document.querySelector("#list-button");

async function getMemberData() {
  try {
    const response = await fetch(
      "data/members.json"
    );

    if (!response.ok) {
      throw new Error(
        `Unable to load member data: ${response.status}`
      );
    }

    const data = await response.json();

    displayMembers(data.members);
} catch (error) {
    membersContainer.innerHTML = `
      <p class="error-message">
        The member directory is temporarily unavailable.
      </p>
    `;

    console.error(error);
  }
}

function getMembershipName(level) {
  const levels = {
    1: "Member",
    2: "Silver Member",
    3: "Gold Member"
  };

  return levels[level] || "Member";
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");

    card.classList.add("member-card");

    card.innerHTML =`
      <img
        src="images/${member.image}"
        alt="${member.name}"
        width="400"
        height="260"
        loading="lazy"
      >

      <div class="member-content">
        <h3>${member.name}</h3>

        <p class="member-description">
          ${member.description}
        </p>

        <p>
          ${member.address}
        </p>

        <p>
          ${member.phone}
        </p>

        <span class="membership">
          ${getMembershipName(member.membership)}
        </span>

        <a
          href="${member.website}"
          target="_blank"
          rel="noopener"
          aria-label="Visit the ${member.name} website"
        >
          Visit Website
        </a>
      </div>
    `;

    membersContainer.appendChild(card);
  });
}

function setView(view) {
  const showGrid = view === "grid";

  membersContainer.classList.toggle(
    "member-grid",
    showGrid
  );

  membersContainer.classList.toggle(
    "member-list",
    !showGrid
  );

  gridButton.classList.toggle(
    "active-view",
    showGrid
  );

  listButton.classList.toggle(
    "active-view",
    !showGrid
  );

  gridButton.setAttribute(
    "aria-pressed",
    String(showGrid)
  );

  listButton.setAttribute(
    "aria-pressed",
    String(!showGrid)
  );
}

gridButton.addEventListener("click", () => {
  setView("grid");
});

listButton.addEventListener("click", () => {
  setView("list");
});

getMemberData();
