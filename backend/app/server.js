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
const expressEjsLayouts = require("express-ejs-layouts")
const { initialSocket } = require("./utils/initSocket")
const { socketHandler } = require("./socket.io")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const { COOKIE_PARSER_SECRET } = require("./utils/constans")
const { clientHelper } = require("./utils/client")

dotenv.config()

module.exports = class Application{
    #app = express()
    #DB_URI
    #PORT
    constructor(PORT,DB_URI){
        this.#PORT=PORT
        this.#DB_URI= DB_URI
        this.configApplication()
        this.initClientSession()
        this.initTempleteEngine()
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
        const http = require("http")
        const server = http.createServer(this.#app)
        const io = initialSocket(server)
        socketHandler(io)
        server.listen(this.#PORT,()=>{
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
    initTempleteEngine(){
        this.#app.use(expressEjsLayouts)
        this.#app.set("view engine","ejs")
        this.#app.set("views",path.join(__dirname,"..","resource","views"))
        this.#app.set("layout extractStyles",true)
        this.#app.set("layout extractScripts",true)
        this.#app.set("layout","./layouts/master")
        this.#app.use((req,res,next)=>{
            this.#app.locals = clientHelper(req,res)
            next()
        })
    }
    initClientSession(){
        this.#app.use(cookieParser(COOKIE_PARSER_SECRET))
        this.#app.use(session({
            secret: COOKIE_PARSER_SECRET,
            resave: true,
            saveUninitialized: true,
            cookie:{
                secure: true
            }
        }))
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