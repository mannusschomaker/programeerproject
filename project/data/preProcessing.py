'''
    File name: prePorocessing.py
    Author: Mannus schomaker 10591664
    function: processing data for start page
    Python Version: 3.2
'''
import csv
import json

#  init list for finding al different entries
racelist = []
catagory = []
allData = []
gender = []

#  loop though data rows to clean data and find all diffenent entries
with open('data.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    print(reader)

    for row in reader:
        if row['subject_race'] == '':
            row['subject_race'] = 'Unknown'
        if not row['subject_race'] in racelist:
            racelist.append(row['subject_race'])
        if not row['type_of_subject'] in catagory:
            catagory.append(row['type_of_subject'])
        if not row['subject_sex'] in gender:
            gender.append(row['subject_sex'])
        allData.append(row)



    #  build hierarchical data structure 
    childernlist = []
    for sex in gender:
        childernlist1 = []
        for race in racelist:
            childernlist2 = []
            for sub in catagory:

                # initiate counter for each catogory
                counter = 0
                for row in allData:

                    # lookup data for specific catogory
                    if row['subject_sex'] == sex:
                        if row['subject_race'] == race:
                            if row['type_of_subject'] == sub:
                                counter += 1

                # if specific catogorie exsists push data to structure 
                if not counter == 0:
                    childernlist2.append({'name': sub, 'size': counter})

            childernlist1.append({'name': race, 'children': childernlist2})
        childernlist.append({'name': sex, 'children': childernlist1})
    temp = {'name': 'films', 'children': childernlist}

    # dump new data structure to json file 
    jsonfile = open('data.json', 'w')
    json.dump(temp, jsonfile, indent = 4, separators=(',', ': '))
       