import express from 'express';
import fileUpload from 'express-fileupload';
import blogRouter from './blog.route.js'

const app = express();

app.use(express.json())

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}));

app.use('/api/v1/', blogRouter);

app.get("/", (req,res) => {
    res.send("Good Evening! Home")
});

app.get("/api/v1/", (req,res) => {
    res.send("Good Evening! API")
});
export default app;