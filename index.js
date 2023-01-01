const Application = require('./framework/Application');
const router = require('./src/user-router');
const parserJson = require('./framework/parseJosn');
// const bodyParser = require('./framework/bodyParser');
const parseURL = require('./framework/parseURL');

const PORT = process.env.PORT || 5000;

const app = new Application();

app.use(parserJson);
app.use(parseURL('http://localhost:5000'));
// app.use(bodyParser);

app.addRouter(router)

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));