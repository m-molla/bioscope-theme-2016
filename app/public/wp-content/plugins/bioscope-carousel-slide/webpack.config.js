const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve(__dirname, 'src/index.js'),
		view: path.resolve(__dirname, 'src/view.js'),
		editor: path.resolve(__dirname, 'src/index.js'),
		style: path.resolve(__dirname, 'src/style.scss'),
		editorStyle: path.resolve(__dirname, 'src/editor.scss'),
	},
};
