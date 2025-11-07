document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("musicForm");
  const loadBtn = document.getElementById("loadData");
  const tableBody = document.querySelector("#userTable tbody");

  // --- Handle form submission ---
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value.trim(),
      genre: document.getElementById("genre").value,
      mood: document.getElementById("mood").value,
      vibe: document.getElementById("vibe").value,
      loudness: document.getElementById("loudness").value,
      favorite: document.getElementById("favorite").value.trim()
    };

    try {
      const res = await fetch("https://music-form-app.vercel.app/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log("Response from API:", data);

      if (res.ok) {
        alert("🎵 Your response has been saved!");
        form.reset();
      } else {
        alert("⚠️ Error saving data. Check console for details.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("❌ Could not connect to API.");
    }
  });

  // --- Load data from MongoDB ---
  loadBtn.addEventListener("click", async () => {
    try {
      const res = await fetch("https://music-form-app.vercel.app/api/users");
      const data = await res.json();
      console.log("Loaded data:", data);

      tableBody.innerHTML = "";

      if (!Array.isArray(data) || data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='6'>No entries found.</td></tr>";
        return;
      }

      data.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.name || ""}</td>
          <td>${user.genre || ""}</td>
          <td>${user.mood || ""}</td>
          <td>${user.vibe || ""}</td>
          <td>${user.loudness || ""}</td>
          <td>${user.favorite || ""}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (err) {
      console.error("Error loading data:", err);
      alert("❌ Could not fetch data.");
    }
  });
});
