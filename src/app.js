import express from 'express';

const app = express();

app.get('/', (req,res)=>{
    res.status(200).send({
        success: true,
        data: {
            name:"Sandeep K. Dasari"
        }
    })
})

export default app;