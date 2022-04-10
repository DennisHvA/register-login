console.log('the client js is connected');

// Progressive Enhancement

const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordRepeat = document.getElementById('passwordrepeat');

const errorEmail = document.getElementById('erroremail');
const errorPassword = document.getElementById('errorpassword');
const errorPasswordrepeat = document.getElementById('errorpassword2');

// email
form.addEventListener('submit', (e) => {
  let messages = [];
  if (email.value === '' || email.value == null) {
    messages.push('Email is required');
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorEmail.innerText = messages.join(', ');
  }
});

// password
form.addEventListener('submit', (e) => {
  let messages = [];
  if (password.value.length <= 6) {
    messages.push('Password must be longer than 6 characters');
  }

  if (password.value.length >= 20) {
    messages.push('Password must be less than 20 characters');
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorPassword.innerText = messages.join(', ');
  }
});

// password repeat
form.addEventListener('submit', (e) => {
  let messages = [];
  if (passwordRepeat.value === '' || passwordRepeat.value == null) {
    messages.push('Password is required');
  }

  if (password.value !== passwordRepeat.value) {
    messages.push('Passwords do not match');
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorPasswordrepeat.innerText = messages.join(', ');
  }
});
