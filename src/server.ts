import dotenv from "dotenv";
dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3333}`);

import { app } from "./app/app";

app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));
