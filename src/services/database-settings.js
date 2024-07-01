import express from 'express'
import { DataBase } from './database.js'
import cors from 'cors';

const app = express()
const port = 4000

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Reemplaza con el origen de tu aplicación React
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.get('/', (req, res) => {
    res.send('Hola');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await DataBase.login({ username, password })
        res.send({ user })
    } catch (error) {
        // res.status(401).send(error.message)        
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    console.log({ username, password })

    try {
        const id = await DataBase.create({ username, password });
        res.send({ id });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/logout', (req, res) => {
    // Implementación del endpoint de logout si es necesario
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                return res.status(500).send('Error al cerrar sesión');
            }
            res.sendStatus(204);
        });
    } else {
        res.sendStatus(204);
    }
});

app.get('/protected', (req, res) => {
    // Implementación del endpoint protegido si es necesario
    res.send({ message: 'Acceso permitido a recursos protegidos' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
