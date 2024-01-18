import "dotenv/config";

import debug from "debug";
import chalk from "chalk";
import startServer from "./server/startServer.js";
import connectToDatabase from "./database/connectToDatabase.js";

const port = process.env.PORT ?? 4005;

const mongoDbUrl = process.env.MONGO_DB_URL;

try {
  await connectToDatabase(mongoDbUrl!);
  debug(chalk.green("Connected to database"));

  startServer(+port);
} catch (error: unknown) {
  debug(chalk.red("Error connecting to database"));
  debug(chalk.red((error as Error).message));
  process.exit(1);
}
