let data = [];

// Load JSON data
fetch('vehicle_parts.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    populateDropdowns();
  })
  .catch(error => console.error("Error loading JSON:", error));

// Populate dropdowns
function populateDropdowns() {
  const years = [...new Set(data.map(item => item.Year))].sort();
  populateDropdown('year', years);

  // Add event listeners for cascading filters
  document.getElementById('year').addEventListener('change', () => filterDropdown('make', 'Year', 'Make'));
  document.getElementById('make').addEventListener('change', () => filterDropdown('model', 'Make', 'Model'));
  document.getElementById('model').addEventListener('change', () => filterDropdown('submodel', 'Model', 'Submodel'));
}

function populateDropdown(id, options) {
  const dropdown = document.getElementById(id);
  dropdown.innerHTML = '<option value="">Select</option>';
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    dropdown.appendChild(opt);
  });
}

function filterDropdown(nextDropdownId, filterKey, targetKey) {
  const selectedValue = document.getElementById(filterKey.toLowerCase()).value;
  const filteredOptions = [...new Set(data
    .filter(item => item[filterKey] === selectedValue)
    .map(item => item[targetKey])
  )].sort();

  populateDropdown(nextDropdownId, filteredOptions);
}

// Handle search
function searchVehicle() {
  const filters = {
    year: document.getElementById('year').value,
    make: document.getElementById('make').value,
    model: document.getElementById('model').value,
    submodel: document.getElementById('submodel').value,
  };

  const results = data.filter(item =>
    item.Year === filters.year &&
    item.Make === filters.make &&
    item.Model === filters.model &&
    item.Submodel === filters.submodel
  );

  displayResults(results);
}

// Display results
function displayResults(results) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (results.length === 0) {
    resultsDiv.innerHTML = '<p>No vehicles match the selected criteria.</p>';
    return;
  }

  const placeholderImage = "media/placeholder.jpg"; // Path to your placeholder image

  results.forEach(result => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'result-item';

    const content = `
      <p>Position: ${result.Position || "N/A"}</p>
      <p>Part Number: ${result.PartNumber || "No part available"}</p>
      <img src="${result.Image || placeholderImage}" alt="Product Image" style="max-width: 200px;">
    `;

    itemDiv.innerHTML = content;
    resultsDiv.appendChild(itemDiv);
  });
}
