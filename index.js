// api.js
const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://www.alphavantage.co';

async function fetchForexData(currencyPair) {
    try {
        const response = await fetch(`${BASE_URL}/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currencyPair.from}&to_currency=${currencyPair.to}&apikey=${API_KEY}`);
        const data = await response.json();
        return data['Realtime Currency Exchange Rate'];
    } catch (error) {
        console.error('Error fetching forex data:', error);
        throw error;
    }
}

// main.js
import { fetchForexData } from './api.js';

async function displayForexData() {
    const currencyPair = { from: 'USD', to: 'EUR' }; // Example currency pair
    try {
        const forexData = await fetchForexData(currencyPair);
        console.log('Forex data:', forexData);
        const exchangeRatesElement = document.getElementById('exchange-rates');
        exchangeRatesElement.innerHTML = `
            <p>From: ${forexData['1. From_Currency Code']}</p>
            <p>To: ${forexData['3. To_Currency Code']}</p>
            <p>Exchange Rate: ${forexData['5. Exchange Rate']}</p>
            <p>Last Refreshed: ${forexData['6. Last Refreshed']}</p>
        `;
    } catch (error) {
        // Handle errors
    }
}

displayForexData();
