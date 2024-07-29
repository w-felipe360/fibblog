# Etapa de build
FROM maven:3-openjdk-17 AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o arquivo pom.xml e o código-fonte da aplicação
COPY pom.xml ./
COPY src ./src

# Baixar as dependências e construir o JAR
RUN mvn dependency:go-offline
RUN mvn clean package

# Etapa de execução
FROM eclipse-temurin:17-jre-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o JAR construído da etapa anterior
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar /app/myapp.jar

# Expor a porta na qual a aplicação Spring Boot estará escutando
EXPOSE 8080

# Definir o comando de entrada para iniciar a aplicação
CMD ["java", "-jar", "/app/myapp.jar"]
