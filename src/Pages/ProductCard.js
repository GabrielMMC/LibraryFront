import * as React from 'react';
import { Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SERVER_URL } from '../utils/variables';
import { moneyMask } from '../utils/masks/currency';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [synopsis, setSynopsis] = React.useState('');

  console.log('props.data', props.data)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    let value = Array.from(props.data.synopsis)
    let tooltip = false
    if (value.length > 80) { value = value.splice(0, 80).toString().replace(/,/g, '') + '...'; tooltip = true }
    else { value = value.toString().replace(/,/g, ''); tooltip = false }

    setSynopsis({ value, tooltip })
  }, [])


  return (
    <Card sx={{ maxWidth: 300, height: 565 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.data.title}
      />
      <CardMedia
        component="img"
        height="300"
        image={`${SERVER_URL}/storage/${props.data.thumb}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {synopsis.tooltip ?
            <Tooltip placement='top' arrow title={props.data.synopsis}>
              <p style={{ cursor: 'pointer' }}>{synopsis.value}</p>
            </Tooltip> : synopsis.value
          }
        </Typography>

        <div className="row mt-3">
          <span className='bolder display-6 m-auto'>{moneyMask(props.data.price)}</span>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}