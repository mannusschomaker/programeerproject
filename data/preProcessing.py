import csv
import json

racelist = []
catagory = []
allData = []
gender = []
with open('data.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    print(reader)

    for row in reader:
        if row['subject_race'] == "":
            row['subject_race'] = 'Unknown'
        if not row['subject_race'] in racelist:
            racelist.append(row['subject_race'])
        if not row['type_of_subject'] in catagory:
            catagory.append(row['type_of_subject'])
        if not row['subject_sex'] in gender:
            gender.append(row['subject_sex'])
        allData.append(row)



    # print(racelist)
    # print(catagory)

    childernlist = []
    for sex in gender:
        childernlist1 = []
        for race in racelist:
            childernlist2 = []
            for sub in catagory:
                counter = 0
                for row in allData:
                    if row['subject_sex'] == sex:
                        if row['subject_race'] == race:
                            if row['type_of_subject'] == sub:
                                counter += 1

                if not counter == 0:
                    childernlist2.append({"name": sub, "size": counter})
            childernlist1.append({"name": race, "children": childernlist2})
        childernlist.append({"name": sex, "children": childernlist1})
    temp = {"name": "films", "children": childernlist}


    jsonfile = open('data.json', 'w')
    json.dump(temp, jsonfile, indent = 4, separators=(',', ': '))
       