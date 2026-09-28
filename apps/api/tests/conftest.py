import os
import sys

# Ensure apps/api directory is in sys.path
api_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if api_dir not in sys.path:
    sys.path.insert(0, api_dir)

# Set testing environment variables if not present
if "DATABASE_URL" not in os.environ:
    os.environ["DATABASE_URL"] = "sqlite+aiosqlite:///:memory:"
if "ENVIRONMENT" not in os.environ:
    os.environ["ENVIRONMENT"] = "test"
