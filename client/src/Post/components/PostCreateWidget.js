import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
// Import Style

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const PostCreateWidget = ({ addPost }) => {

  const [state, setState] = useState({});
	const [fileData, setFileData] = useState({});
	const [fileName, setFileName] = useState("");

  const classes = useStyles();

  const { isLoggedIn, user } = useSelector(state => state.users);

  const submit = () => {
    if (state.title && state.content) {
			const formData = new FormData();
			formData.set('title', state.title);
			formData.set('content', state.content);
			if(fileData && fileName){
				formData.append('image', fileData, fileName);
			}
      addPost(formData);
			//clear state
			setState({
				title: '',
				content: '',
				fileName: ''
			});
			//clear file data
			setFileData(null);
			setFileName(null);
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
        ...state,
        [evt.target.name]: value
    });
  };

	const handleFileChange = ({target}) => {
		if(target.files){
			setFileData(target.files[0]);
			setFileName(target.value);
		}
	};

  if(!isLoggedIn){
    return (
      <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
        You need to login to be able to create posts.
      </div>
    );
  }

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
        <h3>Create new post</h3>
				<TextField variant="filled" label="Author name" name="name" value={user.data.name} readOnly disabled />
				<TextField variant="filled" label="Post title" name="title" value={state.title} onChange={handleChange} />
				<TextField type="file" variant="filled" label="Post image" name="image" value={state.fileName} onChange={handleFileChange} />
				<TextField variant="filled" multiline rows="4" label="Post content" name="content" value={state.content} onChange={handleChange} />
				
				<Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.title || !state.content}>
						Submit
				</Button>
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
