var fs = require('fs');

//TODO change them into async later

exports.img2Base64 = (file_dir) => {
	let bitmap = fs.readFileSync(file_dir, { encoding: 'base64' });
	return bitmap
}

exports.base64Img = (base64, new_file_dir) => {
	fs.writeFileSync(new_file_dir, base64, {encoding: 'base64'});
}

exports.deleteFile = (file_dir) => {
	fs.unlinkSync(file_dir);
}