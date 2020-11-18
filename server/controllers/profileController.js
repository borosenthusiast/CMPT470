exports.submitProfile = async (req, res) => {
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	
	if (token.startsWith('Bearer ')) {
        token = token.slice(8, token.length);
    }
	
	console.log(req.body.bio);
	console.log(req.file);
	console.log(token);
}