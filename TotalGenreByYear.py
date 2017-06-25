import pandas as pd
import csv

data = pd.read_csv('GenreYear.csv', encoding='mac_roman')

df = pd.DataFrame(data)
df.reset_index().groupby("Year").sum()

df.reset_index().groupby("Year").sum().to_csv("TotalByYear.csv")
