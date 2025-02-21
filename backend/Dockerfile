# Use official Python image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Wait for MySQL to be ready, apply migrations, and start server
CMD ["sh", "-c", "until mysqladmin ping -h db --silent; do sleep 5; done && \
    python manage.py makemigrations authentication && \
    python manage.py migrate && \
    python manage.py runserver 0.0.0.0:8000"]

