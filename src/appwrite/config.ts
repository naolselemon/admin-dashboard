import { Client, Databases, Storage, Account } from 'appwrite';

const client = new Client();
client
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);
const account  = new Account(client)

export {client, databases, storage, account}