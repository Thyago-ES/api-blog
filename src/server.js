require("dotenv").config();

const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`O servidor está funcionando na porta ${port}`);
});
