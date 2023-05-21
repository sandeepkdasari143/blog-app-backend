import Blog from "./blog.schema.js";
import bigPromise from "./utils/bigPromise.js";
import mongoose, { Mongoose } from "mongoose";

export const createBlog = bigPromise(async (req, res) => {
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
        _id: blogID,
        blogTitle,
        blogSubTitle,
        authors,
        contentBody,
        bannerImage:{
            id: cloudinaryResult?.public_id,
            secure_url: cloudinaryResult?.secure_url
        }
    })

    if (!blog) {
        throw new Error("Blog is failed to be created at Database :(")
    }
    res.status(200).json({
        success: true,
        blog,
    })

});

export const deleteBlog = bigPromise(async (req, res) => {
    const {id: blogID} = req.params;

    const blogToDelete = await Product.findById(blogID);

    if(!blogToDelete){
        throw new Error("Blog Not Found!")
    }
    
    //Destroy the Existing Banner Image in the Cloudinary
    await cloudinary.v2.uploader.destroy(blogToDelete.bannerImage.id);

    await blogToDelete.remove();

    res.status(200).json({
        success: true,
        message: "Blog has been deleted successfully",
    });
})

export const updateBlog = bigPromise( async (req, res) => {
    const {id: blogID} = req.params;

    const blogToUpdate = await Product.findById(blogID);

    if(!blogToUpdate){
        throw new Error("Blog Not Found!")
    }

    let cloudinaryResult;

    if(req.files){
        //Destroy the Existing Banner Image in the Cloudinary
        await cloudinary.v2.uploader.destroy(blogToDelete.bannerImage.id);
        //Upload and Save the New Photos
        let bannerImage = req.files.photo;
        console.log(bannerImage)
        cloudinaryResult = await cloudinary.v2.uploader.upload(bannerImage, {
            folder: `${authors[0].authorID}/${blogID}`
        });
        console.log(cloudinaryResult);
    }

    blogToUpdate = await Blog.findByIdAndUpdate(blogID, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        blogToUpdate
    })
    
})

