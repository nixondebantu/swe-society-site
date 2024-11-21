import cors from "cors";
import express from "express";
import { testDatabaseConnection } from "./db/dbconnect";
import { createTables } from "./db/tables";
import achievmentRoute from "./routes/achievement";
import authRoute from "./routes/auth";
import blogRoute from "./routes/blogs";
import electionRoute from "./routes/elections";
import eventRoute from "./routes/events";
import eventUpdateRoute from "./routes/eventUpdate";
import noticeRoute from "./routes/generalNotice";
import roleRoute from "./routes/role";
import skillsRoute from "./routes/skill";
import userRoute from "./routes/users";

const PORT = 5050;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("Swe society starting");
});
app.use("/auth", authRoute);
app.use("/notice", noticeRoute);
app.use("/users", userRoute);
app.use("/event", eventRoute);
app.use("/eventupdate", eventUpdateRoute);
app.use("/skills", skillsRoute);
app.use("/achievement", achievmentRoute);
app.use("/blog", blogRoute);
app.use("/election", electionRoute);
app.use("/role", roleRoute);

app.listen(PORT, async () => {
  // await connectToDB();
  await testDatabaseConnection();
  await createTables();
  console.log(`Server is running in ${PORT}`);
});
