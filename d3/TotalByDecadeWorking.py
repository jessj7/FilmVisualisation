import pandas as pd
import csv

data = pd.read_csv('TotalByDecadeWorking.csv', encoding='mac_roman')

df = pd.DataFrame(data)
df.reset_index().groupby("Year").sum()

df.reset_index().groupby("Year").sum().to_csv("TotalByDecade.csv")
