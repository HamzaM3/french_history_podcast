import json
import re

L = []

def g(x) :
    m = re.match("(\d*)([a-e]?)", x)
    nb, l = m.group(1,2)
    L.append(int(nb))
    return "0" * (3 - len(nb)) + nb + l

f = open("data.json", "r")
data = json.load(f)

data[1]["data"].sort(key=lambda x : g(x["nb"]))

for i in range(len(L) - 1) :
    if L[i+1] - L[i] not in [-1, 0]:
        print(L[i+1] - L[i], L[i], "wow!")

f.close()
f = open("tmp.json", "w")
json.dump(data, f)
f.close()