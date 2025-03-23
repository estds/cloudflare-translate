# Languages

- [English](readme.md)
- [中文](readme_zh.md)

# What's this

This simple tool creates a translation service that uses CloudFlare's workers AI.

# How to deploy

- Create a worker in CloudFlare dashboard
- Create in `Binding` section of settings of the worker
  - Click 'Add'
  - Select 'Workers AI'
  - Variable name: `AI`
- Create this environmental variable in `Variables and Secrets` section of settings of the worker:
  - Variable name: `API_KEY`
  - Value: `<-----key-that-you-prefer------>`
- Edit the code of the worker
- Copy paste `worker.js` to the editor page, and hit 'Deploy'
- `Optional`: set a custom domain if you want

# How to use

The worker now could accept POST requests like this:

```
curl -X POST 'https://your-worker-url' \
  -H 'Content-Type: application/json' \
  -H 'X-API-Key: your-api-key-here' \
  -d '{
    "text": "Hello world",
    "sl": "en",
    "tl": "zh"
  }'
```

Here are all the possible responses:

1. **Successful Translation**:
```json
{
  "code": 200,
  "msg": "OK",
  "text": "您好世界"
}
```

2. **Invalid Method (Not POST)**:
```json
{
  "code": 405,
  "msg": "Method Not Allowed. Only POST requests are supported."
}
```

3. **Authentication Failure (Wrong API Key)**:
```json
{
  "code": 401,
  "msg": "Access denied"
}
```

4. **Missing Required Parameters**:
```json
{
  "code": 400,
  "msg": "Missing required parameters. 'text', 'sl', and 'tl' are required."
}
```

5. **Invalid JSON Body**:
```json
{
  "code": 400,
  "msg": "Invalid JSON body"
}
```

6. **Translation Error**:
```json
{
  "code": 500,
  "msg": "Server error",
  "text": "ERROR: [specific error message from translation service]"
}
```

7. **Other Server Errors**:
```json
{
  "code": 500,
  "msg": "Translation service error",
  "error": "[error message]"
}
```
