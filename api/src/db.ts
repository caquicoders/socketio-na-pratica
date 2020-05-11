import mongoose from 'mongoose';

export default (db: string) => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => {
        return console.log('Mongo conectado!');
      })
      .catch(error => {
        console.log('Erro na conexão: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnect', connect);
};
