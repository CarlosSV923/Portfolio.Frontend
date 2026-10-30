// Icon file in /public/icons for each technology. Names without an entry
// render as a two-letter monogram.
export const techIcons: Readonly<Record<string, string>> = {
  NestJS: "icon_nestjs.svg",
  "Node.js": "icon_nodejs.png",
  Typescript: "icon_typescript.svg",
  MongoDB: "icon_mongodb.svg",
  Docker: "icon_docker.png",
  ".NET Core": "icon_csharp.png",
  "Azure Functions": "icon_azure-functions.png",
  GraphQL: "icon_graphql.svg",
  Python: "icon_python.svg",
  MySQL: "icon_mysql.svg",
  PostgreSQL: "icon_postgresql.svg",
  Kafka: "icon_kafka.svg",
  "Next.js": "icon_nextjs.svg",
  Redis: "icon_redis.svg",
  Kubernetes: "icon_kubernetes.svg",
  AWS: "icon_aws.svg",
  Go: "icon_go.svg",
  Rust: "icon_rust.svg",
  RabbitMQ: "icon_rabbitmq.svg",
};

// Logos too dark for the dark theme: black ones are inverted, dark brand
// colours are brightened.
export const darkThemeIconClasses: Readonly<Record<string, string>> = {
  Kafka: "dark:invert",
  "Next.js": "dark:invert",
  MySQL: "dark:brightness-175",
};
