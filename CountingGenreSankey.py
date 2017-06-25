import pandas as pd
import csv

data = pd.read_csv('output.csv', encoding='mac_roman')

#print(data.head())
    
#print(data.shape)

df = pd.DataFrame(data)

df['Action'] = df.genres.str.count('Action')
df['ActionAdventure'] = df.genres.str.count('Action' + 'Adventure')
df['Adventure'] = df.genres.str.count('Adventure')
df['Animation'] = df.genres.str.count('Animation')
df['Comedy'] = df.genres.str.count('Comedy')
df['Crime'] = df.genres.str.count('Crime')
df['Drama'] = df.genres.str.count('Drama')
df['Family'] = df.genres.str.count('Family')
df['Fantasy'] = df.genres.str.count('Fantasy')
df['History'] = df.genres.str.count('History')
df['Horror'] = df.genres.str.count('Horror')
df['Music'] = df.genres.str.count('Music')
df['Musical'] = df.genres.str.count('Musical')
df['Romance'] = df.genres.str.count('Romance')
df['Sci-Fi'] = df.genres.str.count('Sci-Fi')
df['Sport'] = df.genres.str.count('Sport')
df['Thriller'] = df.genres.str.count('Thriller')
df['War'] = df.genres.str.count('War')
df['Western'] = df.genres.str.count('Western')


#This counts all instances of the word in Genre and adds it to itd own unique column.

print(df)
df.to_csv("GenreSankey.csv")
