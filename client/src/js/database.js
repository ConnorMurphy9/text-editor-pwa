import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
  // Create a connection to the database and version we want to use.
  const contactDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
  

}

// // TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const contactDb = await openDB('jate', 1);

  const tx = contactDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.get(1);
  const result = await request;

  result ? console.log('🚀 - data retrieved from the database', result.value) :  console.log('🚀 - no data in the database');
}

initdb();
