import pandas as pd
import json

#this python file is used to convert the csv file for the aportionment data 
#for all the states from the census data 2020 to the json file which will be used for the interative line chart shows the growth race
csv_file_path = '../data/apportionment.csv'
df_apportionment = pd.read_csv(csv_file_path)
# Convert the list of lists to a JSON string and then replace na with 0
df_apportionment.replace("", pd.NA, inplace=True)
df_apportionment.fillna(0, inplace=True)
# Convert the 'Population' column to integers and remove commas
df_apportionment['Population'] = df_apportionment['Population'].astype(str).str.replace(',', '').astype(int)
# Convert the DataFrame to a list of lists, with the first list being the headers
apportionment_data_list = [df_apportionment.columns.tolist()] + df_apportionment.values.tolist()
apportionment_json = json.dumps(apportionment_data_list, indent=4)


output_json_file_path = '../data/apportionment.json'
with open(output_json_file_path, 'w') as json_file:
    json_file.write(apportionment_json)


