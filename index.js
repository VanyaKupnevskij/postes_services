import express from 'express';
import authRouter from './routers/auth.route.js';
import cors from './middlewares/cors.middleware.js';
import config from 'config';

const app = express();

const PORT = config.get('port') || 4444;

app.use(cors);
app.use(express.json({ extended: true }));

app.use('/api/auth', authRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

async function start() {
  try {
    app.listen(PORT, () => console.log(`Server start OK on port: ${PORT}`));
  } catch (error) {
    console.log('Server Error:', error);
    process.exit(1);
  }
}

start();
