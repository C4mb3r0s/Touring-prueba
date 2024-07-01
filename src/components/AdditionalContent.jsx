import React from 'react';
import { useState, useEffect } from 'react';

// Funcion general para el consumo de la API
function AdditionalContent() {
    const [data, setData] = useState(null);

    // Se llama la api y se estrae la data
    useEffect(() => {
        fetch("http://localhost:3000/api/videos")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error Fetching data:', error));
    }, []);

    // Imprimimos en el return el html y con ayuda del operador ternariose imprime el contenido o lo marca como cargando...
    return (
        <section className="additional-content" id='2'>
            {data ? (data.map((video) => (
                    <div className="box" key={video.id}>
                        <div dangerouslySetInnerHTML={{ __html: video.frame }} />
                        <h2>{video.titulo}</h2>
                        <p>Aportación de:<label>{video.user}</label></p>
                    </div>
                ))
            ) : (
                <p>Cargando...</p>
            )}
        </section>
    );
};

export default AdditionalContent;