import pandas as pd
film = pd.read_csv("movie_metadata.csv", encoding='mac_roman')
inflation = pd.read_csv("inflation.csv", index_col=0)

film["AvgCPIUSD"] = film["Year"].map(inflation["AvgCPIUSD"])

film.to_csv("output.csv")
