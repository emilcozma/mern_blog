import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { registerRequest } from "../../UserActions";

import { required, email, sameValueAsPassword } from '../../../util/lib/validators';

const RegisterForm = (props) => {
	
	const dispatch = useDispatch();

	const history = useHistory();

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

	const handleRegister = (e) => {
		//
		e.preventDefault();
		//
		setLoading(true);
		//
		form.current.validateAll();
		//
		if (checkBtn.current.context._errors.length === 0) {
			//
			dispatch(registerRequest(input.username, input.name, input.password))
				.then((data) => {
					if(data.user){
						history.push("/login");
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
		<Form onSubmit={handleRegister} ref={form}>
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
				<label htmlFor="name">Name</label>
				<Input
					type="text"
					className="form-control"
					name="name"
					value={input.name}
					onChange={onInputChange}
					validations={[required]}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="password">Password</label>
				<Input
					type="password"
					className="form-control"
					name="password"
          onChange={onInputChange}
					validations={[required]}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="password">Confirm password</label>
				<Input
					type="password"
					className="form-control"
					name="confirmPassword"
          onChange={onInputChange}
					validations={[required, sameValueAsPassword]}
				/>
			</div>

			<div className="form-group">
				<button className="btn btn-primary btn-block" disabled={loading}>
					{loading && (
						<span className="spinner-border spinner-border-sm"></span>
					)}
					<span>Register now</span>
				</button>
			</div>

			<CheckButton style={{ display: "none" }} ref={checkBtn} />
		</Form>
		);
}

RegisterForm.propTypes = {
};

export default RegisterForm;