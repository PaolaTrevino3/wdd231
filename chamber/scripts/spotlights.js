const spotlightContainer = document.querySelector('#spotlights');

async function loadSpotlights() {
    if (!spotlightContainer) {
        return;
    }

    try {
        const response = await fetch('data/members.json');

        if (!response.ok) {
            throw new Error('Unable to load member data for spotlights');
        }

        const data = await response.json();
        const members = Array.isArray(data.members) ? data.members : data;
        const eligible = members.filter((member) =>
            member.membership === 3 || member.membership === 2
        );
        const featured = eligible
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        spotlightContainer.innerHTML = featured.map((member) => `
            <article class="spotlight-card">
                <img
                    src="images/${member.image}"
                    alt="${member.name} business spotlight"
                    width="320"
                    height="220"
                    loading="lazy"
                >
                <div class="spotlight-content">
                    <h3>${member.name}</h3>
                    <p>${member.description}</p>
                    <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit site</a>
                </div>
            </article>
        `).join('');
    } catch (error) {
        spotlightContainer.innerHTML = '<p class="error-message">Featured businesses are currently unavailable.</p>';
        console.error(error);
    }
}

loadSpotlights();
