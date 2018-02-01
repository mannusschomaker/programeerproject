/* update.js
 * minor programming
 *
 * d3.js page for calculating new data for updating
 * by: mannus schomaker 10591664
 * 
 */

 // procces new data of sunburst and froce graph
function valueSun(data){

    // init lists for all catogories
    var etnicities = []
    var catagory = []
    var gender = []
    
    // subtract all differt variables 
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

    // build hierarchy structure
    var childernlist = []
    gender.forEach(function(sex) {

        var childernlist1 = []
        etnicities.forEach(function(race) {

            var childernlist2 = []
            catagory.forEach(function(subject) {
                
                // initiate the different lists for data points
                var avg_monny = []
                var titles = []
                var counter = 0

                // add data for specific catogory
                data.forEach(function(row) {
                    if (row.subject_sex == sex && row.subject_race == race && row.type_of_subject == subject){
                        counter += 1
                        avg_monny.push(row['box_office'])
                        titles.push(row['title'])
                    }

                
                })
                // if specific catogorie exsists push data to structure 
                if (avg_monny.length != 0){
                    childernlist2.push({"name": subject,
                        "size": counter, 
                        "box": (avg_monny.reduce(function(a, b) { return a + b; }, 0))/(avg_monny.length),
                        "title": titles})
                }
            })
            childernlist1.push({"name": race, "children": childernlist2})

        })
        childernlist.push({"name": sex, "children": childernlist1})

    })

    // finish structure and call update functions
    var temp = {"name": "films", "children": childernlist}
    root = temp
    updateSun(temp)
    updateForce()

}

 // procces new data for bar graph
function valueBarUpdate(data){

    // init lists for all catogories
    var etnicities = []
    var newData = []
    var color = []

    // subtract all differt variables 
    data.forEach(function(d) {
        if (etnicities.indexOf(d.subject_race) <= -1){
            etnicities.push(d.subject_race);
            color.push(d.person_of_color);            

        }
    })

    // add data to new structure 
    var counter = 0
    etnicities.forEach(function(a) {

        // make arry for each bar
        var arr = []
        data.forEach(function(d) {
            if (a == d.subject_race){
                arr.push(d.box_office)
            }
        })
        
        // calculate average and push to structure
        var sum = 0;
        for (i = 0; i < arr.length; i++) {
            sum = sum + arr[i]; 
        }

        var avg = sum/arr.length; 
        newData.push({"id":a, "meanValue":avg, "color":color[counter]})
        counter = counter + 1
    })

    // update data and call update function
    dataBarEtnicities = newData
    barUpdate(newData)
}

 // procces new data for bar graph men vs women
function valueBarUpdateMvsW(data){

    // init lists for all catogories
    var gender = ["Male","Female"]
    var newData = []
    var color = [0,1]

    // add data to new structure 
    var counter = 0
    gender.forEach(function(a) {

        // make arry for each bar
        arr = []
        data.forEach(function(d) {
            if (a == d.subject_sex){
                arr.push(d.box_office)
            }
        })
        
        // calculate average and push to structure
        var sum = 0;
        for (i = 0; i < arr.length; i++) {
            sum = sum + arr[i]; 
        }
        var avg = sum/arr.length; 
        
        newData.push({"id":a, "meanValue":avg, "color":counter})
        counter = counter + 1
    })

    // update data for bar graph
    dataBarMvsW = newData
}

 // procces first data for bar graph
function valueBar(data){

    // init lists for all catogories
    var etnicities = []
    var newData = []
    var color = []

    // subtract all differt variables and preprocess
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

    // add data to new structure 
    var counter = 0
    etnicities.forEach(function(a) {

        // make arry for each bar
        var arr = []
        data.forEach(function(d) {
            if (a == d.subject_race){
                arr.push(d.box_office)
            }
        })
        
        // calculate average and push to structure
        var sum = 0;
        for (i = 0; i < arr.length; i++) {
            sum = sum + arr[i];
        }
        var avg = sum/arr.length; 
        
        newData.push({"id":a, "meanValue":avg, "color":color[counter]})
        counter = counter + 1
        
    })

    // update data and 
    dataBarEtnicities = newData
    barUpdate(newData)

}   

// update bar on button click to men vs women
function barUpdateMvsW(){
    barUpdate(dataBarMvsW)
}

// update bar on button click to different etnicities
function barUpdateEtnicity(){
    barUpdate(dataBarEtnicities)
}
