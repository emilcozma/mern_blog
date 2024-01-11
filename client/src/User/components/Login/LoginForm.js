import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { loginRequest, getUserRequest } from "../../UserActions";

import { required, email } from '../../../util/lib/validators';

const LoginForm = (props) => {

	const dispatch = useDispatch();

	const form = useRef();
	const checkBtn = useRef();

	const [loading, setLoading] = useState(false);

	const [input, setInput] = useState({
    	username: '',
		name: '',
    	password: '',
    	confirmPassword: ''
	});
	
	const onInputChange = e => {
		const { name, value } = e.target;
		setInput(prev => ({
		...prev,
		[name]: value
		}));
	}

	const handleLogin = (e) => {
		//
		e.preventDefault();
		//
		setLoading(true);
		//
		form.current.validateAll();
		//
		if (checkBtn.current.context._errors.length === 0) {
			//
			dispatch(loginRequest(input.username, input.password))
				.then((data) => {
					if(data.token){
						dispatch(getUserRequest(true)).then((data) => {
							window.location.reload();
						});
					}
					setLoading(false);
				})
				.catch(() => {
					setLoading(false);
				});
		} else {
		setLoading(false);
		}
	};

	return (
		<Form onSubmit={handleLogin} ref={form}>
			<div className="form-group">
				<label htmlFor="username">Username</label>
				<Input
					type="text"
					className="form-control"
					name="username"
					value={input.username}
					onChange={onInputChange}
					validations={[required, email]}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="password">Password</label>
				<Input
					type="password"
					className="form-control"
					name="password"
					value={input.password}
					onChange={onInputChange}
					validations={[required]}
				/>
			</div>

			<div className="form-group">
				<button className="btn btn-primary btn-block" disabled={loading}>
					{loading && (
						<span className="spinner-border spinner-border-sm"></span>
					)}
					<span>Login</span>
				</button>
			</div>

			<CheckButton style={{ display: "none" }} ref={checkBtn} />
		</Form>
	);
};

LoginForm.propTypes = {
};

export default LoginForm;
