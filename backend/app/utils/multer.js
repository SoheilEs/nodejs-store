const multer = require("multer")
const path = require("path")
const fs = require("fs")
const createHttpError = require("http-errors")
function createRoute(req){
    const date = new Date()
    const Year = date.getFullYear().toString()
    const Month = date.getMonth().toString() 
    const Day = date.getDay().toString()
    const Dir = path.join(__dirname,"..","..","public","uploads","blogs",Year,Month,Day)
    req.body.fileUploadPath = path.join("uploads","blogs",Year,Month,Day)
    fs.mkdirSync(Dir,{recursive:true})
    return Dir
}

const storage = multer.diskStorage({
    destination:(req,file,callBack)=>{
        if(file.originalname){
            const filePath = createRoute(req)
            return callBack(null,filePath)
        }
        callBack(null,null)
    },
    filename:(req,file,callBack)=>{
            if(file.originalname){
                const ext = path.extname(file.originalname)
                const fileName = String(new Date().getTime() + ext)
                req.body.filename = fileName
                return callBack(null,fileName)

            }
            callBack(null,null)
    }
})
const fileFilter = (req,file,callBack)=>{
    const ext = path.extname(file.originalname)
    const mimetype = [".png",".jpg",".jpeg",".webp",".gif"]
    if(mimetype.includes(ext)) return callBack(null,true)
    return callBack(createHttpError.BadRequest("فرمت فایل صحیح نمی باشد"))
}

const videoFilter = (req,file,callBack)=>{
    const ext = path.extname(file.originalname)
    const mimetype = [".mp4",".mpg",".mov",".avi",".mkv"]
    if(mimetype.includes(ext)) return callBack(null,true)
    return callBack(createHttpError.BadRequest("فرمت ویدیو صحیح نمی باشد"))
}
const uploadFile = multer({
    storage, 
    fileFilter,
    limits:{
        fileSize: 1 * 1000 * 1000 //1MB
    }
})
const videoUpload = multer({
    storage, 
    videoFilter,
    limits:{
        fileSize: 300 * 1000 * 1000 //3MG
    }
})

module.exports = {
    uploadFile,
    videoUpload
}