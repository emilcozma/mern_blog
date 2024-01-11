import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { logoutRequest } from "../../User/UserActions";

function Navbar() {

    const dispatch = useDispatch();

    const { isLoggedIn } = useSelector(state => state.users);

    const handleLogout= (e) => {
      dispatch(logoutRequest())
				.then((data) => {
					window.location.reload();
				});
    }

    const authLinks = () => {
        if (isLoggedIn === false) {
            return (
                <div className="row">
                     <div className="col-auto"><Link href="/login" className="text-white">Login</Link></div>
                    <div className="col-auto ml-2"><Link href="/register" className="text-white">Sign up</Link></div>
                </div>
            )
                
        } else {
            return (
                <div className="row">
                    <div className="col-auto"><Link href="/" className="text-white" onClick={handleLogout}>Logout</Link></div>
                </div>
            )
        }
    }

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" >
                    <Link href="/" className="text-white">Home</Link>
                </Typography>
                <Box flexGrow={1} />
                {authLinks()}
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
