import csv
import json
#this python file is used to convert the csv file for the population 
#for all the states from the census data 2020 to the json file which will be used for the interative map
#assign the path for the csv and json file here
csv_file_path = '../data/convert_to_json.csv'
json_file_path = '../data/uscensus_data.json'



def process_csv_to_json(csv_file_path, json_file_path):
    data = []
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.reader(csv_file)
        for row in csv_reader:
            if row:  # Ensure the row is not empty
                # Extract name and value, remove commas from value and convert to integer
                name = row[1]
                value = int(row[3].replace(',', ''))
                data.append({"name": name, "value": value})

    # Convert the list of dictionaries to a JSON string
    json_data = json.dumps(data, indent=4)

    # Write the JSON data to a file
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json_file.write(json_data)

#Call the function to convert the csv to json
process_csv_to_json(csv_file_path, json_file_path)
