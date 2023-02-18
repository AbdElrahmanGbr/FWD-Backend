import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./handlers/userRoutes";
import movieRoutes from "./handlers/movieRoutes";
import movieListRoutes from "./handlers/movieListRoutes";
import userListRoutes from "./handlers/userListRoutes";

export const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

userRoutes(app);
userListRoutes(app);
movieRoutes(app);
movieListRoutes(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
