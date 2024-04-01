const {Firestore} = require('@google-cloud/firestore');

// Initialize Firestore
const firestore = new Firestore();

/**
 * Background Cloud Function to be triggered by Pub/Sub.
 *
 * @param {object} message The Pub/Sub message payload.
 * @param {object} context The event metadata.
 */

exports.writePubFirestore = async (message, context) => {
  try {
    // Parse the message data from base64
    const pubSubMessage = message.data ? JSON.parse(Buffer.from(message.data, 'base64').toString()) : null;

    // just to check how the message is written
    console.log('Pub/Sub Message:', pubSubMessage);

    if (pubSubMessage && pubSubMessage.email_address) {
      // Extract watch_regions and ensure it's an array of strings
      const watchRegions = Array.isArray(pubSubMessage.watch_region) ? pubSubMessage.watch_region : [];

      // Create a new document with the parsed message data
      const documentData = {
        email_address: pubSubMessage.email_address,
        watch_regions: watchRegions
      };

      // Write the parsed message data to Firestore
      const docRef = firestore.collection('subscribers').doc();
      await docRef.set(documentData);
      console.log('Data written to Firestore:', documentData);
    } else {
      console.error('Invalid or missing data in the Pub/Sub message.');
    }
  } catch (error) {
    console.error('Error processing message:', error);
  }
};
