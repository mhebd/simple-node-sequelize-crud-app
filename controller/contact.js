const { asyncHdl, errMsg, Result } = require('../utility');
const { Contact } = require('../db');

// Update contact
exports.updateContact = asyncHdl(async (req, res, next) => {
	const { phone, city, zip, country } = req.body;

	// Update contact
	const contact = await Contact.update(
		{
			phone,
			city,
			zip,
			country,
		},
		{
			where: { userId: req.user.id },
		}
	);

	res
		.status(201)
		.json(new Result(true, 'Contact created successful.', { contact }));
});

//
