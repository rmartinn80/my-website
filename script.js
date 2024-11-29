function displayResults(results) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (results.length === 0) {
    resultsDiv.innerHTML = '<p>No products found for the selected vehicle.</p>';
    return;
  }

  const groupedResults = groupByPosition(results);

  Object.keys(groupedResults).forEach(position => {
    const items = groupedResults[position];
    const itemDiv = document.createElement('div');
    itemDiv.className = 'result-item';

    let content = `<h3>${position} Products</h3>`;
    items.forEach(item => {
      content += `
        <div style="margin-bottom: 10px;">
          <p>Part Number: ${item.PartNumber}</p>
          <img src="${item.Image}" alt="${position} Product" width="100">
        </div>`;
    });

    itemDiv.innerHTML = content;
    resultsDiv.appendChild(itemDiv);
  });
}

function groupByPosition(results) {
  return results.reduce((acc, item) => {
    if (!acc[item.Position]) {
      acc[item.Position] = [];
    }
    acc[item.Position].push(item);
    return acc;
  }, {});
}
