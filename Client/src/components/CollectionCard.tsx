import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Collection } from '../types/interfaces';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import {useState, useEffect} from 'react';
interface CollectionCardProps {
    collection: Collection;
}
// export default function CollectionCard() {
const CollectionCard: React.FC<CollectionCardProps> = ({collection}) => {
  // handle screen size change with useState and useEffect
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  
  // use Effect to handle screen size change

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }
  , []);

    console.log(collection);
    
    // validation of image cover for the collection
    const imageUrl = collection.imageCover? collection.imageCover : collection.images[0]? collection.images[0].url : 'https://www.iguanafoundation.org/wp-content/uploads/2019/06/green-iguana-1.jpg';
  return (
    <Card sx={{
        width: '65vw',
        margin: '10px',
        '&:hover': {
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          cursor: 'pointer'
        },
        // mdia query at screen 768>
        '@media (min-width: 768px)': {
          width: '25vw'
        }
     }}>
      <CardActionArea sx={{
        // cancel any styling on hover
        '&:hover': {
          backgroundColor: 'transparent',
          cursor: 'default'
        }
      }}>
        <CardMedia
          component="img"
          // on small screens, the height of the image is 250px and on larger screens, the height is 500px
          height={screenWidth > 768 ? 500 : 250}
          image={imageUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {collection.name}
          </Typography>
          <Link to={`/collections/${collection._id}`}>
            
          </Link>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/collections/${collection._id}`}>
          <Button size="large" sx={{
            marginLeft: 'auto',
            backgroundColor: '#107AB0',
            '&:hover': {
              backgroundColor: '#107AB0'
            },
          }}>
            <FaEye color='white'/> 
          </Button>
        </Link>
        
      </CardActions>
    </Card>
  );
}

export default CollectionCard;