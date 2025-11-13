import express from 'express'
import cors from 'cors'
import hbs from 'hbs'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import url from 'url'
import passport from 'passport'
import path from 'path'

import * as data from './data/users-data.mjs'
import syncServicesInit from './services/sync-services.mjs'
import syncSiteInit from './site/sync-http-site.mjs'

const PORT = 1906



console.log("Start setting up server")
let app = express()
data.initializeData()

const syncServices = syncServicesInit(data)
const syncSite = syncSiteInit(syncServices)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(session({
    secret: "projeto sync",
//    store: new FileStore()
}
))

// view engine setup
//const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//app.set('view engine', 'hbs');
//app.set('views', path.join(__dirname, 'web', 'site', 'views'));


app.use(cookieMwSession)

//ROTAS
//app.get('/login', syncSite.login)
//app.post('/login', syncSite.validateLogin)
//app.get('/logout', syncSite.logout)

app.post('/createUser', syncSite.createUser)

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`))

function cookieMwSession(req, rsp, next) {
    let count = req.session.count

    if(count == undefined) {
        req.session.count = 0
    }
    ++req.session.count
    //console.log(req.session.count)
    
    next()
}
