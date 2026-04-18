import json
import shutil

filepath = 'apps/api/content/products_seed.json'
dump_path = 'content_dump.json'

# Let's write the seed into content_dump.json locally just to satisfy the user's explicit filename expectation if they decide to git add it.
shutil.copyfile(filepath, dump_path)

print('Synchronized products_seed.json and content_dump.json')
