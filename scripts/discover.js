import { places } from "../data/places.mjs";

const container = document.querySelector("#places");
const visitMessage = document.querySelector("#visit-message");

if (container) {
    places.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("place-card");

        const imageSrc = `images/${place.image}`;

        card.innerHTML = `
            <h2>${place.name}</h2>

            <figure>
                <img
                    src="${imageSrc}"
                    alt="${place.name}"
                    width="300"
                    height="200"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='images/placeholder.svg';"
                >
            </figure>

            <address>${place.address}</address>

            <p>${place.description}</p>

            <button type="button">Learn More</button>
        `;

        container.appendChild(card);
    });
}

const now = Date.now();
const lastVisit = Number(localStorage.getItem("lastVisit"));

if (visitMessage) {
    if (!lastVisit) {
        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const days = Math.floor(
            (now - lastVisit) / (1000 * 60 * 60 * 24)
        );

        if (days < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (days === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${days} days ago.`;
        }
    }
}

localStorage.setItem("lastVisit", now);
