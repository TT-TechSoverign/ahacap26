import os
import time

print("PROMO_ENABLED in env:", os.environ.get("PROMO_ENABLED"))
is_promo_active = (time.time() <= 1785578399) and (os.environ.get("PROMO_ENABLED", "true").lower() == "true")
print("is_promo_active flag:", is_promo_active)
