file = input("file: ")

with open(file, "r+", encoding="utf-8") as f:
    text = f.read()
    f.write(text.replace("\n", "\\n"))