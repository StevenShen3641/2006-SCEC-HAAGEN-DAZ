import pandas as pd
import numpy as np
import re

df = pd.read_csv("sportify/src/data/data2.csv",index_col='index')
df["Outdoors"] = None
df['Indoors'] = None
for index, row in df.iterrows():
    weights = re.search("[Ww]eight",str(row['Sports']))
    indoor = re.search("([iI])",str(row['Sports']))
    outdoor = re.search("([oO])",str(row["Sports"]))
    if weights or indoor:
        print(row["Sports"] + "end")
        row["Indoors"] = True
    if outdoor:
        row["Outdoors"] = True

print(df[df["Outdoors"] == True])


