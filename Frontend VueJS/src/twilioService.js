// twilioService.js
import Twilio from 'twilio-chat';

const TOKEN_URL = '383154925b78ed3032f8584e9353c49f'; 
// twilioService.js
export async function initializeTwilio() {
  console.log('Fetching Twilio token...');
  const token = await fetch(TOKEN_URL).then((response) => response.json());
  console.log('Twilio token retrieved:', token);

  console.log('Initializing Twilio Chat Client...');
  const chatClient = await Twilio.create(token);
  console.log('Twilio Chat Client initialized:', chatClient);

  console.log('Fetching or creating chat channel...');
  const channel = await chatClient.getChannelByUniqueName('general') || await chatClient.createChannel({ uniqueName: 'general' });
  console.log('Chat channel:', channel);

  return { chatClient, channel };
}