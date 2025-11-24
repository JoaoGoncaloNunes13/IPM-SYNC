import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';

import * as data from './data/users-data.mjs';
import syncServicesInit from './services/sync-services.mjs';

// Rotas
import authRoutes from './routes/auth.mjs';
import homeRoutes from './routes/home.mjs';
import serverRoutes from './routes/servers.mjs';
import helpRoutes from './routes/help.mjs';
import canaisRoutes from './routes/canais.mjs';

const PORT = process.env.PORT || 1906;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Inicializar dados
data.initializeData();
const syncServices = syncServicesInit(data);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: "projeto sync",
    resave: false,
    saveUninitialized: true
}));


app.use((req, res, next) => {
    req.session.count = (req.session.count || 0) + 1;
    next();
});
app.use((req, res, next) => {
    res.locals.loggedIn = !!req.session.userId;
    next();
});

app.use(express.static(path.join(__dirname, 'site/public')));


app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'site/views/layouts'),
    partialsDir: path.join(__dirname, 'site/views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'site/views'));
import hbs from 'hbs';
hbs.registerPartials(path.join(__dirname, 'site/views/partials'));

// Rotas
app.use('/', authRoutes);
app.use('/', homeRoutes);
app.use('/', serverRoutes);
app.use('/', helpRoutes);
app.use('/', canaisRoutes);

// Iniciar servidor
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
