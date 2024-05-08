let serverUrl: string = '';
if (import.meta.env.VITE_MODE === 'production') {
    serverUrl = 'https://lirone-fitoussi-dev-api.onrender.com';
} else {
    serverUrl = 'http://localhost:3000';
}

export default serverUrl;