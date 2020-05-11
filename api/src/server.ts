import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import socketio from 'socket.io';
import db from './db';
import Access, { InterfaceAccess } from './access';

const mongoAddress = 'mongodb://localhost:27017/caqui38';
db(mongoAddress);

const app = express();

const httpServer = http.createServer(app);
const io = socketio.listen(httpServer, {
  origins: '*:*',
});

interface ClientProps {
  id: string;
  address: string;
  browser: {
    name: string;
    version: string;
    major: string;
  };
  engine: { name: string; version: string };
  language: string;
  os: { name: string; version: string };
  page: string;
}

const clients: ClientProps[] = [];

const handleAddClient = (id: string, infos: ClientProps): void => {
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

const saveAccessToDB = async (access: InterfaceAccess): Promise<void> => {
  const accessToSave = new Access(access);
  await accessToSave.save();
};

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'Hello Caqui#38!' });
});

io.on('connection', socket => {
  // console.log('Temos uma nova conexão aqui! ', socket.id);

  const { id, handshake } = socket;
  const { query, address } = handshake;
  const { infos } = query;

  if (infos) {
    const access = {
      ...JSON.parse(infos),
      address,
    };
    // console.log('access', access);

    handleAddClient(id, access);
    saveAccessToDB(access);
    io.emit('updateData', clients);
  }

  socket.on('disconnect', () => {
    // console.log('disconnect', socket.id);
    handleRemoveClient(id);
    io.emit('updateData', clients);
  });
});

httpServer.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port %s', process.env.PORT || 3000);
});
