FROM openjdk:17-jdk-slim
ADD target/demeter.jar demeter.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]