# Languages
- [English](readme.md)
- [中文](readme_zh.md)

# 这是什么 
 
这是一个简单的工具，用于创建一个使用CloudFlare的Workers AI的翻译服务。
 
# 如何部署
 
1. 在CloudFlare仪表板中创建一个Worker。
2. 在Worker设置的`Binding`部分中：
   - 点击 'Add'
   - 选择 'Workers AI'
   - Variable name: `AI`
3. 在Worker设置的`Variables and Secrets`部分中创建一个环境变量：
   - Variable name：`API_KEY`。
   - Value：`<-----你喜欢的密钥------>`。
4. 编辑Worker的代码。
5. 将`worker.js`复制粘贴到编辑器页面，然后点击“Deploy”。
6. `可选`：如果需要，设置一个自定义域名。
 
# 如何使用 
 
现在，该Worker可以接受如下POST请求：
 
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
 
以下是所有可能的响应：
 
1. 翻译成功：
```json 
{
  "code": 200,
  "msg": "OK",
  "text": "您好世界"
}
```
 
2. 无效方法（非POST请求）：
```json 
{
  "code": 405,
  "msg": "Method Not Allowed. Only POST requests are supported."
}
```
 
3. 认证失败（错误的API密钥）：
```json 
{
  "code": 401,
  "msg": "Access denied"
}
```
 
4. 缺少必要参数：
```json 
{
  "code": 400,
  "msg": "Missing required parameters. 'text', 'sl', and 'tl' are required."
}
```
 
5. 无效的JSON主体：
```json 
{
  "code": 400,
  "msg": "Invalid JSON body"
}
```
 
6. 翻译错误：
```json 
{
  "code": 500,
  "msg": "Server error",
  "text": "ERROR: [来自翻译服务的具体错误信息]"
}
```
 
7. 其他服务器错误：
```json 
{
  "code": 500,
  "msg": "Translation service error",
  "error": "[错误信息]"
}
```
