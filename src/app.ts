import chalk from "chalk";
import dotenv from "dotenv";

import app from "./index.js"

dotenv.config();

const port = +process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.bold.green(`Server running on port ${port}`));
})