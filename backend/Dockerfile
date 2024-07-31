# Etapa de build
FROM maven:3-openjdk-17 AS build

WORKDIR /app

COPY pom.xml ./
COPY src ./src

RUN mvn dependency:go-offline
RUN mvn clean package

FROM openjdk:17-jdk-slim

COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar /app/myapp.jar

EXPOSE 8080

CMD ["java", "-jar", "/app/myapp.jar"]
