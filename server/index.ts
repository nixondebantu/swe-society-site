import express , { Express, Request, Response } from "express";
import pool, {testDatabaseConnection, connectToDB} from "./db/dbconnect";
import { createTables } from "./db/tables";
import authRoute from "./routes/auth";
import userRoute from "./routes/users";
import noticeRoute from "./routes/generalNotice";
import eventRoute from "./routes/events";
import eventUpdateRoute from "./routes/eventUpdate";
import skillsRoute from "./routes/skill";
import achievmentRoute from "./routes/achievement";
import blogRoute from "./routes/blogs";
import electionRoute from "./routes/elections";
import cors from "cors";



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

app.get("/",(req,res)=>{
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



app.listen(PORT, async ()=>{
    // await connectToDB();
    await testDatabaseConnection();
    await createTables();
    console.log(`Server is running in ${PORT}`);
})