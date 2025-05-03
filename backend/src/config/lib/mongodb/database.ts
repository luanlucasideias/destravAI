import { MongoClient, Db } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'destravaai';

let client: MongoClient;
let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) return db;

  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`🟢 Conectado ao MongoDB: ${DB_NAME}`);
    return db;
  } catch (error) {
    console.error('🔴 Erro ao conectar ao MongoDB:', error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  if (client) {
    await client.close();
    console.log('🔌 Conexão com o MongoDB encerrada');
  }
};
