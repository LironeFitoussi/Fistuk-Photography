import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Collection } from '../types/interfaces';
import { Link } from 'react-router-dom';
interface CollectionCardProps {
    collection: Collection;
}
// export default function CollectionCard() {
const CollectionCard: React.FC<CollectionCardProps> = ({collection}) => {
    console.log(collection);
    
    // validation of image cover for the collection
    const imageUrl = collection.imageCover? collection.imageCover : collection.images[0]? collection.images[0].url : 'https://www.iguanafoundation.org/wp-content/uploads/2019/06/green-iguana-1.jpg';
  return (
    <Card sx={{
        width: '65vw',
        margin: '10px'
     }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {collection.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            TODO: Add description
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
            <Link to={`/collections/${collection._id}`}>
                VIEW
            </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default CollectionCard;