/* 
Custom Fetch with Try-Catch Error Handling in Async Functions

Write a custom fetch function that adds headers and handles errors.

Write an async function that fetches data and handles errors with try-catch.

*/

async function customFetch(url, options = {}) {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    options.headers = { ...defaultHeaders, ...options.headers }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Usage
customFetch('https://api.example.com/data')
    .then(data => console.log(data))
    .catch(error => console.error(error));