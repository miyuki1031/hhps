FROM eclipse-temurin:17-jdk-focal
WORKDIR /app
COPY . .
# Windowsでも実行できるように権限を付与
RUN chmod +x ./mvnw
# コンパイルして実行
CMD ["./mvnw", "spring-boot:run"]