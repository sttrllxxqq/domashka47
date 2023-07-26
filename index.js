function fetchData(url) {
  return fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      });
}

function getPostById(id) {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  fetchData(url)
      .then(post => {
          const postContainer = document.getElementById('postContainer');
          postContainer.innerHTML = `
              <h2>${post.title}</h2>
              <p>${post.body}</p>
              <button id="commentsButton">Отримати коментарі</button>
          `;

          const commentsButton = document.getElementById('commentsButton');
          commentsButton.addEventListener('click', () => {
              getCommentsForPost(id);
          });
      })
      .catch(error => {
          const postContainer = document.getElementById('postContainer');
          postContainer.innerHTML = `<p>Пост з ID ${id} не знайдено.</p>`;
          console.error('Error fetching post:', error);
      });
}

function getCommentsForPost(postId) {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
  fetchData(url)
      .then(comments => {
          const commentsContainer = document.getElementById('commentsContainer');
          commentsContainer.innerHTML = '';

          if (comments.length > 0) {
              comments.forEach(comment => {
                  const commentElement = document.createElement('div');
                  commentElement.innerHTML = `
                      <h3>${comment.name}</h3>
                      <p>${comment.body}</p>
                  `;
                  commentsContainer.appendChild(commentElement);
              });
          } else {
              commentsContainer.innerHTML = '<p>Коментарі відсутні.</p>';
          }
      })
      .catch(error => {
          const commentsContainer = document.getElementById('commentsContainer');
          commentsContainer.innerHTML = '<p>Помилка отримання коментарів.</p>';
          console.error('Error fetching comments:', error);
      });
}

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
  const postIdInput = document.getElementById('postIdInput');
  const postId = parseInt(postIdInput.value);

  if (!isNaN(postId) && postId >= 1 && postId <= 100) {
      getPostById(postId);
  } else {
      const postContainer = document.getElementById('postContainer');
      postContainer.innerHTML = '<p>Введіть коректний ID (від 1 до 100).</p>';
  }
});
