import "./config/loadEnv";
import App from "./App";
import AppDataSource from "./data-source";

const port = process.env.PORT || 3000;

// Initializes the Datasource for TypeORM
AppDataSource.initialize()
  .then(async () => {
    // Express setup

    const app = App();

    app.listen(port, () => {
      console.log(`⚡️[server]: running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err.stack);
  });
