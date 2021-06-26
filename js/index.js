'use strict';

const options = {
  results: 10,
  seed: 'abc',
  page: 1,
};

fetch(
  `https://randomuser.me/api/?results=${options.results}&seed=${options.seed}&page=${options.page}`
)
  .then(response => response.json())
  .then(({ results }) => renderUsers(results));

function renderUsers(users) {
  const liUserCollection = users.map(user => createUserListItem(user));
  const userList = document.getElementById('userList');
  userList.append(...liUserCollection);
}

function createUserListItem({
  name: { first: firstName, last: lastName },
  picture: { large: userImageSrc },
}) {
  const userListItem = document.createElement('li');
  userListItem.classList.add('userListItem');

  userListItem.append(createUserImage(userImageSrc));
  userListItem.append(createUserFullName());

  return userListItem;
}

function createUserImage(userImageSrc) {
  const img = new Image();
  img.src = userImageSrc;
  img.alt = 'user profile image';
  return img;
}
// Написать createUserFullName
function createUserFullName() {}
