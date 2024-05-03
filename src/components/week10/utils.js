import React from "react"
import * as d3 from "d3"

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        d3.csv(csvPath).then(data => {
            data.forEach(d => {
                /*
                d.Age = +d.Age;
                d.Fare = +d.Fare;
                d.SibSp = +d.SibSp;
                d.Parch = +d.Parch;
                d.Survived = +d.Survived;
                d.Pclass = "Class: " + d.Pclass;
                */
                d.Age = +d.Age;
                d.Salary = +d.Salary;
                d.Senior = +d.Senior;
                d.EducationLevel = "Education: " + d.EducationLevel;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}
function getAgeGroup( d ){
    if (d.Age < 10) {
        return "Age:[0, 10]"
    }
    if (10 <= d.Age && d.Age < 20) {
        return "Age:[10, 20]"
    }
    if (20 <= d.Age && d.Age < 30) {
        return "Age:[20, 30]"
    }
    if (30 <= d.Age && d.Age < 40) {
        return "Age:[30, 40]"
    }
    if (40 <= d.Age && d.Age < 50) {
        return "Age:[40, 50]"
    }
    if (50 <= d.Age && d.Age < 60) {
        return "Age:[50, 60]"
    }
    if (60 <= d.Age && d.Age < 70) {
        return "Age:[60, 70]"
    }
    if (70 <= d.Age && d.Age <= 80) {
        return "Age:[70, 80]"
    }
}


function getTree( data, attrs ) {
    const getLevels = (attr) => {
        const attrArray = data.map(d => d[attr]);
        const levels = attrArray.filter( (d, idx) => attrArray.indexOf(d) === idx).sort();
        return levels.map( d => {return {"name": d, "attr": attr}});
    };
    const levels = attrs.map( d => getLevels(d));
    // console.log(levels);
    const getJsonTree = function( data, levels ) {
        let itemArr = [];
        if(levels.length === 0) {
            //itemArr.push(data);
            return null;
        }
        const currentLevel = levels[0];
        for (let i = 0; i < currentLevel.length; i++) {
            let node = currentLevel[i];
            let newData = data.filter(d => d[currentLevel[0].attr] === currentLevel[i].name)
            if (newData.length > 0){
                let newNode = {};
                newNode.points = newData;
                newNode.name = node.name;
                newNode.attr = node.attr;
                // const sum = newData.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
                newNode.value = d3.mean(newData, d => d.Salary); // calculating average salary
                //newData.filter( d => d.Survived === 1).length/newData.length; //survival rate 
                let children = getJsonTree(newData, levels.slice(1));
                if (children) {
                    newNode.children = children;
                }
                itemArr.push(newNode);
            }
        }
        return itemArr;
    };
    return getJsonTree(data, levels);
}

export {useData, getAgeGroup, getTree}