// function valueSun(data){
//     var etnicities = []
//     var catagory = []
//     var gender = []
    
//     data.forEach(function(d) {

//         if (etnicities.indexOf(d.subject_race) <= -1){
//             etnicities.push(d.subject_race);         
//         }
//         if (catagory.indexOf(d.type_of_subject) <= -1){
//             catagory.push(d.type_of_subject);     
//         }
//         if (gender.indexOf(d.subject_sex) <= -1){
//             gender.push(d.subject_sex);         
//         }
//     })

//     var childernlist = []
//     gender.forEach(function(sex) {

//         var childernlist1 = []
//         etnicities.forEach(function(race) {

//             var childernlist2 = []
//             catagory.forEach(function(subject) {
                
//                 counter = 0
//                 data.forEach(function(row) {
//                     if (row.subject_sex == sex && row.subject_race == race && row.type_of_subject == subject){
//                         counter += 1
//                     }

                
//                 })
//                 if (counter != 0){
//                     childernlist2.push({"name": subject, "size": counter})
//                 }
//             })
//             childernlist1.push({"name": race, "children": childernlist2})

//         })
//         childernlist.push({"name": sex, "children": childernlist1})

//     })

//     temp = {"name": "films", "children": childernlist}

    
//     // setTimeout(function() {
//     updateSun(temp)
//     updateForce()

//     // },3000)
// }

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

        var childernlist1 = []
        etnicities.forEach(function(race) {

            var childernlist2 = []
            catagory.forEach(function(subject) {
                
                avg_monny = []
                counter = 0
                data.forEach(function(row) {
                    if (row.subject_sex == sex && row.subject_race == race && row.type_of_subject == subject){
                        counter += 1
                        avg_monny.push(row['box_office'])
                    }

                
                })
                if (avg_monny.length != 0){
                    childernlist2.push({"name": subject, "size": counter, "box": (avg_monny.reduce(function(a, b) { return a + b; }, 0))/(avg_monny.length)})
                }
            })
            childernlist1.push({"name": race, "children": childernlist2})

        })
        childernlist.push({"name": sex, "children": childernlist1})

    })
    console.log()
    temp = {"name": "films", "children": childernlist}
    root = temp
    // console.log(temp)
    // updateForce()
    // root = temp
    // setTimeout(function() {
    updateSun(temp)
    updateForce()

    // },3000)
}

function valueBarUpdate(data){
    var etnicities = []
    var newData = []
    var color = []
    data.forEach(function(d) {
        if (etnicities.indexOf(d.subject_race) <= -1){
            etnicities.push(d.subject_race);
            color.push(d.person_of_color);            

        }
    })

    var counter = 0
    etnicities.forEach(function(a) {
        arr = []
        data.forEach(function(d) {
            if (a == d.subject_race){
                arr.push(d.box_office)
            }
        })
        
        var sum = 0;
        for (i = 0; i < arr.length; i++) {
            sum = sum + arr[i]; //don't forget to add the base
        }
        var avg = sum/arr.length; 
        
        newData.push({"id":a, "meanValue":avg, "color":color[counter]})
        counter = counter + 1
    })
    dataBarEtnicities = newData
    barUpdate(newData)
}

function valueBarUpdateMvsW(data){
    console.log(data)
    var gender = ["Male","Female"]
    var newData = []
    var color = [0,1]

    var counter = 0
    gender.forEach(function(a) {
        arr = []
        data.forEach(function(d) {
            if (a == d.subject_sex){
                arr.push(d.box_office)
            }
        })
        
        var sum = 0;
        for (i = 0; i < arr.length; i++) {
            sum = sum + arr[i]; //don't forget to add the base
        }
        var avg = sum/arr.length; 
        
        newData.push({"id":a, "meanValue":avg, "color":counter})
        counter = counter + 1
    })
    console.log(newData)
    dataBarMvsW = newData
}


function valueBar(data){

    var etnicities = []
    var newData = []
    var color = []

    data.forEach(function(d) {
        if (d.box_office == "-") {
            d.box_office = 1;
        }
        else {
            d.box_office = +d.box_office.slice(1, -1);
        }
        if ( d.subject_race == "" ) {
            d.subject_race = "Unknown"
        }

        if (etnicities.indexOf(d.subject_race) <= -1){
            etnicities.push(d.subject_race);
            color.push(d.person_of_color);
        }
    })
    var counter = 0
    etnicities.forEach(function(a) {
        var arr = []
        data.forEach(function(d) {
            if (a == d.subject_race){
                arr.push(d.box_office)
            }
        })
        
        var sum = 0;
        for (i = 0; i < arr.length; i++) {
            sum = sum + arr[i]; //don't forget to add the base
        }
        var avg = sum/arr.length; 
        
        newData.push({"id":a, "meanValue":avg, "color":color[counter]})
        counter = counter + 1
        
    })

    console.log(newData)
    dataBarEtnicities = newData
    barUpdate(newData)
   

}   

function barUpdateMvsW(){
    barUpdate(dataBarMvsW)
}

function barUpdateEtnicity(){
    barUpdate(dataBarEtnicities)
}
