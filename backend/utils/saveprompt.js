const { client } = require('../config/cassandra');

const savePrompt = async (from, prompt, response) => {
  const query = 'INSERT INTO prompts (id, user, prompt, response, timestamp) VALUES (uuid(), ?, ?, ?, toTimestamp(now()))';
  const params = [from, prompt, response];
  try {
    await client.execute(query, params, { prepare: true });
    console.log('Prompt saved');
  } catch (err) {
    console.error('Error saving prompt:', err);
  }
};

module.exports = savePrompt;
