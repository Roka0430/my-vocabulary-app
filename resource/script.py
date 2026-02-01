import csv
import json


keys = ["noun", "verb", "adjective", "adverb", "preposition"]
output = []
with open(r"C:\Workspace\Shell\my-vocabulary-app\resource\vocabulary.csv", "r") as f:
    reader = csv.reader(f)
    for i, r in enumerate(reader):
        addition = {
            "id": int(r[0]),
            "level": 600,
            "word": r[1],
            "definitions": [],
        }
        for i, m in enumerate(r[2:]):
            if m == "":
                continue
            addition["definitions"].append(
                {
                    "parts": keys[i],
                    "meaning": m,
                }
            )
        output.append(addition)

with open(r"C:\Workspace\Shell\my-vocabulary-app\resource\vocabulary.json", "w") as f:
    json.dump(output, f, ensure_ascii=False, separators=(",", ":"))
