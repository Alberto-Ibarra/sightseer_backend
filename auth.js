const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	try {
		// get token from authorization header
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, 'RANDOM-TOKEN');
		const user = decodedToken.user;
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({
			error: error,
		});
	}
};
