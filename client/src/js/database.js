import { openDB } from "idb";

const initdb = async () =>
  // Creates a new database named 'flowers' which will be using version 1 of the database.
  openDB("flowers", 1, {
    // Adds database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains("flowers")) {
        console.log("Database for F.L.O.W.E.R.S. already exists");
        return;
      }
      // Creates a new object store for the data and gives it a key name of 'id' which increments automatically.
      db.createObjectStore("flowers", { keyPath: "id", autoIncrement: true });
      console.log("Database for F.L.O.W.E.R.S. has been created");
    },
  });

// Exports a function to POST to the database.
export const putDb = async (content) => {
  console.log("Post to the database");

  // Creates a connection to the flowers database and version.
  const flowersDb = await openDB("flowers", 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = flowersDb.transaction("flowers", "readwrite");

  // Opens up the desired object store.
  const store = tx.objectStore("flowers");

  // Uses the .put() method on the store and passes in the content.
  const request = store.put({ id: 1, flowers: content });

  // Gets confirmation of the request.
  const result = await request;
  console.log("Data saved to the database:", result.values);
};

// Exports a function to get the database.
export const getDb = async () => {
  console.log("Get all notes from the database");

  // Creates a connection to the flowers database and version.
  const flowersDb = await openDB("flowers", 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = flowersDb.transaction("flowers", "readonly");

  // Opens up the desired object store.
  const store = tx.objectStore("flowers");

  // Uses the .get(1) method to retrieve the value of the first record matching the query.

  const request = store.get(1);

  // Gets confirmation of the request.
  const result = await request;
  result
    ? console.log("Notes retrieved from database:", result.flowers)
    : console.log("No notes found in database!");
  return result?.flowers;
};

// Starts database
initdb();
