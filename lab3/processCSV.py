import pandas as pd
import numpy as np

df = pd.read_csv("sportify/src/data/data2.csv",index_col='index')
df.columns = ['e','X','Y','Name','Images','Ratings','Sports','Facility']
print(df)
df.drop('e',axis=1,inplace=True)
df.to_csv("sportify/src/data/data2.csv",index=True, index_label="index")
