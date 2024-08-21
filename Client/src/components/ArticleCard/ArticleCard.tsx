import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface ArticleCardProps {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  body: string;
  clickHandler: (articleId: number) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  description,
  buttonText,
  body,
  clickHandler,
}) => {
  //   console.log(id);

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="div">
            {description}
          </Typography>
          <Typography variant="body2">{body}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => clickHandler(id)} size="small">
            {buttonText}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ArticleCard;
