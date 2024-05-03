import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface MediaCardProps {
    collectionName: string;
    collectionDescription: string;
    collectionImage: string;
    collectionLink: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ collectionName, collectionDescription, collectionImage, collectionLink }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={collectionImage} // Using the corrected image prop
        title={collectionName} // Using the corrected name prop as title
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {collectionName} // Displaying the name from props
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {collectionDescription} // Displaying the description from props
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" href={collectionLink}>Learn More</Button> // Link to more info using the corrected link from props
      </CardActions>
    </Card>
  );
};

export default MediaCard;
