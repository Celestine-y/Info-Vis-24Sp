import React from 'react'

function BarsRace(props) {
    const {data, xScale, yScale, height, selectBar, setTooltipX, setTooltipY, mouseOver, mouseOut} = props;
    //const [selectBar, setSelectBar] = React.useState(null);

    if(data){
        // const mouseOver = (d) => {
        //     setSelectBar(d);
        // };
        // const mouseOut = () => {
        //     setSelectBar(null);
        // };

        // Calculate average salary for each Race
        const averageData = {};
        data.forEach(d => {
            if (!averageData[d.Race]) {
                averageData[d.Race] = {
                    count: 0,
                    totalSalary: 0
                };
            }
            averageData[d.Race].count++;
            averageData[d.Race].totalSalary += d.Salary;
        });

        const averages = Object.keys(averageData).map(level => ({
            Race: level,
            Salary: averageData[level].totalSalary / averageData[level].count
        }));

        // Sort averages array by EducationLevel
        // averages.sort((a, b) => a.EducationLevel - b.EducationLevel);

        // Sort averages array by Salary in ascending order
        averages.sort((a, b) => a.Salary - b.Salary);   

        const color = d => selectBar && d.Race === selectBar.Race ? 'red':'steelblue';
        
        console.log(averages);
        return <g>
            {averages.map((d, i) => (
                <rect
                    key={i}
                    x={xScale(d.Race)}
                    y={yScale(d.Salary)}
                    width={xScale.bandwidth()}
                    height={height - yScale(d.Salary)}
                    fill={color(d)}
                    stroke="black"
                    strokeWidth={1.2}
                    //onMouseOver={()=>mouseOver(d)}
                    /* onMouseEnter={(event) => {
                        mouseOver(d);
                        setTooltipX(null);
                        setTooltipY(null); 
                    }}
                    onMouseOut={mouseOut}
                    */
                />
            ))}
        </g>
    } else {
        return <g></g>
    }
}

export default BarsRace