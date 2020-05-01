import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import uaParser from 'ua-parser-js';
import socketio from 'socket.io';
import http from 'http';

const app = express();

const httpServer = http.createServer(app);
const io = socketio.listen(httpServer, {
  origins:
    'localhost:* http://localhost:*  http://polite-quail-94.serverless.social  http://polite-quail-94.serverless.social/*',
});

interface ClientProps {
  id: string;
  address: string;
  browser: {
    name: string;
    version: string;
    major: string;
  };
  device: {
    vendor: string;
    model: string;
    type: string;
  };
  engine: { name: string; version: string };
  language: string;
  os: { name: string; version: string };
  page: string;
}

const clients: ClientProps[] = [];

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'Hello Caqui#38!' });
});

app.set('socketio', io);

const proccessClients = () => {
  // let clientsReturn: {
  //   browser: {},
  //   os: {},
  //   page: {},
  // };

  // clients.forEach(client => {

  // });
  // console.log('return', clientsReturn);
  return clients;
};

const handleAddClient = (id: string, infos): void => {
  const index = clients.findIndex(c => c.id === id);
  if (index < 0) {
    clients.push({
      id,
      ...infos,
    });
  }
};

const handleRemoveClient = (id: string): void => {
  const index = clients.findIndex(c => c.id === id);
  clients.splice(index, 1);
};

io.on('connection', socket => {
  const { id, handshake } = socket;
  const { query, address } = handshake;
  const { infos } = query;
  console.log('newConnection', id, infos);

  if (infos) {
    handleAddClient(id, {
      ...JSON.parse(infos),
      address,
    });
  }

  io.emit('updateData', proccessClients());

  socket.on('disconnect', () => {
    console.log('disconnect', id);
    handleRemoveClient(id);
    io.emit('updateData', proccessClients());
  });
});

const server = httpServer.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port %s', process.env.PORT || 3003);
});
