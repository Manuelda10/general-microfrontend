/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = parseInt(process.env.PORT, 10) || 9000;

// Configura Express para usar EJS como motor de plantillas
//app.set('view engine', 'ejs');
// Configura el directorio de vistas (donde se encuentra index.ejs)
//app.set('views', path.join(__dirname, 'src'));
app.use(express.static(path.join(__dirname, 'dist')));

// Configuración del proxy como en tu ejemplo de Next.js
app.use('/api/services', createProxyMiddleware({
  target: 'https://3ghols4nyf.execute-api.us-east-1.amazonaws.com/Prod',
  pathRewrite: { '^/api/services': '' },
  changeOrigin: true
}));

// Ruta para servir index.ejs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`> Servidor escuchando en http://localhost:${port}`);
});