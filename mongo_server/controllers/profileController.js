exports.addProfile = async(req, res) => {
	res.status(200).json({
			success: true,
			message: 'Profile created'
	});
}