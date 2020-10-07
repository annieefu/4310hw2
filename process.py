import csv

data = []
header = []

def passes_filter(row):
    if row["US Average"] == 0:
        return False
    
    count = 0
    for state in header[5:]:
        # print(row[state])
        if row[state] == "":
            count = count + 1

        if "nes" in str(row["Product description (FAOSTAT)"]).lower():
            return False
        
        if count > 7:
            return False
    # print(row)
    return True

with open('C:\\Users\\ningn\\Desktop\\INFO 4310\\processed_food.csv','r') as f:
    reader = csv.DictReader(f)
    
    header = reader.fieldnames
    # print(header)
    curr_product_hs = ""
    curr_product_faostat = ""
    count = 0

    temp_list = []
    is_all_true = 1

    product_start = 0
    for row in reader:
        # set name of product
        if row['Product description (HS)'] == "":
            row["Product description (HS)"] = curr_product_hs
            product_start = product_start + 1
        else: 
            curr_product_hs = row["Product description (HS)"]

            if is_all_true:
                data = data + temp_list

            # reset values
            product_start = 0
            is_all_true = 1
            temp_list = []

        # set category of product
        if row['Product description (FAOSTAT)'] == "":
            row["Product description (FAOSTAT)"] = curr_product_faostat
        else: 
            curr_product_faostat = row["Product description (FAOSTAT)"]
       
        count = count + 1
        if passes_filter(row):
            temp_list.append(row)
        else:
            is_all_true = 0
            
        
        # if count == 10:
        #     break


print(len(data))
           
with open('C:\\Users\\ningn\\Desktop\\INFO 4310\\food_filtered.csv','w', newline="") as f:
    writer = csv.DictWriter(f, fieldnames=header)
    writer.writeheader()
    writer.writerows(data)
