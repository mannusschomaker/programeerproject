function valueSun(data){
    var etnicities = []
    var catagory = []
    var gender = []
    
    data.forEach(function(d) {
        if (etnicities.indexOf(d.subject_race) <= -1){
            etnicities.push(d.subject_race);         
        }
        if (catagory.indexOf(d.type_of_subject) <= -1){
            catagory.push(d.type_of_subject);     
        }
        if (gender.indexOf(d.subject_sex) <= -1){
            gender.push(d.subject_sex);         
        }
    })

    var childernlist = []
    gender.forEach(function(sex) {

        childernlist1 = []
        etnicities.forEach(function(race) {

            childernlist2 = []
            catagory.forEach(function(subject) {
                
                counter = []
                data.forEach(function(row) {
                    if (row.subject_sex == sex && row.subject_race == race && row.type_of_subject){
                        counter += 1
                    }

                
                })
                if (counter != 0){
                    childernlist2.push({"name": subject, "size": counter})
                }
            })
            childernlist1.push({"name": race, "children": childernlist2})

        })
        childernlist.push({"name": sex, "children": childernlist1})

    })
    temp = {"name": "films", "children": childernlist}

    console.log(temp)
    setTimeout(function() {
    update(temp)
    },3000)
}

