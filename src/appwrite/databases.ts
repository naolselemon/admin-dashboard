import { databases, storage } from "./config";
import { ID, Models } from "appwrite";

const collections = [
    {
        databaseId: import.meta.env.VITE_DATABASE_ID,
        collectionId: import.meta.env.VITE_COLLECTION_BOOKS,
        name: "books",
    },
];

const buckets = {
    bucketId: import.meta.env.VITE_BUCKET_ID
}

interface DBMethods {
    list: (queries: string[]) => Promise<Models.DocumentList<Models.Document>>;
    get: (documentId: string) => Promise<Models.Document>;
    create: (data: Record<string, unknown>) => Promise<Models.Document>;
    update: (documentId: string, data: Record<string, unknown>) => Promise<Models.Document>;
    delete: (documentId: string) => Promise<void>;
}

const db: { [key: string]: DBMethods } = {};

collections.forEach((collection) => {
    db[collection.name] = {
        list: (queries) =>
            databases.listDocuments(
                collection.databaseId,
                collection.collectionId,
                queries
            ),

        get: (documentId) =>
            databases.getDocument(
                collection.databaseId,
                collection.collectionId,
                documentId
            ),

        create: (data) =>
            databases.createDocument(
                collection.databaseId,
                collection.collectionId,
                ID.unique(),
                data
            ),

        update: (documentId, data) =>
            databases.updateDocument(
                collection.databaseId,
                collection.collectionId,
                documentId,
                data
            ),

        delete: (documentId) =>
            databases.deleteDocument(
                collection.databaseId,
                collection.collectionId,
                documentId
            ).then(() => {}),
    };
});

const uploadFile = async (file: File) => {
    try{
       const response =  storage.createFile(buckets.bucketId, ID.unique(), file)
       return response;
    }catch(error:any){
        console.log("File upload failed: ", error);
        throw new Error(error);
    }
    };

const getUrl = (fileId: string) => storage.getFileDownload(buckets.bucketId, fileId );

export {db, uploadFile, getUrl};