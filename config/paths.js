"use strict";

const path = require("path");
const fs = require("fs");
// const getPublicUrlOrPath = require("react-dev-utils/getPublicUrlOrPath");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// config after eject: we're in ./config/
module.exports = {
	appSrc: resolveApp("")
};
