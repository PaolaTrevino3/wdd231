import { getProfile } from "./storage.js";

const menuButton =
  document.querySelector("#menu-button");

const navigation =
  document.querySelector("#main-navigation");

if (menuButton && navigation) {

  menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    const isOpen =
      navigation.classList.contains("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuButton.textContent =
      isOpen ? "✕" : "☰";

  });

}

const year =
  document.querySelector("#current-year");

if (year) {
  year.textContent =
    new Date().getFullYear();
}

const modified =
  document.querySelector("#last-modified");

if (modified) {
  modified.textContent =
    `Last modified: ${document.lastModified}`;
}

const savedProfile =
  document.querySelector("#saved-profile");

const profileTitle =
  document.querySelector("#profile-title");

if (savedProfile && profileTitle) {

  const profile = getProfile();

  if (profile) {

    profileTitle.textContent =
      `Welcome back, ${profile.name}.`;

    savedProfile.textContent =
      `Your saved profile is ${profile.skinType} skin with a focus on ${profile.concern}.`;

  }

}
