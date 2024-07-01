import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';

const MiTabla = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/videos")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error :', error));
  }, []);

  useEffect(() => {
    if (data) {
      $('#dataTable').DataTable().destroy(); // Destruye la tabla existente antes de recrearla
      $('#dataTable').DataTable({
        data: data,
        columns: [
          { data: 'id' },
          { data: 'frame', render: $.fn.dataTable.render.text() },
          { data: 'titulo' },
          { data: 'user' },
          {
            data: null,
            render: function (data, type, row) {
              return (
                <div className="row">
                  <button onClick={() => handleEdit(row)}>Editar</button>
                  <button onClick={() => handleDelete(row.id)}>Eliminar</button>
                </div>
              );
            }
          }
        ]
      });
    }
  }, [data]);

  const handleEdit = (row) => {
    // Aquí puedes llamar a la función de editar que tienes definida en app.js
    console.log('Editar video:', row);
    // Por ejemplo, podrías redirigir a una página de edición o mostrar un formulario de edición
  };

  const handleDelete = (id) => {
    // Aquí puedes llamar a la función de eliminar que tienes definida en app.js
    console.log('Eliminar video con ID:', id);
    // Por ejemplo, podrías enviar una solicitud DELETE al servidor
    fetch(`http://localhost:3000/api/videos/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Video eliminado:', data);
        // Actualizar los datos después de eliminar el video
        fetchData();
      })
      .catch(error => console.error('Error eliminando video:', error));
  };

  const fetchData = () => {
    fetch("http://localhost:3000/api/videos")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error Fetching data:', error));
  };

  return (
    <div className='container-content'>
      <h2>Juegos añadidos</h2>
      <button className='new-game'>Añadir juego +</button>
      <div className='container'>
        <table id='dataTable' className='display'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Frame del video</th>
              <th>Título</th>
              <th>Usuario que lo asignó</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map(video => (
                <tr key={video.id}>
                  <td>{video.id}</td>
                  <td>{video.frame}</td>
                  <td>{video.titulo}</td>
                  <td>{video.user}</td>
                  <td>
                    <div className="row">
                      <button onClick={() => handleEdit(row)}>Editar</button>
                      <button onClick={() => handleDelete(row.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5'>Cargando...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MiTabla;
