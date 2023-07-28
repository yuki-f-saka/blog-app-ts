import { MongoClient, Db } from "mongodb";

let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // 必ずstringだと決まってる時にasを使用してstringにキャストする
  const DB_NAME = process.env.DB_NAME;
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.t7qbpn2.mongodb.net/?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(uri);

  const db = client.db(DB_NAME as string);

  cachedDb = db;

  return db;
}
