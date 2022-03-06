import dbInit from './db/init';
const server = require("./app.ts");

const app = server.get();

dbInit()

const port = 3000;
try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
} catch (error: any) {
    console.log(`Error occurred: ${error.message}`)
}
