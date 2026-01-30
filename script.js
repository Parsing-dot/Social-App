const API_URL = "https://YOUR_WORKER.workers.dev";

const postsContainer = document.getElementById("posts");
const usernameInput = document.getElementById("username");
const contentInput = document.getElementById("content");
const postBtn = document.getElementById("postBtn");

async function fetchPosts() {
  const res = await fetch(`${API_URL}/posts`);
  const posts = await res.json();

  postsContainer.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <strong>${post.username}</strong>
      <p>${post.content}</p>
      <button class="like-btn" data-id="${post.id}">
        ❤️ ${post.likes}
      </button>
    `;

    postsContainer.appendChild(div);
  });
}

async function createPost() {
  const username = usernameInput.value.trim();
  const content = contentInput.value.trim();

  if (!username || !content) {
    alert("Fill all fields");
    return;
  }

  await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, content })
  });

  contentInput.value = "";
  fetchPosts();
}

postsContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("like-btn")) {
    const id = e.target.dataset.id;
    await fetch(`${API_URL}/posts/${id}/like`, { method: "POST" });
    fetchPosts();
  }
});

postBtn.addEventListener("click", createPost);

fetchPosts();
