const search = document.querySelector('#search');
if (search) {
  const rows = [...document.querySelectorAll('.directory li')];
  const count = document.querySelector('#match-count');
  const update = () => {
    const query = search.value.trim().toLowerCase();
    for (const row of rows) row.hidden = !row.firstElementChild.textContent.toLowerCase().includes(query);
    const matches = rows.filter(row => !row.hidden).length;
    count.textContent = matches === 0 ? 'No institutions match your search.' : matches + (matches === 1 ? ' institution' : ' institutions');
  };
  search.addEventListener('input', update);
  window.addEventListener('pageshow', update);
}
const form = document.querySelector('#enquiry');
if (form) {
  const query = new URLSearchParams(location.search);
  for (const name of ['course','city']) {
    const select = form.elements.namedItem(name);
    const value = query.get(name);
    if ([...select.options].some(option => option.value === value)) select.value = value;
  }
  form.elements.namedItem('college').value = (query.get('college') || '').slice(0,120);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(form);
    const labels = {name:'First name',course:'Course',city:'City',budget:'Annual tuition budget',college:'College',referral:'Referral code',question:'Question'};
    const lines = ['Hi GD Consultancy, I’d like help with college admissions.'];
    for (const [key, label] of Object.entries(labels)) {
      const value = fields.get(key).trim();
      if (value) lines.push(label + ': ' + value);
    }
    location.assign(form.dataset.chat + '?text=' + encodeURIComponent(lines.join('\n')));
  });
}
