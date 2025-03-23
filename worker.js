export default {
  async fetch(request, env) {
    // Only accept POST requests
    if (request.method !== 'POST') {
      return Response.json({
        code: 405,
        msg: "Method Not Allowed. Only POST requests are supported."
      }, { status: 405 });
    }
    
    // Get the secret from request headers
    const secret = request.headers.get('X-API-Key');
    
    // Check authentication
    if (secret !== env.API_KEY) {
      return Response.json({
        code: 401,
        msg: "Access denied"
      }, { status: 401 });
    }
    
    // Parse the JSON body
    let text, source_language, target_language;
    try {
      const body = await request.json();
      text = body.text;
      source_language = body.sl;
      target_language = body.tl;
      
      // Validate required parameters
      if (!text || !source_language || !target_language) {
        return Response.json({
          code: 400,
          msg: "Missing required parameters. 'text', 'sl', and 'tl' are required."
        }, { status: 400 });
      }
    } catch (error) {
      return Response.json({
        code: 400,
        msg: "Invalid JSON body"
      }, { status: 400 });
    }
    
    // Process translation
    const inputs = {
      text: text,
      source_lang: source_language.substr(0, 2),
      target_lang: target_language.substr(0, 2),
    };
    
    try {
      const response = await env.AI.run('@cf/meta/m2m100-1.2b', inputs);
      
      if (response.translated_text.indexOf('ERROR') === 0) {
        return Response.json({
          code: 500,
          msg: "Server error",
          text: response.translated_text
        }, { status: 500 });
      }
      
      return Response.json({
        code: 200,
        msg: "OK",
        text: response.translated_text
      }, { status: 200 });
    } catch (error) {
      return Response.json({
        code: 500,
        msg: "Translation service error",
        error: error.message
      }, { status: 500 });
    }
  },
};
