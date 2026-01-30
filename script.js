const API_URL = "https://socialapp.parsing700.workers.dev"; // e.g. https://api.example.com

const postsContainer = document.getElementById("posts");
const usernameInput = document.getElementById("username");
const contentInput = document.getElementById("content");
const postBtn = document.getElementById("postBtn");

// Fetch all posts
async function fetchPosts() {
  try {
    const res = await fetch(`${API_URL}/posts`);
    const posts = await res.json();

    postsContainer.innerHTML = "";

    posts.forEach(post => {
      const div = document.createElement("div");
      div.className = "post";

      div.innerHTML = `
        <strong>${post.username}</strong>
        <p>${post.content}</p>
        <button class="like-btn" data-id="${post._id}">
          ❤️ ${post.likes}
        </button>
      `;

      postsContainer.appendChild(div);
    });
  } catch (err) {
    console.error("Error fetching posts", err);
  }
}

// Create a new post
async function createPost() {
  const username = usernameInput.value.trim();
  const content = contentInput.value.trim();

  if (!username || !content) return alert("Fill all fields");

  try {
    await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, content })
    });

    contentInput.value = "";
    fetchPosts();
  } catch (err) {
    console.error("Error creating post", err);
  }
}

// Like post (event delegation)
postsContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("like-btn")) {
    const postId = e.target.dataset.id;

    try {
      await fetch(`${API_URL}/posts/${postId}/like`, {
        method: "POST"
      });
      fetchPosts();
    } catch (err) {
      console.error("Error liking post", err);
    }
  }
});

// Button click
postBtn.addEventListener("click", createPost);

// Initial load
fetchPosts();
