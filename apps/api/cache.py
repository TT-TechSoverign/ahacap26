import os
import json
import redis.asyncio as redis
from functools import wraps
from typing import Optional, Any
from fastapi.encoders import jsonable_encoder

# Redis Client Singleton
redis_client: Optional[redis.Redis] = None

async def init_redis():
    """Initialize Redis connection"""
    global redis_client
    redis_url = os.getenv("REDIS_URL")
    if redis_url:
        try:
            redis_client = redis.from_url(redis_url, encoding="utf-8", decode_responses=True)
            await redis_client.ping()
            print("Accessing Redis at " + redis_url)
        except Exception as e:
            print(f"Redis Connection Failed: {e}")
            redis_client = None

async def close_redis():
    """Close Redis connection"""
    global redis_client
    if redis_client:
        await redis_client.close()

def cache_response(ttl: int = 60, key_prefix: str = "api"):
    """
    Decorator for caching async functions.
    Uses 'stale-while-revalidate' logic if desired, or simple TTL.
    For this implementation: Simple TTL + JSON serialization.
    """
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            if not redis_client:
                return await func(*args, **kwargs)

            # Generate Cache Key (Simple)
            # Warning: args/kwargs must be serializable
            cache_key = f"{key_prefix}:{func.__name__}:{str(args)}:{str(kwargs)}"

            try:
                # Check Cache
                cached = await redis_client.get(cache_key)
                if cached:
                    return json.loads(cached)

                # Execute Function
                result = await func(*args, **kwargs)

                # Cache Result
                # Use jsonable_encoder to convert Pydantic/SQLAlchemy models to JSON-compatible types
                encoded_result = jsonable_encoder(result)
                await redis_client.setex(cache_key, ttl, json.dumps(encoded_result))

                return result
            except Exception as e:
                print(f"Cache Error: {e}")
                return await func(*args, **kwargs)
        return wrapper
    return decorator
