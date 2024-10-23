import app from "./app";
import "./cron-jobs";

// Set port
const port = 3000;

// Run the server
app.listen(port, (): void => {
  console.log(`The server is running on port ${port}`);
});
