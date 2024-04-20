import numpy as np 
import pandas as pd 

df = pd.read_csv("sportify/src/data/data2.csv",index_col='index')
df['coor'] = list(zip(df['X'],df['Y']))

df.drop_duplicates(subset=['coor'],inplace=True)
df.reset_index(drop=True,inplace=True)
df.drop(columns=['coor'],axis=1,inplace=True)

df.to_csv("sportify/src/data/data3.csv",index=True, index_label="index")