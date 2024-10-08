const postsContainer = document.querySelector("#posts-container");
const loaderContainer = document.querySelector(".loader");
const filterInput = document.querySelector("#filter");

let page = 1;

const getPosts = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
  );
  return res.json();
};

const addPostsIntoDOM = async () => {
  const posts = await getPosts();

  const postTemplate = posts
    .map(
      ({ id, title, body }) => `
    <div class="post">
        <div class="number">${id}</div>
        <div class="post-info">
        <div class="post-title">${title}</div>
        <div class="post-body">${body}</div>
        </div>
    </div>
    `
    )
    .join("");

  postsContainer.innerHTML += postTemplate;
};

addPostsIntoDOM();

const getNextPosts = () => {
  setTimeout(() => {
    page++;
    addPostsIntoDOM();
  }, 300);
};

const removeLoader = () => {
  setTimeout(() => {
    loaderContainer.classList.remove("show");

    getNextPosts();
  }, 1000);
};

const showLoader = () => {
  loaderContainer.classList.add("show");

  removeLoader();
};

window.addEventListener("scroll", () => {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
  const isPageBottomAlmostReached =
    scrollTop + clientHeight >= scrollHeight - 10;

  if (isPageBottomAlmostReached) {
    showLoader();
  }
});

filterInput.addEventListener("input", (e) => {
  const inputValue = e.target.value.toLowerCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const postTitle = post
      .querySelector(".post-title")
      .textContent.toLowerCase();
    const postBody = post.querySelector(".post-body").textContent.toLowerCase();

    if (postTitle.includes(inputValue) || postBody.includes(inputValue)) {
      post.style.display = "flex";
      return;
    }

    post.style.display = "none";
  });
});
