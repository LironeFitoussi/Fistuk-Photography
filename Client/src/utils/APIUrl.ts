let serverUrl: string = '';
// console.log(import.meta.env.VITE_MODE);

if (import.meta.env.VITE_MODE === 'production' || import.meta.env.VITE_MODE === 'front-dev') {
    serverUrl = 'https://lirone-fitoussi-dev-api.onrender.com';
} else {
    serverUrl = 'http://localhost:3000';
}

export default serverUrl;