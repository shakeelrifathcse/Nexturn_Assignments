// Okay, so this JavaScript is where the magic happens for the Expense Tracker. Here, we deal with everything - from adding expenses to deleting them, and even showing the pie chart.


const expenseForm = document.getElementById('expenseForm');
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const expenseList = document.getElementById('expenseList');
const totalByCategory = document.getElementById('totalByCategory');
const expenseChart = document.getElementById('expenseChart');


let expenses = JSON.parse(localStorage.getItem('expenses')) || [];


let chart = null;


function renderExpenses() {
    
    expenseList.innerHTML = '';

    
    expenses.forEach((expense, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${expense.category}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td><button class="delete" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        expenseList.appendChild(tr);
    });

    
    updateTotalByCategory();

    
    updateChart();
}


function updateTotalByCategory() {
    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
        return acc;
    }, {});

    totalByCategory.innerHTML = '';
    for (const category in categoryTotals) {
        const div = document.createElement('div');
        div.textContent = `${category}: $${categoryTotals[category].toFixed(2)}`;
        totalByCategory.appendChild(div);
    }
}


function updateChart() {
    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
        return acc;
    }, {});

    const categories = Object.keys(categoryTotals);
    const totals = Object.values(categoryTotals);

  
    if (chart) {
        chart.data.labels = categories;
        chart.data.datasets[0].data = totals;
        chart.update();
    } else {
        chart = new Chart(expenseChart, {
            type: 'pie',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Expenses by Category',
                    data: totals,
                    backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FFC300'],
                    borderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
                            }
                        }
                    }
                }
            }
        });
    }
}


expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const description = descriptionInput.value;
    const category = categoryInput.value;

    if (isNaN(amount) || description === '') {
        alert('Please provide valid expense details.');
        return;
    }

    
    expenses.push({ amount, description, category });
    
    
    localStorage.setItem('expenses', JSON.stringify(expenses));

    
    amountInput.value = '';
    descriptionInput.value = '';

    
    renderExpenses();
});


function deleteExpense(index) {
    expenses.splice(index, 1);
    
    localStorage.setItem('expenses', JSON.stringify(expenses));

    
    renderExpenses();
}


renderExpenses();
