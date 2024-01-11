import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	media: {
    height: 140,
		paddingTop: '56.25%'
  }
});

function PostListItem({ post, onDelete }) {

	const classes = useStyles();

  const { isLoggedIn, user } = useSelector(state => state.users);

  return (
    <Card className="w-100 my-4">
			{post.image && (<CardMedia 
        className={classes.media}
        image={post.image}
			/>)}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <Link to={`/posts/${post.cuid}/${post.slug}`} >
            {post.title}
          </Link>
        </Typography>
        <Typography component="p" className="mt-3">
          {post.content}
        </Typography>
        <Typography color="textSecondary" component="p" className="mt-3 font-italic">
          From {post.authorName}
        </Typography>
      </CardContent>
      <CardActions>
        {isLoggedIn && (user.data._id === post.authorId) && (<Button size="small" color="secondary" onClick={onDelete}>
          Delete post
        </Button>)}
      </CardActions>
    </Card>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    authorId: PropTypes.string.isRequired,
		authorName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
