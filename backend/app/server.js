const express = require("express")
const { default: mongoose } = require("mongoose")
const path = require("path")
const { AllRoutes } = require("./routes/router")
const morgan = require("morgan")
const createError =  require("http-errors")
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

module.exports = class Application{
    #app = express()
    #DB_URI
    #PORT
    constructor(PORT,DB_URI){
        this.#PORT=PORT
        this.#DB_URI= DB_URI
        this.configApplication()
        this.connectToMongoDB()
        this.initRedis()
        this.createServer()
        this.createRoutes()
        this.errorHandling()
    }
    configApplication(){
        this.#app.use(morgan("dev",))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended:true}))
        this.#app.use(cors())
        this.#app.use(express.static(path.join(__dirname,"..","public")))
        this.#app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(swaggerJsDoc({
            swaggerDefinition:{
                openapi:"3.0.0",
                info:{
                    title: "Store app",
                    version: "2.0.0",
                    description:"بزرگترین بزرگترین فروشگاه اینترنتی"
                },
                components:{
                    securitySchemes : {
                        BearerAuth : {
                            type : "http",
                            scheme : "bearer",
                            bearerFormat : "JWT"
                        }
                    }
                }, 
                security : [{BearerAuth : []}]
            },
            apis : [process.cwd() + "/app/http/**/*.swagger.js"]
        }),
        {explorer:true},
        ))
    }
    createServer(){
        this.#app.listen(this.#PORT,()=>{
            console.log("Run > http://localhost:" + this.#PORT);
        })
    }
    async connectToMongoDB(){
       try{
           if(mongoose.connections[0].readyState) return console.log("DB already Connected...");
           await mongoose.connect(this.#DB_URI)
           process.on("SIGINT",async()=>{
                console.log("\n db disconnected...");
                await mongoose.connection.close()
                process.exit(0)
           })
            console.log("connected to MongoDB......");
       }catch(error){
            console.log(error?.message ?? "Failed DB Connection...");
       }
    }
    initRedis(){
      require("../app/utils/init_redis")
    }
    createRoutes(){
        this.#app.use(AllRoutes)
    }
    errorHandling(){
        this.#app.use((req,res,next)=>{
          next(createError.NotFound("صفحه یافت نشد"))
        })
        this.#app.use((error,req,res,next)=>{
            const serverError = createError.InternalServerError()
            const statusCode = error.status || serverError.status
            const message = error.message || serverError.message
            return res.status(statusCode).json({
                errors:{
                    statusCode ,
                    message
                }
            })
        })
    }
}