async function loadData(){
  const res = await fetch('/api/users');
  if(!res.ok){ alert('Failed to load data: '+res.status); return; }
  const data = await res.json();
  const tbody = document.querySelector('#userTable tbody');
  tbody.innerHTML='';
  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(item.name||'')}</td>
      <td>${escapeHtml(item.genre||'')}</td>
      <td>${escapeHtml(item.mood||'')}</td>
      <td>${escapeHtml(item.vibe||'')}</td>
      <td>${escapeHtml(item.loudness||'')}</td>
      <td>${escapeHtml(item.favoriteTrack||'')}</td>
    `;
    tbody.appendChild(tr);
  });
}
function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
document.getElementById('loadBtn').addEventListener('click', loadData);
document.getElementById('musicForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const payload = {
    name: document.getElementById('name').value,
    genre: document.getElementById('genre').value,
    mood: document.getElementById('mood').value,
    vibe: document.getElementById('vibe').value,
    loudness: document.getElementById('loudness').value,
    favoriteTrack: document.getElementById('favoriteTrack').value
  };
  const res = await fetch('/api/users', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  if(!res.ok){ const t = await res.text(); alert('Submit failed: '+res.status+' '+t); return; }
  alert('Saved ✔');
  document.getElementById('musicForm').reset();
});
