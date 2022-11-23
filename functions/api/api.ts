import { Handler } from '@netlify/functions'

export const handler:Handler = async (event, context) => {
  let colorName = 'stranger';
  if(event.queryStringParameters){
    const { name = 'stranger' } = event.queryStringParameters
    colorName = name;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${colorName}!`,
    }),
  }
}
