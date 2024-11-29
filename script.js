// Load the JSON data
let data = [];
fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    populateDropdowns();
  });

function populateDropdowns() {
  const years = [...new Set(data.map(item => item.year))];
  populateDropdown('year', years);
}

function populateDropdown(id, options) {
  const select = document.getElementById(id);
  select.innerHTML = '<option value="">Select</option>';
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    select.appendChild(opt);
  });

  select.addEventListener('change', () => updateNextDropdown(id));
}

function updateNextDropdown(current) {
  const filters = getSelectedFilters();
  let nextDropdown, options;

  if (current === 'year') {
    options = [...new Set(data.filter(item => item.year === filters.year).map(item => item.make))];
    nextDropdown = 'make';
  } else if (current === 'make') {
    options = [...new Set(data.filter(item => item.year === filters.year && item.make === filters.make).map(item => item.model))];
    nextDropdown = 'model';
  } else if (current === 'model') {
    options = [...new Set(data.filter(item => 
      item.year === filters.year && 
      item.make === filters.make && 
      item.model === filters.model
    ).map(item => item.submodel))];
    nextDropdown = 'submodel';
  }

  if (nextDropdown) populateDropdown(nextDropdown, options || []);
}

function getSelectedFilters() {
  return {
    year: document.getElementById('year').value,
    make: document.getElementById('make').value,
    model: document.getElementById('model').value,
    submodel: document.getElementById('submodel').value
  };
}

function searchVehicle() {
  const filters = getSelectedFilters();
  const results = data.filter(item =>
    item.year === filters.year &&
    item.make === filters.make &&
    item.model === filters.model &&
    item.submodel === filters.submodel
  );

  displayResults(results);
}

function displayResults(results) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (results.length === 0) {
    resultsDiv.innerHTML = '<p>No products found for the selected vehicle.</p>';
    return;
  }

  results.forEach(result => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'result-item';

    let content = `<h3>${result.year} ${result.make} ${result.model} ${result.submodel}</h3>`;
    if (result.front_product) {
      content += `<p>Front: ${result.front_product}</p>`;
      content += `<img src="${result.front_image}" alt="Front Product" width="100">`;
    }
    if (result.rear_product) {
      content += `<p>Rear: ${result.rear_product}</p>`;
      content += `<img src="${result.rear_image}" alt="Rear Product" width="100">`;
    }

    itemDiv.innerHTML = content;
    resultsDiv.appendChild(itemDiv);
  });
}
