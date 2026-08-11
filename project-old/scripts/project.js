const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const year = document.querySelector('#year');
const routineList = document.querySelector('#routine-list');
const filterButtons = document.querySelectorAll('.filter-button');
const skinForm = document.querySelector('#skin-form');
const savedMessage = document.querySelector('#saved-message');
const thankyouMessage = document.querySelector('#thankyou-message');

const routines = [
  {
    type: 'oily',
    title: 'Oily Skin Routine',
    morning: ['Gel cleanser', 'Light moisturizer', 'Oil-free sunscreen'],
    night: ['Gentle cleanser', 'Niacinamide serum', 'Light moisturizer'],
    tip: 'Choose lightweight products and avoid heavy creams during the day.'
  },
  {
    type: 'dry',
    title: 'Dry Skin Routine',
    morning: ['Cream cleanser', 'Hydrating serum', 'Rich moisturizer', 'Sunscreen'],
    night: ['Gentle cleanser', 'Moisturizer', 'Facial oil if needed'],
    tip: 'Focus on hydration and avoid harsh scrubs.'
  },
  {
    type: 'sensitive',
    title: 'Sensitive Skin Routine',
    morning: ['Fragrance-free cleanser', 'Simple moisturizer', 'Mineral sunscreen'],
    night: ['Gentle cleanser', 'Barrier repair moisturizer'],
    tip: 'Introduce one new product at a time. Your face is not a testing laboratory, thankfully.'
  },
  {
    type: 'combination',
    title: 'Combination Skin Routine',
    morning: ['Balanced cleanser', 'Light moisturizer', 'Sunscreen'],
    night: ['Gentle cleanser', 'Hydrating serum', 'Moisturizer on dry areas'],
    tip: 'Use lighter products on oily areas and more moisture on dry areas.'
  }
];

function toggleMenu() {
  navigation.classList.toggle('open');
  menuButton.textContent = navigation.classList.contains('open') ? '✕' : '☰';
}

function buildList(items) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

function displayRoutines(filter = 'all') {
  if (!routineList) {
    return;
  }

  const filteredRoutines = filter === 'all'
    ? routines
    : routines.filter((routine) => routine.type === filter);

  routineList.innerHTML = filteredRoutines.map((routine) => `
    <article class="routine-card">
      <h3>${routine.title}</h3>
      <p><strong>Morning:</strong></p>
      <ul>${buildList(routine.morning)}</ul>
      <p><strong>Night:</strong></p>
      <ul>${buildList(routine.night)}</ul>
      <p><strong>Tip:</strong> ${routine.tip}</p>
    </article>
  `).join('');
}

function saveSkinProfile(event) {
  const nameInput = document.querySelector('#name');
  const skinTypeInput = document.querySelector('#skin-type');
  const feedback = document.querySelector('#form-feedback');

  if (!nameInput.value || !skinTypeInput.value) {
    event.preventDefault();
    feedback.textContent = 'Please complete your name and skin type before submitting.';
    return;
  }

  const profile = {
    name: nameInput.value,
    skinType: skinTypeInput.value
  };

  localStorage.setItem('skinProfile', JSON.stringify(profile));
  feedback.textContent = `${profile.name}, your ${profile.skinType} skin profile was saved.`;
}

function showSavedProfile() {
  const storedProfile = localStorage.getItem('skinProfile');

  if (!storedProfile) {
    return;
  }

  const profile = JSON.parse(storedProfile);

  if (savedMessage) {
    savedMessage.textContent = `${profile.name}, your saved skin type is ${profile.skinType}. Visit the routines page to find your best match.`;
  }

  if (thankyouMessage) {
    thankyouMessage.textContent = `${profile.name}, your ${profile.skinType} skin routine was saved successfully.`;
  }
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton) {
  menuButton.addEventListener('click', toggleMenu);
}

if (routineList) {
  displayRoutines();
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('selected'));
    button.classList.add('selected');
    displayRoutines(button.dataset.filter);
  });
});

if (skinForm) {
  skinForm.addEventListener('submit', saveSkinProfile);
}

showSavedProfile();
