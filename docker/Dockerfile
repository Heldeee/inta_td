# Use an official Python image as a base
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install SQLite
RUN apt-get update && apt-get install -y sqlite3

# Copy the current directory contents into the container
COPY . .

# Run the script to create the database
CMD ["sh", "-c", "sqlite3 /app/data/healthcare.db < /app/create_db.sql && python3 /app/insert_data.py && tail -f /dev/null"]
