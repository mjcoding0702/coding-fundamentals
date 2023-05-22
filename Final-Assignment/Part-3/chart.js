// Load the Visualization API and the corechart package
google.charts.load('current', {packages: ['corechart']});

// Set a callback to run when the Google Visualization API is loaded
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
  let transactions = JSON.parse(localStorage.getItem('transactionItem')) || [];
  drawPieChart(transactions);
  drawBarChart(transactions);
  drawLineChart(transactions);
}

function drawPieChart(transactions) {
  let data = new google.visualization.DataTable();
  data.addColumn('string', 'Transaction Type');
  data.addColumn('number', 'Amount');

  let income = transactions.filter(t => t.transactionType === 'income').reduce((total, t) => total + parseFloat(t.amount), 0);
  let expense = transactions.filter(t => t.transactionType === 'expense').reduce((total, t) => total + parseFloat(t.amount), 0);

  data.addRows([
    ['Income', income],
    ['Expense', expense]
  ]);

  let options = {
    is3D: true,
  }

  // Create and draw the visualization.
  new google.visualization.PieChart(document.getElementById('piechart')).draw(data, options);
}

function drawBarChart(transactions) {
  let data = new google.visualization.DataTable();
  data.addColumn('string', 'Category');
  data.addColumn('number', 'Amount');

  //Convert array to object
  let categories = [...new Set(transactions.map(t => t.category))];

  categories.forEach(category => {
    let totalAmount = transactions.filter(t => t.category === category).reduce((total, t) => total + parseFloat(t.amount), 0);
    data.addRow([category, totalAmount]);
  });

  // Create and draw the visualization.
  new google.visualization.BarChart(document.getElementById('barchart')).draw(data, null);
}

function drawLineChart(transactions) {
    let data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Income');
    data.addColumn('number', 'Expense');
  
    let dates = [...new Set(transactions.map(t => new Date(t.date)))];
    dates.sort();
  
    dates.forEach(date => {
      let income = transactions.filter(t => new Date(t.date).getTime() === date.getTime() && t.transactionType === 'income').reduce((total, t) => total + parseFloat(t.amount), 0);
      let expense = transactions.filter(t => new Date(t.date).getTime() === date.getTime() && t.transactionType === 'expense').reduce((total, t) => total + parseFloat(t.amount), 0);
      data.addRow([date, income, expense]);
    });
  
    var options = {
      title: 'Income and Expense Over Time',
      curveType: 'function',
      legend: { position: 'bottom' }
    };
  
    // Create and draw the visualization.
    new google.visualization.LineChart(document.getElementById('linechart')).draw(data, options);
}

