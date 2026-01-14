# Stage 1: Builder
FROM python:3.12-alpine as builder

WORKDIR /app

# Install build dependencies for asyncpg
RUN apk update && apk add --no-cache gcc musl-dev python3-dev libffi-dev

# Install python dependencies to local user directory
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Final Runtime
FROM python:3.12-alpine as runner

WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy installed packages from builder
COPY --from=builder /root/.local /home/appuser/.local

# Copy application code
COPY . .

# Set ownership
RUN chown -R appuser:appgroup /app

# Update PATH to include user-installed binaries
ENV PATH=/home/appuser/.local/bin:$PATH

# Switch to non-root user
USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
