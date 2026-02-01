import json

with open(r"C:\Workspace\Shell\my-vocabulary-app\resource\vocabulary.json", "r") as f:
    data = json.load(f)

for datum in data:
    datum["stats"] = {
        "status": "weak",
        "known": 0,
        "unknown": 0,
        "mistake": 0,
        "date": 0,
    }

with open(r"C:\Workspace\Shell\my-vocabulary-app\resource\vocabulary.json", "w") as f:
    json.dump(data, f, ensure_ascii=False)
