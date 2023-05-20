import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({

    blogTitle:{
        type: String,
        default: "Untitled",
        required: [true, "Blog Title is Required!"],
        maxLength: [150, "Blog title should be under 150 Characters."],
        minLength: [25, "Blog title should be above 25 Characters."]
    },

    blogSubTitle:{
        type: String,
        maxLength: [150, "Blog subtitle should be under 200 Characters."],
        minLength: [25, "Blog subtitle should be above 20 Characters."]
    },

    // TODO: DONE => Each Blog can have multiple authors...
    authors:{
        type:[
            {
                authorID:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: Authors,   // Authors is the Collection where all the Users and Blog Authors get Stored.
                    required: true,
                }
            }
        ],
        required: true
    },

    //Cloudinary for Storing Images...
    bannerImage:{
        id:{
            type: String,
            required: true
        },
        secureURL: {
            type: String,
            required: true 
        }
    },

    contentBody:{
        type: String,
        required: [true, "Blog Title is Required!"],
        minLength: [300, "Blog title should be atleast 300 Characters."]
    },

    likes:[
        {
            likedBy:{
                type: mongoose.Schema.Types.ObjectId,
                ref: Authors,
                required: true,
            },
            noOfLikes: [
                {
                    likedCreatedAt: Date, // Liking
                    likedUpdatedAt: Date, // UnLiking
                    required: true,
                }
            ], //An User (or) Author of this Blogging Website can like a single blog upto 10 times(like hashnode).
        }
    ],

    shares:[
        {
            sharedBy:{
                type: mongoose.Schema.Types.ObjectId,
                ref: Authors,
                required: true,
            }, 
        }
    ],

    comments:[
        {
            commentedBy:{
                type: mongoose.Schema.Types.ObjectId,
                ref: Authors,
                required: true
            },
            commentCreatedAt:{
                type: Date,
                required: true
            },
            commentUpdatedAt:{
                type: Date,
                required: true
            },
            likes: [
                {
                    commentLikedBy: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: Authors,
                        required: true
                    },
                    likeCreatedAt: Date,
                    likedUpdatedAt: Date
                }
            ],
            replies: [
                {
                    repliedBy: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: Authors,
                        required: true
                    },
                    replyCreatedAt: Date,
                    replyUpdatedAr: Date
                }
            ]
        }
    ],

    noOfReads:[
        {
            readBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Authors,
                required: true
            },
            noOfTimesRead: Number,
        }
    ],

    readMinutes: Number,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;