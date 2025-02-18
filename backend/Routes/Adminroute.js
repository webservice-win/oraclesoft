const express=require("express");
const category_model = require("../Models/Categorymodel");
const ensureAuthenticated = require("../Middlewares/Auth");
const technology_model = require("../Models/Technology");
const review_model = require("../Models/Reviewmodel");
const video_review_model = require("../Models/Videoreviewmodel");
const course_model = require("../Models/Coursemodel");
const crypto=require("crypto")
const path = require('path'); 
const jwt = require('jsonwebtoken');
const admin_route=express();
const multer = require("multer");
const brand_model = require("../Models/Brandmodel");
const admission_model = require("../Models/Admissionmodel");
const website_model = require("../Models/Websitemodel");
const payment_proof_model = require("../Models/Paymentproof");
const nodemailer=require("nodemailer")
const site_model = require("../Models/Sitemodel");
const video_model = require("../Models/Videomodel");
const accordion_model = require("../Models/Accordion");
const fs=require("fs");
const member_model = require("../Models/Memebermodel");
const achievement_model = require("../Models/Addachievement");
const payment_method_model = require("../Models/paymentMethodSchema ");
const tutorial_model = require("../Models/Tutorial");
const order_model = require("../Models/Ordermodel");
const deposit_model = require("../Models/Depositmodel");
const UserModel = require("../Models/User");
const ads_model = require("../Models/Adsmodel");
const bcrypt=require("bcryptjs");
const invoice_model = require("../Models/Inoicemodel");
const due_model = require("../Models/Duemodel");



// ------------file-upload----------
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const uploadimage=multer({storage:storage});

// -------------------category---------------------
admin_route.post("/add-category",ensureAuthenticated,async(req,res)=>{
    try {
         const {label,value}=req.body;
         if(!label || !value){
               return res.send({success:false,message:"Please enter information!"})
         }
         const find_category=await category_model.findOne({label:label,value:value});
         if(find_category){
               return res.send({success:false,message:"Category already exist!"})
         }
         const create_category=new category_model({
            label,value
         });
         if(create_category){
           create_category.save();
               return res.send({success:true,message:"Category has been added!"})
           
         }
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-category/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_category=await category_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_category){
           return  res.send({success:false,message:"Category  did not find!"})
          };
          res.send({success:true,message:"Category has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-category",ensureAuthenticated,async(req,res)=>{
    try {
       const category_data=await category_model.find();
       res.send({success:true,data:category_data})
    } catch (error) {
        console.log(error)
    }
});
// -------------------category---------------------
// -------------------technology---------------------
admin_route.post("/add-technology",ensureAuthenticated,async(req,res)=>{
    try {
         const {label,value}=req.body;
         if(!label || !value){
               return res.send({success:false,message:"Please enter information!"})
         }
         const technology_category=await technology_model.findOne({label:label,value:value});
         if(technology_category){
               return res.send({success:false,message:"Technology already exist!"})
         }
         const create_technology=new technology_model({
            label,value
         });
         if(create_technology){
           create_technology.save();
               return res.send({success:true,message:"Technology has been added!"})
         }
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-technology/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_technology=await technology_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_technology){
           return  res.send({success:false,message:"Technology  did not find!"})
          };
          res.send({success:true,message:"Technology has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-technology",ensureAuthenticated,async(req,res)=>{
    try {
       const technology_data=await technology_model.find();
       res.send({success:true,data:technology_data})
    } catch (error) {
        console.log(error)
    }
});
// -------------------category---------------------
// -------------add-website-------------
admin_route.post("/add-website",uploadimage.fields([{ name: "file"},{name:"banner2"},{name:"banner3"},{name:"banner4"},{name:"banner5"},{name:"banner6"},{name:"tutorial_banner"},{ name: "zipFile" }]),ensureAuthenticated,async(req,res)=>{
    try {
        console.log(req.body)
        const {category,technology,title,tutorialLink,tutorialLink2,tutorialLink3,tutorialLink4,tutorialtitle,like,love,note,demoFrontend,demoBackend,singleLicense,unlimitedLicense,bettinglicense,details,features,unlimitedfeatures,bettingfeatures}=req.body;
        if(!category || !technology || !title || !tutorialLink || !tutorialLink2 || !tutorialLink3 || !tutorialLink4 || !demoFrontend || !demoBackend || !singleLicense || !unlimitedLicense || !bettinglicense || !details || !features){
           return res.send({success:false,message:"Please fill up information!"})
        }
        console.log(req.files.banner4[0].filename)

        const create_website=new website_model({
            thumbnail:req.files.file[0].filename,tutorial_image:req.files.tutorial_banner[0].filename,category,technology,title,tutorialLink,tutorialLink2,tutorialLink3,tutorialLink4,note,tutorialtitle,like,love,demoFrontend,demoBackend,singleLicense,unlimitedLicense,bettinglicense,details,features,unlimitedfeatures,bettingfeatures,zipFile:req.files.zipFile[0].filename,banner2:req.files.banner2[0].filename,banner3:req.files.banner3[0].filename,banner4:req.files.banner4[0].filename,banner5:req.files.banner5[0].filename,banner6:req.files.banner6[0].filename
        });
        create_website.save();
       res.send({success:true,message:"Website has been created!"})


    } catch (error) {
        console.log(error)
    }
});
admin_route.post(
  "/update-website/:id",
  uploadimage.fields([
    { name: "file" },
    { name: "banner2" },
    { name: "banner3" },
    { name: "banner4" },
    { name: "banner5" },
    { name: "banner6" },
    { name: "zipFile" },
  ]),
  ensureAuthenticated,
  async (req, res) => {
    try {
      const {
        category,
        technology,
        title,
        tutorialLink,
        tutorialLink2,
        tutorialLink3,
        tutorialLink4,
        tutorialtitle,
        like,
        love,
        note,
        demoFrontend,
        demoBackend,
        singleLicense,
        unlimitedLicense,
        bettinglicense,
        details,
        features,
        unlimitedfeatures,
        bettingfeatures,
      } = req.body;

      // Prepare the update object dynamically
      const updateData = {
        category,
        technology,
        title,
        tutorialLink,
        tutorialLink2,
        tutorialLink3,
        tutorialLink4,
        tutorialtitle,
        like,
        love,
        note,
        demoFrontend,
        demoBackend,
        singleLicense,
        unlimitedLicense,
        bettinglicense,
        details,
        features,
        unlimitedfeatures,
        bettingfeatures,
      };

      // Add file paths to updateData if files are uploaded
      if (req.files.file) updateData.thumbnail = req.files.file[0].filename;
      if (req.files.zipFile) updateData.zipFile = req.files.zipFile[0].filename;
      if (req.files.banner2) updateData.banner2 = req.files.banner2[0].filename;
      if (req.files.banner3) updateData.banner3 = req.files.banner3[0].filename;
      if (req.files.banner4) updateData.banner4 = req.files.banner4[0].filename;
      if (req.files.banner5) updateData.banner5 = req.files.banner5[0].filename;
      if (req.files.banner6) updateData.banner6 = req.files.banner6[0].filename;

      // Remove undefined or null fields
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] === undefined || updateData[key] === null || updateData[key] === "") {
          delete updateData[key];
        }
      });

      // Update the document in the database
      const updatedWebsite = await website_model.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: updateData },
        { new: true } // Return the updated document
      );

      // Send success response
      res.send({ success: true, message: "Website has been updated!", data: updatedWebsite });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: "An error occurred while updating the website." });
    }
  }
);

admin_route.get("/all-websites",async(req,res)=>{
    try {
       const all_websites=await website_model.find();
       res.send({success:true,data:all_websites})
    } catch (error) {
        console.log(error)
    }
});

admin_route.get("/single-website/:id",async(req,res)=>{
  try {
     const all_websites=await website_model.findById({_id:req.params.id});
     console.log(req.params.id)
     res.send({success:true,data:all_websites})
  } catch (error) {
      console.log(error)
  }
});
admin_route.delete("/delete-website/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_website=await website_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_website){
           return  res.send({success:false,message:"Website  did not find!"})
          };
          res.send({success:true,message:"Website has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/single-website-details/:id",async(req,res)=>{
    try {
       const websites=await website_model.findById({_id:req.params.id});
       res.send({success:true,data:websites})
    } catch (error) {
        console.log(error)
    }
});
// ----------------------reviews----------------
admin_route.post("/add-feedback",uploadimage.single("file"),ensureAuthenticated,async(req,res)=>{
    try {
        console.log(req.body)
         const {customerName,rating,message}=req.body;
         if(!customerName || !rating || !message){
               return res.send({success:false,message:"Please enter information!"})
         }
         const create_feedback=new review_model({
            name:customerName,rating,message,image:req.file.filename
         });
         if(create_feedback){
            create_feedback.save();
               return res.send({success:true,message:"Feedback has been created!"})

         }
               return res.send({success:false,message:"Something went wrong!"})
       
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-feedback/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_feedback=await review_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_feedback){
           return  res.send({success:false,message:"Feedback  did not find!"})
          };
          res.send({success:true,message:"Feedback has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-feedback",async(req,res)=>{
    try {
       const feedback_data=await review_model.find();
       res.send({success:true,data:feedback_data})
    } catch (error) {
        console.log(error)
    }
});
// ------------------video-reviews-----------------
admin_route.post("/add-video-review",uploadimage.single("file"),ensureAuthenticated,async(req,res)=>{
    try {
         const {videoUrl}=req.body;
         console.log(req.body)
         if(!videoUrl){
               return res.send({success:false,message:"Please enter information!"})
         }
         const create_video_review=new video_review_model({
            thumbnail:req.file.filename,video_link:videoUrl
         });
         if(create_video_review){
            create_video_review.save();
               return res.send({success:true,message:"Video Review has been created!"})

         }
               return res.send({success:false,message:"Something went wrong!"})
       
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-video-review/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_video_review=await video_review_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_video_review){
           return  res.send({success:false,message:"Video review  did not find!"})
          };
          res.send({success:true,message:"Review has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-video-review",async(req,res)=>{
    try {
       const video_review=await video_review_model.find();
       res.send({success:true,data:video_review})
    } catch (error) {
        console.log(error)
    }
});
// ------------------add-tutorial-----------------
admin_route.post("/add-tutorial",uploadimage.single("file"),ensureAuthenticated,async(req,res)=>{
    try {
         const {videoUrl,category,title}=req.body;
         console.log(req.body)
         if(!videoUrl){
               return res.send({success:false,message:"Please enter information!"})
         }
         const create_tutorial=new tutorial_model({
            thumbnail:req.file.filename,tutorial_link:videoUrl,category,title
         });
         if(create_tutorial){
            create_tutorial.save();
               return res.send({success:true,message:"Video Review has been created!"})

         }
               return res.send({success:false,message:"Something went wrong!"})
       
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-tutorial/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_video_review=await tutorial_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_video_review){
           return  res.send({success:false,message:"Video review  did not find!"})
          };
          res.send({success:true,message:"Review has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-tutorials",async(req,res)=>{
    try {
       const video_review=await tutorial_model.find();
       res.send({success:true,data:video_review})
    } catch (error) {
        console.log(error)
    }
});
// ------------------courses---------------
admin_route.post("/add-course",uploadimage.single("file"),async(req,res)=>{
    try {
         const {title,reviews,students,price,offline_price}=req.body;
         console.log(req.body)
         if(!title || !reviews || !students || !price || !offline_price){
               return res.send({success:false,message:"Please enter information!"})
         }
         const create_course=new course_model({
          title,total_reviews:reviews,total_students:students,online_price:price,offline_price:offline_price,image:req.file.filename
         });
            create_course.save();
               return res.send({success:true,message:"Course has been created!"})

       
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-course/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_course=await course_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_course){
           return  res.send({success:false,message:"Course  did not find!"})
          };
                 if(delete_course){
                  fs.unlinkSync(`./public/images/${delete_course.image}`)
                  res.send({success:true,message:"Product has been deleted!"})
         }
          res.send({success:true,message:"Course has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-courses",async(req,res)=>{
    try {
       const courses=await course_model.find();
       res.send({success:true,data:courses})
    } catch (error) {
        console.log(error)
    }
});
// ------------add-brand-------------
admin_route.post("/add-brand",uploadimage.single("file"),async(req,res)=>{
    try {
         const {link}=req.body;
         console.log(req.file);
         console.log(link)
         if(!link){
               return res.send({success:false,message:"Please enter information!"})
         }
         const create_brand=new brand_model({
            link,image:req.file.filename
         });
               create_brand.save();
               return res.send({success:true,message:"Provider has been created!"});

    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-brand/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_provider=await brand_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_provider){
           return  res.send({success:false,message:"  did not find!"})
          };
          res.send({success:true,message:"Provider has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-provider",async(req,res)=>{
    try {
       const provider=await brand_model.find();
       res.send({success:true,data:provider})
    } catch (error) {
        console.log(error)
    }
});

// ------------add-site-------------
admin_route.post("/add-site",uploadimage.single("file"),async(req,res)=>{
    try {
         const {link}=req.body;
         if(!link){
               return res.send({success:false,message:"Please enter information!"})
         }
         const create_site=new site_model({
            link,image:req.file.filename
         });
               create_site.save();
               return res.send({success:true,message:"New Site has been created!"});

    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-site/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_site=await site_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_site){
           return  res.send({success:false,message:"  did not find!"})
          };
        //         //  if(delete_site){
        //         //   fs.unlinkSync(`./public/images/${delete_site.image}`)
        //         //   res.send({success:true,message:"Provider has been deleted!"})
        //  }
          res.send({success:true,message:"Site has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-site",async(req,res)=>{
    try {
       const sites=await site_model.find();
       res.send({success:true,data:sites})
    } catch (error) {
        console.log(error)
    }
});
// ----------------------admission----------------
admin_route.post("/add-admission",async(req,res)=>{
    try {
           console.log(req.body.schedule)
           const {name,phone,location,profession,schedule}=req.body;
           const create_admission=new admission_model({
            name,phone,location,profession,schedule
           });
           create_admission.save();
           res.send({success:true,message:"Admission created successfully!"})
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-admission/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const admission_feedback=await admission_model.findByIdAndDelete({_id:req.params.id});
          if(!admission_feedback){
           return  res.send({success:false,message:"Admission  did not find!"})
          };
          res.send({success:true,message:"Admission has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-admission",ensureAuthenticated,async(req,res)=>{
    try {
       const admission_data=await admission_model.find();
       res.send({success:true,data:admission_data})
    } catch (error) {
        console.log(error)
    }
});
// --------------payment-proof-----------------
admin_route.post("/add-payment",uploadimage.single("file"),ensureAuthenticated,async(req,res)=>{
    try {
           const create_payment=new payment_proof_model({
            image:req.file.filename
           });
           create_payment.save();
           res.send({success:true,message:"Payment created successfully!"})
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-payment/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const payment_proof=await payment_proof_model.findByIdAndDelete({_id:req.params.id});
          if(!payment_proof){
           return  res.send({success:false,message:"Payment  did not find!"})
          };
          res.send({success:true,message:"Payment has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-payment",async(req,res)=>{
    try {
       const payment_proof=await payment_proof_model.find();
       res.send({success:true,data:payment_proof})
    } catch (error) {
        console.log(error)
    }
});
// ------------------video-----------------
admin_route.post("/add-video",uploadimage.single("file"),ensureAuthenticated,async(req,res)=>{
    try {
         const {videoUrl,category}=req.body;
         console.log(req.body)
         if(!videoUrl || !category){
               return res.send({success:false,message:"Please enter information!"})
         }
         const create_video=new video_model({
            thumbnail:req.file.filename,video_link:videoUrl,category:category
         });
         if(create_video){
            create_video.save();
               return res.send({success:true,message:"Video has been created!"})

         }
               return res.send({success:false,message:"Something went wrong!"})
       
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-video/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_video=await video_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_video){
           return  res.send({success:false,message:"Video review  did not find!"})
          };
          res.send({success:true,message:"Video has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-videos",async(req,res)=>{
    try {
       const video=await video_model.find();
       const find_header_video=await video_model.findOne({category:"header"});
       const find_footer_video=await video_model.findOne({category:"footer"});
       res.send({success:true,data:video,find_header_video,find_footer_video})
    } catch (error) {
        console.log(error)
    }
});
// -------------------add-accordion---------------------
admin_route.post("/add-accordion",ensureAuthenticated,async(req,res)=>{
    try {
         const {label,value}=req.body;
         if(!label || !value){
               return res.send({success:false,message:"Please enter information!"})
         }
         const find_accordion=await accordion_model.findOne({label:label,value:value});
         if(find_accordion){
               return res.send({success:false,message:"Accordion already exist!"})
         }
         const create_accordion=new accordion_model({
                 title:label,details:value
         });
         if(create_accordion){
           create_accordion.save();
               return res.send({success:true,message:"Accordion has been added!"})
           
         }
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-accordion/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_accordion=await accordion_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_accordion){
           return  res.send({success:false,message:"Accordion  did not find!"})
          };
          res.send({success:true,message:"Accordion has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-accordions",async(req,res)=>{
    try {
       const accordion_data=await accordion_model.find();
       res.send({success:true,data:accordion_data})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/signle-accordion-details/:id",async(req,res)=>{
    try {
       const accordion_data=await accordion_model.findById({_id:req.params.id});
       res.send({success:true,data:accordion_data})
    } catch (error) {
        console.log(error)
    }
});
admin_route.post("/update-accordion/:id",async(req,res)=>{
    try {
       const accordion_data=await accordion_model.findByIdAndUpdate({_id:req.params.id},{$set:{title:req.body.title,details:req.body.details}});
       res.send({success:true,message:"Data updated!"})
    } catch (error) {
        console.log(error)
    }
});
// -------------add memeber-----------------
admin_route.post("/add-member",uploadimage.single("file"),ensureAuthenticated,async(req,res)=>{
    try {
         const {name,designation,facebook_link,twitter_link}=req.body;
         console.log(req.body)
         if(!name || !designation || !facebook_link || !twitter_link){
               return res.send({success:false,message:"Please enter information!"})
         }
         const create_member=new member_model({
            image:req.file.filename,name,designation,facebook_link,twitter_link
         });
         if(create_member){
            create_member.save();
               return res.send({success:true,message:"Member has been created!"})

         }
               return res.send({success:false,message:"Something went wrong!"})
       
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-member/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_member=await member_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_member){
           return  res.send({success:false,message:"Member  did not find!"})
          };
          res.send({success:true,message:"Member has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-member",async(req,res)=>{
    try {
       const member_data=await member_model.find();
       res.send({success:true,data:member_data})
    } catch (error) {
        console.log(error)
    }
});
// -----------------------ad achievement----------------
// -------------add memeber-----------------
admin_route.post("/add-achievement",uploadimage.single("file"),ensureAuthenticated,async(req,res)=>{
    try {
         const {title,description}=req.body;
         console.log(req.body)
         if(!title || !description){
               return res.send({success:false,message:"Please enter information!"})
         }
         const create_achievement=new achievement_model({
            image:req.file.filename,title,description
         });
         if(create_achievement){
            create_achievement.save();
               return res.send({success:true,message:"Achievement has been created!"})

         }
               return res.send({success:false,message:"Achievement went wrong!"})
       
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/delete-achievement/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_achievement=await achievement_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_achievement){
           return  res.send({success:false,message:"Achievement  did not find!"})
          };
          res.send({success:true,message:"Achievement has been deleted!"})
        }catch(err){
            console.log(err)
        }
});
admin_route.get("/all-achievement",async(req,res)=>{
    try {
       const achievement_data=await achievement_model.find();
       res.send({success:true,data:achievement_data})
    } catch (error) {
        console.log(error)
    }
});
// -----------------add payment method------------------
// Add a new payment method
admin_route.post('/manual-payment', async (req, res) => {
    try {

      const {
        gatewayName,
        currencyName,
        rate,
        minAmount,
        maxAmount,
        fixedCharge,
        percentCharge,
        depositInstruction,
        userData,
      } = req.body;
     
      console.log(depositInstruction)
      const newPaymentMethod = new payment_method_model({
        gatewayName,
        currency:currencyName,
        rate,
        minAmount,
        maxAmount,
        fixedCharge,
        percentCharge,
        depositInstruction,
        userData,
        // image: req.file.filename,
      });
  
      await newPaymentMethod.save();
      res.status(201).json({ message: 'Payment method added successfully!' });
    } catch (error) {
        console.log(error)
      res.send({ message: 'Error adding payment method', error });
    }
  });
  
  // Fetch all payment methods
  admin_route.get('/payment-methods', async (req, res) => {
    try {
      const paymentMethods = await payment_method_model.find();
      res.status(200).json({data:paymentMethods});
    } catch (error) {
      res.status(500).json({ message: 'Error fetching payment methods', error });
    }
  });
  
  // Delete a payment method
  admin_route.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await payment_method_model.findByIdAndDelete(id);
      res.status(200).json({ success:true,message: 'Payment method deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting payment method', error });
    }
  });
//   ------------------orders--------------
admin_route.get("/all-orders",async(req,res)=>{
    try {
        const order_data=await order_model.find().sort({ createdAt: -1 });
        const pending_order=await order_model.find({status:"processing"});
        const pending_deposit=await deposit_model.find({status:"Pending"});
        const total_customer=await UserModel.find();
        const total_invoice=await invoice_model.find();
        const pending_orders=await order_model.find({status:"অডার পেন্ডিং আছে"});
        if(order_data){
               res.send({success:true,data:order_data,pending_order,pending_deposit,pending_orders,total_customer,total_invoice})
        }
    } catch (error) {
        console.log(error)
    }
});
admin_route.put("/update-order-status/:id", async (req, res) => {
  try {
      const status = req.body.status;
      console.log(status);
      const order_data = await order_model.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { status: status } },
        { new: true } // Ensure the updated document is returned
    );

    if (!order_data) {
        return res.status(404).send({ success: false, message: "Order not found" });
    }
      // Define the statuses that require updates
      const statusesToUpdate = [
          "এডমিন চেক করছেন", 
          "অডার টি গ্রহন করা হয়েছে", 
          "ডাউলোড করুন স্ক্রিপ্ট", 
          "ডোমেইন হোস্ট ক্রয় হয়েছে", 
          "ডিজাইন ডেভেলপমেন্ট চলছে", 
          "ডিজাইন সম্পূর্ন", 
          "ডেভেলপমেন্ট হয়েছে", 
          "ভিজিট করুন সাইট", 
          "এ পি আই অডার হয়েছে", 
          "এ পি আই সেটআপ চলছে", 
          "ডেলিভারী করা হয়েছে", 
          "প্রজেক্ট সম্পূর্ণ"
      ];

      // Only proceed if status is in the allowed list
      if (statusesToUpdate.includes(status)) {
          // Find customer details
          const find_customer = await UserModel.findById({ _id: order_data.customer_id });

          if (!find_customer) {
              return res.status(404).send({ success: false, message: "Customer not found" });
          }

          // Update customer's financial details
          find_customer.paid_amount += order_data.paid || 0;
          find_customer.due_balance += order_data.due_payment || 0;
          find_customer.total_order += 1;

          // Save customer updates
          await find_customer.save();

          // Respond with success
          res.send({
              success: true,
              message: "Status has been updated and financial details adjusted",
              data: order_data
          });
      } else {
          // If status is not in the list, just update the order without affecting financials
          const order_data = await order_model.findByIdAndUpdate(
              { _id: req.params.id },
              { $set: { status: status } },
              { new: true }
          );

          if (!order_data) {
              return res.status(404).send({ success: false, message: "Order not found" });
          }

          res.send({
              success: true,
              message: "Status has been updated without affecting financial details",
              data: order_data
          });
      }
  } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: "Something went wrong" });
  }
});

admin_route.delete('/delete-order/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await order_model.findByIdAndDelete(id);
      res.status(200).json({ success:true,message: 'Order deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting payment method', error });
    }
});
admin_route.get("/single-order/:id",async(req,res)=>{
    try {
        const order_data=await order_model.findById({_id:req.params.id});
        if(order_data){
               res.send({success:true,data:order_data})
        }
    } catch (error) {
        console.log(error)
    }
});
// ---------------deposit-data-------------
admin_route.get("/all-deposits",async(req,res)=>{
    try {
        const deposit_data=await deposit_model.find().sort({ createdAt: -1 });
        if(deposit_data){
               res.send({success:true,data:deposit_data})
        }
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete('/delete-deposit/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await deposit_model.findByIdAndDelete(id);
      res.status(200).json({ success:true,message: 'Deposit deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting payment method', error });
    }
});
  admin_route.put("/update-deposit-status/:id", async (req, res) => {
    try {
      const { status } = req.body;
  
      // Update the deposit status
      const deposit_data = await deposit_model.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { status: status } },
        { new: true } // Return the updated document
      );
  
      if (!deposit_data) {
        return res.status(404).send({ success: false, message: "Deposit not found" });
      }
  
      // If status is "completed", update the user's deposit balance
      if (status === "Approved") {
        const userId = deposit_data.userId;
        userId.dposit_balance+=deposit_data.amount;
        // Find the user and update the deposit balance
        const updatedUser = await UserModel.findByIdAndUpdate(
          { _id: userId },
          { $inc: { deposit_balance: deposit_data.amount } }, // Increment deposit_balance by the deposit amount
          { new: true } // Return the updated user document
        );
  
        if (!updatedUser) {
          return res
            .status(404)
            .send({ success: false, message: "User not found, balance not updated" });
        }
        return res.send({
          success: true,
          message: "Status and user deposit balance have been updated",
          data: deposit_data,
        });
      }
  
      // If status is not "completed", return a success message for status update only
      res.send({ success: true, message: "Status has been updated", data: deposit_data });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: "An error occurred", error });
    }
});
  // --------------add-ads-----------------
admin_route.post("/add-ads",uploadimage.single("file"),async(req,res)=>{
  try {
         const create_payment=new ads_model({
          image:req.file.filename,
          url:req.body.url
         });
         create_payment.save();
         res.send({success:true,message:"Ads created successfully!"})
  } catch (error) {
      console.log(error)
  }
});
admin_route.delete("/delete-ads/:id",ensureAuthenticated,async(req,res)=>{
      try{
        const payment_proof=await ads_model.findByIdAndDelete({_id:req.params.id});
        if(!payment_proof){
         return  res.send({success:false,message:"Payment  did not find!"})
        };
        res.send({success:true,message:"Ads has been deleted!"})
      }catch(err){
          console.log(err)
      }
});
admin_route.get("/all-ads",async(req,res)=>{
  try {
     const payment_proof=await ads_model.find();
     res.send({success:true,data:payment_proof})
  } catch (error) {
      console.log(error)
  }
});
// -----------------------all customer--------------------
admin_route.get("/all-customers",async(req,res)=>{
  try {
     const all_customers=await UserModel.find().sort({ createdAt: -1 });
     res.send({success:true,data:all_customers})
  } catch (error) {
      console.log(error)
  }
});
admin_route.delete("/delete-customer/:id",ensureAuthenticated,async(req,res)=>{
  try{
    const delete_customer=await UserModel.findByIdAndDelete({_id:req.params.id});
    if(!delete_customer){
     return  res.send({success:false,message:"Customer  did not find!"})
    };
    res.send({success:true,message:"Customer has been deleted!"})
  }catch(err){
      console.log(err)
  }
});
// ---------------/admin-informations---------------
admin_route.get("/admin-informations/:id",ensureAuthenticated,async(req,res)=>{
  try {
    const find_data=await UserModel.findById({_id:req.params.id});
    res.send({success:true,message:"Ok",data:find_data})
  } catch (error) {
    console.log(error)
  }
});
admin_route.put("/update-details",async(req,res)=>{
  try {
    const {name,email,password}=req.body;
    console.log(name,email,password)
     const find_user=await UserModel.findOne({email});
     console.log(find_user)
     if(!email){
      res.send({success:false,message:"Wrong email!"})
     }
    // console.log(find_user._id)
    const hash_password=await bcrypt.hash(password,10);
    const update_data=await UserModel.findByIdAndUpdate({_id:find_user._id},{$set:{name,email,password:hash_password}});
    console.log(update_data)
    res.send({success:true,message:"Updated successfully"})
  } catch (error) {
    console.log(error)
  }
});
admin_route.get("/customer-details/:id",async(req,res)=>{
  try {
    const customer_information=await UserModel.findById({_id:req.params.id});
    res.send({success:true,data:customer_information})
  } catch (error) {
    console.log(error)
  }
});
admin_route.get("/customer-profile/:email",async(req,res)=>{
  try {
    const customer_information=await UserModel.findOne({email:req.params.email});
    res.send({success:true,data:customer_information})
  } catch (error) {
    console.log(error)
  }
});
admin_route.put("/user-status-update/:id",async(req,res)=>{
  try {
     const {status}=req.body;
     const update_status=await UserModel.findByIdAndUpdate({_id:req.params.id},{$set:{status:status}});
     if(update_status){
       res.send({success:true,message:"User Stauts Updated Successfully!"})
     }
  } catch (error) {
    console.log(error)
  }
});
// ----------------------create-invoice-----------------------------
const sendInvoiceEmail = async (customerEmail, customerName, invoiceData) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shihabmoni15@gmail.com",
        pass: "kxyb btad rldf fpsn",
      },
    });

    const paymentUrl = `${process.env.site_url}/pay?invoiceId=${invoiceData.invoiceId}&amount=${invoiceData.Due}&customer_id=${invoiceData.customerId}`;
    
    const mailOptions = {
      from: '"Oracle Technology LLC"shihabmoni15@gmail.com',
      to: customerEmail,
      subject: `Invoice Notification - ${invoiceData.invoiceId}`,
      html: `
        <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://i.ibb.co.com/JFSq6qmN/update-logo-tm.png" alt="Company Logo" style="max-width: 150px;">
          </div>
          <h2 style="color: #333; text-align: center;">Invoice Details</h2>
          <p><strong>Invoice ID:</strong> ${invoiceData.invoiceId}</p>
          <p><strong>Customer Name:</strong> ${customerName}</p>
          <p><strong>Customer ID:</strong> ${invoiceData.customerId}</p>
          <p>${invoiceData.message}</p>
          <p><strong>Invoice Date:</strong> ${invoiceData.createdAt}</p>
          <p><strong>Amount:</strong> ${invoiceData.Amount} USDT</p>

          <div style="text-align: center; margin-top: 20px;">
            <a href="${paymentUrl}" target="_blank" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 5px;">Pay Now</a>
          </div>
          
          <p style="text-align: center; margin-top: 20px;">Thank you for your business!</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Invoice email sent successfully.");
  } catch (error) {
    console.error("Error sending invoice email:", error);
  }
};
// API Route to send invoice
admin_route.post("/sent-invoice", async (req, res) => {
  try {
    const { customer_id, amount,message} = req.body;

    if (!customer_id || !amount) {
      return res.send({ success: false, message: "All Fields are required!" });
    }

    const find_user = await UserModel.findById({_id:customer_id});
    if (!find_user) {
      return res.send({ success: false, message: "User not found!" });
    }
   console.log(find_user)
    const generateInvoiceId = () => {
      return `INV-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    };
    
    const invoiceId = generateInvoiceId();

    // Create and save invoice
    const create_invoice = new invoice_model({
      invoice_id: invoiceId,
      name: find_user.name,
      email: find_user.email,
      customer_id: find_user._id,
      amount:amount,
      due_amount: find_user.due_balance,
      message:message,
    });

    await create_invoice.save();

    // Prepare invoice data from created invoice
    const invoiceData = {
      invoiceId:invoiceId,
      customerId:customer_id,
      Due: find_user.due_balance,
      Amount:amount,
      createdAt: create_invoice.createdAt,
      message:message
    };

    await sendInvoiceEmail(find_user.email, find_user.name, invoiceData);
    res.send({ success: true, message: "Invoice created and email sent!" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});
admin_route.get("/all-invoice",async(req,res)=>{
  try {
    const all_invoice=await invoice_model.find();
    res.send({success:true,message:"Ok",data:all_invoice})
  } catch (error) {
    console.log(error)
  }
});
admin_route.delete("/delete-invoice/:id",async(req,res)=>{
  try {
    const delete_invoice=await invoice_model.findByIdAndDelete({_id:req.params.id});
    if(delete_invoice){
      res.send({success:true,message:"Ok"})
    }
  } catch (error) {
    console.log(error)
  }
});

admin_route.get("/due-orders",async(req,res)=>{
  try {
    const due_orders=await due_model.find();
    res.send({success:true,message:"Ok",data:due_orders})
  } catch (error) {
    console.log(error)
  }
});
admin_route.delete('/delete-due-order/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await due_model.findByIdAndDelete(id);
    res.status(200).json({ success:true,message: 'Due Order deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment method', error });
  }
});

admin_route.put("/update-due-order-status/:id", async (req, res) => {
  try {
      const status = req.body.status;
      console.log(status);
      const order_data = await due_model.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { status: status } },
        { new: true } // Ensure the updated document is returned
    );

    if (!order_data) {
        return res.status(404).send({ success: false, message: "Order not found" });
    }
      // Define the statuses that require updates
      const statusesToUpdate = [
         "Approved"
      ];

      // Only proceed if status is in the allowed list
      const find_due_order=await due_model.findById({_id:req.params.id})
      const update_order=await order_model.findOne({invoice_id:order_data.invoice_id});
      console.log(find_due_order)
      if (statusesToUpdate.includes(status)) {
          // Find customer details
          update_order.paid+=order_data.paid;
          update_order.due_payment-=order_data.paid;
          update_order.save();
          const find_customer = await UserModel.findById({ _id: order_data.customer_id });
          if (!find_customer) {
              return res.status(404).send({ success: false, message: "Customer not found" });
          }

          // Update customer's financial details
          find_customer.paid_amount += order_data.paid || 0;
          find_customer.due_balance -= order_data.due_payment || 0;
          find_customer.total_order += 1;

          // Save customer updates
          await find_customer.save();

          // Respond with success
          res.send({
              success: true,
              message: "Status has been updated and financial details adjusted",
              data: order_data
          });
      } else {
          // If status is not in the list, just update the order without affecting financials
          const order_data = await order_model.findByIdAndUpdate(
              { _id: req.params.id },
              { $set: { status: status } },
              { new: true }
          );

          if (!order_data) {
              return res.status(404).send({ success: false, message: "Order not found" });
          }

          res.send({
              success: true,
              message: "Status has been updated without affecting financial details",
              data: order_data
          });
      }
  } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: "Something went wrong" });
  }
});

// -------------------login-by-email----------------------------
admin_route.post("/find-user-by-email",async(req,res)=>{
  try {
     const find_email=await UserModel.findOne({email:req.body.email});
     if(!find_email){
       return res.send({success:false,message:"Email not found!"})
      }
        const jwtToken = jwt.sign(
                  { email: find_email.email, _id: find_email._id },
                  process.env.JWT_SECRET,
                  { expiresIn: '24h' }
              )
      
              res.status(200)
                  .json({
                      message: "Login Success",
                      success: true,
                      jwtToken,
                      email:find_email.email,
                           admin_data: find_email
                  })
     res.send({success:true,message:"Successful",data:find_email})
  } catch (error) {
    console.log(error)
  }
})
module.exports=admin_route;