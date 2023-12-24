const Usage = require("../models/Usage")

const handleErrors = (err) => {}

// get usage for a current user
module.exports.checkusage_get = async (req, res) => {}

// create usage in database for new user
module.exports.checkusage_post = async (req, res) => {}

// add usage as user uploads and deletes
module.exports.addusage_post = async (req, res) => {}

// clear usage after 24 hours
module.exports.clearusage_post = async (req, res) => {}
