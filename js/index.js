'use strict';

const options = {
  results: 10,
  seed: 'abc',
  page: 1,
};

loadUsers(options);

const [btnFirstPage, btnPrev, btnNext] = document.querySelectorAll('button');

btnFirstPage.addEventListener('click', btnFirstPageHandler);
btnPrev.addEventListener('click', btnPrevHandler);
btnNext.addEventListener('click', btnNextHandler);



function btnPrevHandler(e) {
  if (options.page > 1) {
    options.page--;
    loadUsers(options);
  };
};

function btnNextHandler(e) {
  options.page++;
  loadUsers(options);
};

function btnFirstPageHandler(e) {
  options.page = 1;
  loadUsers(options);
};

function loadUsers({ results, seed, page }) {
  fetch(
    `https://randomuser.me/api/?results=${results}&seed=${seed}&page=${page}`
  )
    .then(response => response.json())
    .then(({ results }) => {
      console.log('results :>> ', results);
      renderUsers(results);
    }).then( results => toggleCards() );
}

function renderUsers(users) {
  const userList = document.querySelector('.userList');
  if (userList) {
    userList.remove();
  }

  const newUserList = document.createElement('ul');
  newUserList.classList.add('userList');
  document.getElementById('root').prepend(newUserList);

  const liUserCollection = users.map(user => createUserListItem(user));
  newUserList.append(...liUserCollection);
}

function createUserListItem({
  name: { first: firstName, last: lastName },
  picture: { large: userImageSrc },
  email,
  dob: {age: userAge},
  gender,
  location: {country, city, street: {name: streetName, number: streetNumber}},  
}) {
  const userListItem = document.createElement('li');
  userListItem.classList.add('userListItem');

  gender === 'female' ? userListItem.style.borderColor = 'blue' 
  : userListItem.style.borderColor = 'red ';

  userListItem.append(createUserImage(userImageSrc));
  userListItem.append(createUserFullName(firstName, lastName));
  userListItem.append(createOtherUserInfo(email, userAge, country, city, streetName, streetNumber));

  return userListItem;
}

function createUserImage(userImageSrc) {
  const img = new Image();
  img.src = userImageSrc;
  img.alt = 'user profile image';
  return img;
}

function createUserFullName(firstName, lastName) {
  const div = document.createElement('div');
  div.classList.add('userFullName');
  div.textContent = `${firstName} ${lastName}`;
  return div;
}

function createOtherUserInfo(mail, age, country, city, streetName, streetNumber) {
  const div = document.createElement('div');
  
  div.textContent = `e-mail: ${mail}, age: ${age}, 
  country: ${country}, city: ${city}, street: ${streetName}, ${streetNumber}`;
  return div;
}



function toggleCards() {

  const root = document.getElementById('root');
  const lis = root.querySelector('.userList').querySelectorAll('li');

  const namesString = document.createElement('div');
  namesString.classList.add('namesString');
  root.querySelector('.userList').append(namesString);

  const names = new Set();


  lis.forEach(li => {
    li.addEventListener('click', e => takeCard(li, namesString));
  });

  function takeCard(elem, container) {

    const fullName = elem.querySelector('.userFullName').textContent;
    container.textContent = '';

    elem.classList.toggle('clickedCard');

    elem.classList.contains('clickedCard') ? names.add(fullName) : names.delete(fullName);
    
    for(const name of names) {
      container.textContent === '' 
      ? container.textContent += name 
      : container.textContent += `, ${name}`; 
    };
  };
}






