const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'], // replace with original 
  localDataCenter: 'datacenter1',
  keyspace: 'chatbot'
});

const connectCassandra = async () => {
  try {
    await client.connect();
    console.log('Connected to Cassandra');
  } catch (err) {
    console.error('Cassandra connection error:', err);
  }
};

module.exports = { client, connectCassandra };
