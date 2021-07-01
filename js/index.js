'use strict';

// - Добавить кнопку << , т.е. переход на первую страницу.
// - Добавить информацию о юзере (возраст, имейл, ...).
// - Цвет рамки (фона) карточкам генерить в зависимости от пола юзера.
// - * Сдалать возможным выбирать несколько карточек, список полных имен 
// выбранных юзеров приводить в строку сверху. Выбранные карточки подсвечивать.
// - Застилить карточки.

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
      renderUsers(results);
    })
    .then( () => toggleCards() );
};

function renderUsers(users) {
  const userList = document.querySelector('.userList');
  if (userList) {
    userList.remove();
  };

  const newUserList = document.createElement('ul');
  newUserList.classList.add('userList');
  document.getElementById('root').prepend(newUserList);

  const liUserCollection = users.map(user => createUserListItem(user));
  newUserList.append(...liUserCollection);
};

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

  gender === 'female' ? userListItem.style.borderColor = 'black' 
  : userListItem.style.borderColor = 'grey';

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
  const h2 = document.createElement('h2');
  h2.classList.add('userFullName');
  h2.textContent = `${firstName} ${lastName}`;
  return h2;
}

function createOtherUserInfo(mail, age, country, city, streetName, streetNumber) {
  const div = document.createElement('div');
  
  div.innerHTML = `
    <p>e-mail: ${mail}</p> 
    <p>Age: ${age}</p> 
    <p>Country: ${country}</p>
    <p>City: ${city}</p> 
    <p>Street: ${streetName}, ${streetNumber}</p>`;

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
    li.addEventListener('click', e => takeCard(li, namesString, names));
  });
}

function takeCard(elem, container, list) {

  const fullName = elem.querySelector('.userFullName').textContent;
  container.textContent = '';

  elem.classList.toggle('clickedCard');
  elem.classList.contains('clickedCard') ? list.add(fullName) : list.delete(fullName);

  list.size !== 0 ? container.style.padding = '5px' : container.style.padding = '';
  
  for(const item of list) {
    container.textContent === '' 
    ? (container.textContent += item)
    : container.textContent += `, ${item}`; 
  };
};




