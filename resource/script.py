import csv
import json


keys = ["n", "v", "adj", "adv", "prep"]
output = []
with open(r"C:\Workspace\Shell\my-vocabulary-app\resource\vocabulary.csv", "r") as f:
    reader = csv.reader(f)
    for r in reader:
        addition = {
            "id": r[0],
            "word": r[1],
            "means": {
                keys[i]: val.split("、") for i, val in enumerate(r[2:]) if val != ""
            },
        }
        output.append(addition)


with open(r"C:\Workspace\Shell\my-vocabulary-app\resource\vocabulary.json", "w") as f:
    json.dump(output, f, ensure_ascii=False, separators=(",", ":"))
