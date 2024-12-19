import { APIGatewayProxyHandler } from "aws-lambda";
import YAML from "yamljs";
import path from "path";

export const swagger: APIGatewayProxyHandler = async () => {
  
  const swaggerDocument = YAML.load(path.join(__dirname, "../../docs/openapi.yaml"));

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Swagger UI - Reto tecnico</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.css">
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js"></script>
      <script>
        const spec = ${JSON.stringify(swaggerDocument)};
        SwaggerUIBundle({
          spec: spec,
          dom_id: '#swagger-ui'
        });
      </script>
    </body>
    </html>
  `;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: html,
  };
};