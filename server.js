const app = require('./app');

const PORT = process.env.PORT || 5050;

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Server is running on http://localhost:${PORT}`);
	}
});
