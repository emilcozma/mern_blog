module.exports = {
    errorMap:function(errors) {
        const extractedErrors = []
				errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));
				return extractedErrors;
    },
}