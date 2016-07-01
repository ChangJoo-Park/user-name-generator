import User from './models/user';
import UserGenerator from './helpers/user-name-generator';
import UserMockRepository from './services/user-mock-repository';
import _ from  '../node_modules/lodash/lodash.min';

let userGenerator = new UserGenerator();
let userRepository = new UserMockRepository();
let userStore = [];
let sortByUserName = true;
let duplicated = 0;

document.addEventListener("DOMContentLoaded", function(event) {
  loadUsers();
});

document.getElementById('user-validator-form').addEventListener('submit', (event)=> {
  event.preventDefault();
  const emailInput = document.getElementById("new-email");
  const userInput = document.getElementById("new-name");
  const userEmail = emailInput.value;
  const userName = userGenerator.generate(userEmail, userRepository);
  userInput.value = userName;
});

document.getElementById('add-user-button').addEventListener('click', () => {
  const emailInputValue = document.getElementById("new-email").value;
  const userInputValue = document.getElementById("new-name").value;
  const newUser = new User({email: emailInputValue, userName: userInputValue});
  userRepository.addUserToStore(newUser).then((result)=>{
    console.log(result);
  }, (errors)=>{
    console.error(errors);

  });
  loadUsers();
});

document.getElementById('automate-test').addEventListener('click', () => {
  document.getElementById('automate-test').disabled = true;
  document.getElementById('automate-test').className = 'ui secondary loading button';
  for(let i = 0; i < 2000; i++) {
    const email = faker.internet.email();
    const userName = userGenerator.generate(email, userRepository);
    const newUser = new User({email: email, userName: userName});
    userRepository.addUserToStore(newUser).then((result)=>{
    }, (errors)=>{
      console.error(errors);
    });
  }
  loadUsers();
  document.getElementById('automate-test').className = 'ui secondary button';
  document.getElementById('automate-test').disabled = false;
});


function loadUsers() {
  userStore = userRepository.getUsers();
  let sortedUserStore = [];
  if(sortByUserName) {
    sortedUserStore = userStore.sort((user1, user2)=>{
      return user1.userName > user2.userName;
    });
  }
  let html = `<h1 class="ui dividing header">Total User List - ${sortedUserStore.length}</h1>`
  html += `<table class="ui celled table"><thead><tr><th>Email</th><th>UserName</th></tr></thead><tbody>`;
  sortedUserStore.forEach((user) => {
    let userDOM = `<tr><td>${user.email}</td> <td>${user.userName}</td></tr>`;
    html += userDOM;
  });
  html += '</tbody></table>';
  document.getElementById('user-list').innerHTML = html;
}
