// app.js
import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let videos = [
    { id: 1, frame: '<iframe width="358.51" height="207.36" src="https://www.youtube.com/embed/DS4iVV8_cp4" title="🇯🇵 JPN vs  🇧🇷 BRA - Full Match | Men&#39;s VNL 2022" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', titulo: 'Japón VS Brasil -Var- VNL 2022', user: 'Camberos' },
    { id: 2, frame: '<iframe width="358.51" height="207.36" src="https://www.youtube.com/embed/LBqF3Pyf5Vg" title="🇨🇳 CHN vs. 🇦🇺 AUS - AVC Challenge Cup 2024 | Playoffs - presented by VBTV" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', titulo: 'China VS Australia -Var- AVC Challenge CUP 2024', user: 'Camberos' },
    { id: 3, frame: '<iframe width="358.51" height="207.36" src="https://www.youtube.com/embed/FThS0z1v9nE" title="DOM🇩🇴 vs. THA🇹🇭 - Full Match | Women&#39;s U21 World Championship | Aguascalientes" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', titulo: 'RepDom VS Thailand -Fem- World champions 2021', user: 'Camberos' },
];

// GET: Obtener todos los videos
app.get('/api/videos', (req, res) => {
    res.json(videos);
});

// POST: Crear un nuevo video
app.post('/api/videos', (req, res) => {
    const nuevoVideo = {
        id: videos.length + 1,
        frame: req.body.frame,
        titulo: req.body.titulo,
        user: req.body.user,
    };
    videos.push(nuevoVideo);
    res.status(201).json(nuevoVideo);
});

// PUT: Actualizar un video existente
app.put('/api/videos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const video = videos.find(v => v.id === id);
    if (video) {
        video.frame = req.body.frame,
            video.titulo = req.body.titulo;
        video.user = req.body.user;
        res.json(video);
    } else {
        res.status(404).json({ message: 'Video no encontrado' });
    }
});

// DELETE: Eliminar un video
app.delete('/api/videos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = videos.findIndex(v => v.id === id);
    if (index !== -1) {
        const videoEliminado = videos.splice(index, 1);
        res.json(videoEliminado[0]);
    } else {
        res.status(404).json({ message: 'Video no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
