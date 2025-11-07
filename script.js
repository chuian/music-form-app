// script.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('music-form');
  const tableBody = document.getElementById('user-table-body');

  // 🟢 Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      genre: document.getElementById('genre').value,
      mood: document.getElementById('mood').value,
      vibe: document.getElementById('vibe').value,
      loudness: document.getElementById('loudness').value,
      favorite: document.getElementById('favorite').value
    };

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('✅ Data submitted successfully!');
      form.reset();
      loadUsers();
    } else {
      alert('❌ Submission failed.');
    }
  });

  // 🟢 Load and display user data in table
  async function loadUsers() {
    const res = await fetch('/api/users');
    if (!res.ok) return;

    const users = await res.json();
    tableBody.innerHTML = users
      .map(u => `
        <tr>
          <td>${u.name}</td>
          <td>${u.genre}</td>
          <td>${u.mood}</td>
          <td>${u.vibe}</td>
          <td>${u.loudness}</td>
          <td>${u.favorite}</td>
        </tr>
      `)
      .join('');
  }

  loadUsers(); // load on startup
});
