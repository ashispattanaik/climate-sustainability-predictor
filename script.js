document.getElementById('sustainability-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const carbon = parseFloat(document.getElementById('carbon').value);
    const deforestation = parseFloat(document.getElementById('deforestation').value);
    const pollution = parseFloat(document.getElementById('pollution').value);

    let isSustainable = true;
    let dangerousFactors = [];
    let recoveryTime = 0;

    // Safe thresholds
    const safeCarbon = 2000; // in tons per year
    const safeDeforestation = 10; // in percentage
    const safePollution = 400; // in PPM

    // Check sustainability
    if (carbon > safeCarbon) {
        dangerousFactors.push('Carbon Emissions');
        isSustainable = false;
        recoveryTime += (carbon - safeCarbon) / 100; // Recovery estimation
    }
    if (deforestation > safeDeforestation) {
        dangerousFactors.push('Deforestation Rate');
        isSustainable = false;
        recoveryTime += (deforestation - safeDeforestation) / 5; // Recovery estimation
    }
    if (pollution > safePollution) {
        dangerousFactors.push('Ocean Pollution');
        isSustainable = false;
        recoveryTime += (pollution - safePollution) / 50; // Recovery estimation
    }

    // Display message
    const message = isSustainable ? 'The environment is sustainable!' : 'The environment is unsustainable.';
    const suggestions = !isSustainable ? 'Suggestions: Reduce emissions, halt deforestation, reduce pollution.' : 'Keep up the good work!';
    document.getElementById('sustainability-message').innerText = message;
    document.getElementById('dangerous-factors').innerText = `Dangerous Factors: ${dangerousFactors.join(', ')}`;
    document.getElementById('suggestions').innerText = suggestions;

    // Probability of recovery (simple logic)
    const recoveryProbability = Math.max(0, 100 - recoveryTime * 5); // Probability decreases with increasing recovery time

    // Draw recovery graph
    drawRecoveryGraph(recoveryTime, recoveryProbability);
});

function drawRecoveryGraph(recoveryTime, recoveryProbability) {
    const ctx = document.getElementById('recoveryGraph').getContext('2d');
    const recoveryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Recovery Time (years)', 'Recovery Probability (%)'],
            datasets: [{
                label: 'Recovery Data',
                data: [recoveryTime, recoveryProbability],
                backgroundColor: ['#00bcd4', '#ff9800'],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}
