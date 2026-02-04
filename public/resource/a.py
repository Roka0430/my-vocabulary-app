import json

with open(
    r"C:\Workspace\Shell\my-vocabulary-app\public\resource\vocabulary.json", "r"
) as f:
    words = json.load(f)

# sorted_words = list(reversed(sorted(words, key=lambda x: len(x["word"]))))

# i = 0
# for word in sorted_words:
#     print(word["word"], len(word["word"]))
#     i += 1
#     if i > 10:
#         break


for word in words:
    print(word["definitions"])
