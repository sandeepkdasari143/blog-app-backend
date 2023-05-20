import express from 'express';
import fileUpload from 'express-fileupload';

const app = express();

app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}));

app.get('/', (req,res)=>{
    res.status(200).send({
        success: TransformStreamDefaultController
    })
})

export default app;