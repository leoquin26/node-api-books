import express from 'express';
import bookRoutes from './routes/bookRoutes';
import authorRoutes from './routes/authorRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
