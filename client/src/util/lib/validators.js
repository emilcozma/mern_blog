import validator from 'validator';

export const required = (value, props, components) => {
  if (!value.toString().trim().length) {
    return 'This field is required!';
  }
};
 
export const email = (value, props, components) => {
  if (!validator.isEmail(value)) {
    return 'This is not a valid email address!'
  }
};

export const sameValueAsPassword = (value, props, components) => {
	if (value !== components.password[0].value) {
		return 'Password do not match!'
	}	
};