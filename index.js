// Get the theme button element and register a click event listener
const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", toggleDarkMode);

// Function to toggle the dark mode class on the body element
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Get the petition form and signature count elements
const petitionForm = document.getElementById('sign-petition');
const signaturesContainer = document.querySelector('.signatures');
const signatureCount = document.getElementById('signature-count');
const signNowButton = document.getElementById('sign-now-button');
// Starting count of signatures
let count = 3;

// Function to add a signature
const addSignature = (person) => {
  
  // Get the name and hometown values from the petition form
  const name = person.name;
  const hometown = person.hometown; 

  // Create a new signature element with the name and hometown
  const newSignature = document.createElement('p');
  newSignature.textContent = `🖊️ ${name} from ${hometown} supports this.`;

  // Append the new signature element to the signatures container
  signaturesContainer.appendChild(newSignature);

  // Reset the petition form
  petitionForm.reset();

  const oldCount = document.getElementById('counter');
  oldCount.remove();
  count++;
  const newCount = document.createElement('p');
  newCount.id = 'counter';
  newCount.textContent = `🖊️ ${count}people have signed this petition and support this cause.`;
  signaturesContainer.appendChild(newCount);

  event.preventDefault();

  toggleModal(person);

}

// Function to validate the petition form
const validateForm = () => {
  let containsErrors= false;

  let petitionInputs = document.getElementById("sign-petition").elements;
  const email = document.getElementById('email');
  
  let person = {
    name: petitionInputs[0].value, 
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  }

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }

  if (!email.value.includes('.com')) {
    email.classList.add('error');
    containsErrors = true;
  }
  else {
    email.classList.remove('error');
  }
  
  if (containsErrors == false) {
    addSignature(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    containsErrors = false;
    }
    toggleModal(person);
  }
}

// Register a click event listener for the "Sign Now" button
signNowButton.addEventListener('click', validateForm);
//you got this Juan :] -note to self

//scroll animation >>
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

const revealableContainers = document.querySelectorAll('.revealable');

function reveal() {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);

// toggle modal
const toggleModal = (person) => {
  modal = document.getElementById("thanks-modal");
  modalContent = document.getElementById("thanks-content-modal");
  modal.style.display = "flex";
  modalContent.textContent = `Thank you so much ${name}! ${hometown} represent :)`;
  
  const intervalId = setInterval(scaleImage, 500);

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000);
  
  setTimeout(() => {
    closeModal();
  }, 4000);
}

const closeModalBtn = document.querySelector('#close-modal-btn');

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
}

closeModalBtn.addEventListener('click', closeModal);