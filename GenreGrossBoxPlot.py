import pandas as pd
import csv
import matplotlib.pyplot as plt

data = pd.read_csv('BudgetGenre.csv', encoding='mac_roman')

#print(data.head())
    
#print(data.shape)

def removezero(data):
    return [float('nan') if x==0 else x for x in data]

df = pd.DataFrame(data)
print(data.describe())
df.boxplot()
plt.show()


print(df)
data.describe().to_csv("GenreBudgetDescription.csv")
