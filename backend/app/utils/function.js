const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const { userModel } = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_KEY } = require("./constans");
const redisClient = require("./init_redis");
const fs = require("fs");
const path = require("path");


const randomNumberGen = () => {
  return Math.floor(Math.random() * 90000 + 10000);
};
const signAccessToken = (userId) => {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1h",
    };
    JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err)
        reject(createError.InternalServerError("خطای سمت سرور رخ داده است"));
      resolve(token);
    });
  });
};
const signRfreshToken = (userId) => {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1y",
    };
    JWT.sign(payload, REFRESH_TOKEN_KEY, options, async (err, token) => {
      if (err)
        reject(createError.InternalServerError("خطای سمت سرور رخ داده است"));
      await redisClient.SETEX(user._id.valueOf(), 365 * 24 * 60 * 60, token);
      resolve(token);
    });
  });
};
const VerifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_KEY, async (error, payload) => {
      try{
        if (error) reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
        const { mobile } = payload || {};
        const user = await userModel.findOne({ mobile }, { password: 0, otp: 0 });
        if (!user) reject(createError.Unauthorized("حساب کاربری یافت نشد"));
        const refreshToken = await redisClient.GET(user?._id.valueOf());
        if (token === refreshToken) resolve(user.mobile);
        else reject(createError.Unauthorized("وارد حساب کاربری خود شوید"))
      }catch(error){
        reject(createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"));
      }
       
        
      
    });
  });
};

const deleteFile = (fileAddress) => {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
};

const listOfimagesFromRequest = (files, fileUploadPath) => {
  if (files?.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath, file.filename))
      .map((item) => item.replace(/\\/g, "/"));
  } else {
    return [];
  }
};

const copyObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const setFeatures = (body) => {
  const { colors, width, weight, height, length } = body;
  let features = {};
  features.colors = colors;
  if (!isNaN(+weight) || !isNaN(+width) || !isNaN(+height) || !isNaN(+length)) {
    if (!width) features.width = 0;
    else features.weight = width;
    if (!height) features.height = 0;
    else features.height = height;
    if (!length) features.length = 0;
    else features.length = length;
    if (!weight) features.weight = 0;
    else features.weight = weight;
  }
  return features;
};

const deleteInvalidPropertyInObject = (data = {}, blackListFields = []) => {
  let nullishData = ["", " ", null, undefined, NaN, 0, "0"];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] === "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length > 0)
      data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key]) && data[key].length === 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
};

function getTime(totalSeconds) {
  




let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds) % 60;
minutes = String(minutes).padStart(2, "0");
hours = String(hours).padStart(2, "0");
seconds = String(seconds).padStart(2, "0");

  return hours + ":" + minutes + ":" + seconds;
}
function getTimeOfCourse(chapters=[]){
  let time , hours, minutes, seconds = 0;
  
  for(const chapter of chapters){
    
    for (const episode of chapter.episodes) {
      if(episode?.time) time = episode.time.split(":")
      else time = "00:00:00".split(":")
      if(time.length === 3){
        seconds += +time[0] * 3600
        seconds += +time[1] * 60
        seconds += +time[2] 
      }else if(time.length === 2){
        seconds += +time[0] * 60
        seconds += +time[1]

      }
    }
  }
  hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds) % 60;
  minutes = String(minutes).padStart(2, "0");
  hours = String(hours).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  return hours + ":" + minutes + ":" + seconds;
}

async function getBasketOfUser(userID,discount={}){
  const userDetail = await userModel.aggregate([
    {
        $match:{ _id: userID},

    },{
        $project:{
            basket:1
        }
    },
    {
        $lookup:{
            from:"products",
            localField:"basket.product.productID",
            foreignField:"_id",
            as:"productDetail"
        }
    },{
        $lookup:{
            from:"courses",
            localField:"basket.course.courseID",
            foreignField: "_id",
            as:"courseDetail"
        }
    }
    ,{
        $addFields:{
            "productDetail":{
                $function:{

                    body: function(productDetail,product){
                       return productDetail.map(function(pr){
                            const count = product.find(item=> item.productID.valueOf()=== pr._id.valueOf()).count
                            const totalPrice = count * pr.price
                            return{
                                ...pr,
                                basketCount: count,
                                totalPrice:  totalPrice ,
                                finalPrice: totalPrice - ((pr.discount / 100) * totalPrice),
                            }
                        } )
                    },
                    args:["$productDetail","$basket.product"],
                    lang:"js"
                }
            }
        ,
    
            "courseDetail":{
                $function:{

                    body: function(courseDetail){
                       return courseDetail.map(function(cr){
                
                            const totalPrice = cr.price
                            return{
                                ...cr,
                                totalPrice:  totalPrice ,
                                finalPrice:  totalPrice - ((cr.discount / 100) * totalPrice),
                            }
                        } )
                    },
                    args:["$courseDetail"],
                    lang:"js"
                }
            },
            "payDetail":{
                $function:{
                    body:function(courseDetail,productDetail,product){
                        
                        const courseAmount = courseDetail.reduce((total,cr)=>{
                            return total + (cr.price - (cr.discount / 100) * cr.price)
                        },0)
                        const productAmount = productDetail.reduce((total,pr)=>{
                            
                            const count = product.find(item => item.productID.valueOf() === pr._id.valueOf()).count
                
                            const totalPrice = count * pr.price
                            return total + (totalPrice - (pr.discount / 100) * pr.price)
                        },0)
                        const courseIds = courseDetail.map(item=> item._id.valueOf())
                        const productIds = productDetail.map(item=> item._id.valueOf())
                      
                        return{
                            courseAmount,
                            productAmount,
                            paymentAmount: courseAmount + productAmount,
                            courseIds,
                            productIds,
                        }
                    },
                    args:["$courseDetail","$productDetail","$basket.product"],
                    lang:"js"
                }
            }
        }
    },
 {$project:{"basket":0}}
])
return userDetail
}

module.exports = {
  randomNumberGen,
  signAccessToken,
  signRfreshToken,
  VerifyRefreshToken,
  deleteFile,
  listOfimagesFromRequest,
  copyObject,
  setFeatures,
  deleteInvalidPropertyInObject,
  getTime,
  getTimeOfCourse,
  getBasketOfUser
};
