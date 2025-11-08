/* 
Basic Fetch Wrapper with Abort

 Implement a fetch wrapper that allows for aborting requests.
*/

function fetchWithAbort(url, options = {}, signal) {
    return fetch(url, { ...options, signal })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
}

// Usage
const controller = new AbortController();
fetchWithAbort('https://api.example.com/data', { signal: controller.signal })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
// To abort
controller.abort();