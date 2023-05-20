import Blog from "./blog.schema.js";
import bigPromise from "./utils/bigPromise.js";
import mongoose, { Mongoose } from "mongoose";

export const addBlog = bigPromise(async (req, res) => {
    const {blogTitle, blogSubTitle, authors, contentBody} = req.body;
    const blogID = new new Mongoose.Types.ObjectId().toHexString();

    let cloudinaryResult;

    if(req.files){
        let bannerImage = req.files.photo;
        console.log(bannerImage)
        cloudinaryResult = await cloudinary.v2.uploader.upload(bannerImage, {
            folder: `${authors[0].authorID}/${blogID}`
        });
        console.log(cloudinaryResult);
    }

    if (
        !blogTitle ||
        !blogSubTitle ||
        !authors ||
        !contentBody 
    ) {
        throw new Error("Please fill all the fields")   
    }

    const blog = await Blog.create({
        blogTitle,
        blogSubTitle,
        authors,
        contentBody,
        bannerImage:{
            id: cloudinaryResult?.public_id,
            secure_url: cloudinaryResult?.secure_url
        }
    })
})