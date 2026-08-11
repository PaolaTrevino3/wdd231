const FAVORITES_KEY = "glowGuideFavorites";
const PROFILE_KEY = "glowGuideProfile";

export function getFavorites() {
  const saved = localStorage.getItem(FAVORITES_KEY);

  return saved ? JSON.parse(saved) : [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites)
  );
}

export function toggleFavorite(id) {
  const favorites = getFavorites();

  const updatedFavorites = favorites.includes(id)
    ? favorites.filter((favoriteId) => favoriteId !== id)
    : [...favorites, id];

  saveFavorites(updatedFavorites);

  return updatedFavorites;
}

export function saveProfile(profile) {
  localStorage.setItem(
    PROFILE_KEY,
    JSON.stringify(profile)
  );
}

export function getProfile() {
  const saved = localStorage.getItem(PROFILE_KEY);

  return saved ? JSON.parse(saved) : null;
}
