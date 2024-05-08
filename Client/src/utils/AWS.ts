import AWS from 'aws-sdk';

// Configure AWS SDK with your credentials and region
AWS.config.update({
    accessKeyId: import.meta.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID, // Use environment variables or securely store credentials
    secretAccessKey: import.meta.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: import.meta.env.VITE_REACT_APP_AWS_REGION,
});

// Create and export S3 instance
const s3 = new AWS.S3();
export default s3;
