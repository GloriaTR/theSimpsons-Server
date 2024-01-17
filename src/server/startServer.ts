import "dotenv/config";

import debugCreator from "debug";
import chalk from "chalk";
import app from "./index.js";

const debug = debugCreator("simpsons:server:start");

const startServer = (port: number) => {
  app.listen(port, () => {
    debug(chalk.blue(`Listening on http://localhost:${port}`));
  });
};

export default startServer;
