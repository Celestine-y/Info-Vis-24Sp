import * as d3 from 'd3'


export function ScatterPlot(props) {
    const { width, height, data, selectedCell, setSelectedCell, attributes } = props;
    const margin = { top: 20, right: 40, bottom: 20, left: 40, gap: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xScale = d3.scaleLinear().range([0, innerWidth-200])
        .domain([20, d3.max(data, d => d.Age)]).nice();
    const yScale = d3.scaleLinear().range([(innerHeight-margin.gap)/2, 0])
        .domain([0, d3.max(data, d => d.Salary)]).nice();
    const colormap = d3.schemePaired;
    const radius = 3;
    const survived = data;
    const perished = data;
    const setColor = (d) => {
        if(selectedCell){
            // console.log(selectedCell);
            if (selectedCell[0].PassengerId) {
                if (selectedCell[0].PassengerId === d.PassengerId) {
                return colormap[10]
                } else {
                    return colormap[1] 
                }
            }
            for (let i = 0; i < selectedCell.length; i++){
                if (selectedCell[i].name !== d[selectedCell[i].attr]){
                    return colormap[1]
                };
            }
            return colormap[10];
        }
        return colormap[1];
    }
    const onMouseEnter = (d) => {
        const items = attributes.reverse().map( attr => {
            return { "name": d[attr], "attr": attr, "PassengerId":d.PassengerId }
        });
        // console.log(d);
        setSelectedCell(items);
    }
    //console.log(colormap[0]) 
    return <svg width={width} height={height}>
    <g transform={`translate(${margin.left+30}, ${margin.top})`}>
        <line y1={innerHeight/2-margin.gap/2} x2={innerWidth-180} y2={innerHeight/2-margin.gap/2} stroke={"black"} strokeWidth={2}/> 
        {xScale.ticks().map( (tick, idx) => {
            return <g key={idx+'xtick'} transform={`translate(${xScale(tick)}, ${innerHeight/2})`}>
                <line y1={-10} y2={-margin.gap/2} stroke={"black"}/>
                <line y1={10} y2={margin.gap/2} stroke={"black"}/>
                <line y1={-margin.gap/2} y2={-innerHeight/2} stroke={"gray"} opacity={0.3}/>
                <line y1={margin.gap/2} y2={innerHeight/2} stroke={"gray"} opacity={0.3}/>
                <text style={{textAnchor:"middle"}} >
                    {tick}
                </text>
            </g>
        })}
        <text x={innerWidth+5} y={innerHeight/2+10}>{"Age"}</text>
        <text x={0} y={-5}>{"Salary"}</text>
        <text x={0} y={innerHeight+5}>{"Age"}</text>
        <text style={{fontSize:'2em'}}x={innerWidth-150} y={50}>{"Age-Salary Scatterplot"}</text>
        <text style={{fontSize:'2em'}}x={innerWidth-150} y={innerHeight-50}>{"Deceased"}</text>
        <line y1={innerHeight/2+margin.gap/2} x2={innerWidth} y2={innerHeight/2+margin.gap/2} stroke={"black"} strokeWidth={2}/>
        <line y2={innerHeight/2-margin.gap/2} stroke={"black"} strokeWidth={2} />
        {yScale.ticks().map( (tick, idx) => {
            return <g key={idx+'ytick-s'} transform={`translate(${0}, ${yScale(tick)})`}>
                    <text style={{textAnchor:"end"}} x={-5} >
                        {tick}
                    </text>
                    <line x1={-5} stroke={"black"} />
                    <line x2={innerWidth-200} stroke={"gray"} opacity={0.3}/>
                    {/* x-scale gray grid!!!! */}
                </g>
        })}
        <line y1={innerHeight/2+margin.gap/2} y2={innerHeight} stroke={"black"} strokeWidth={2} />
        {yScale.ticks().reverse().map( (tick, idx) => {
            return <g key={idx+'ytick-p'} transform={`translate(${0}, ${innerHeight-yScale(tick)})`}>
                    <text style={{textAnchor:"end"}} x={-5} >
                        {tick}
                    </text>
                    <line x1={-5} stroke={"black"} />
                    <line x2={innerWidth} stroke={"gray"} opacity={0.3}/>
                    
                </g>
        })}
        {survived.map( (d, idx) => {
            return <circle key={idx+"point"} cx={xScale(d.Age)} cy={yScale(d.Salary)} r={radius} stroke={"black"} fill={setColor(d)}
            onMouseEnter={() => onMouseEnter(d)} onMouseOut={() => setSelectedCell(null)}/>
        })}
        
        {perished.map( (d, idx) => {
            return <circle key={idx+"point"} cx={xScale(d.Fare)} cy={innerHeight-yScale(d.Age)} r={radius} stroke={"black"} fill={setColor(d)}
            onMouseEnter={() => onMouseEnter(d)} onMouseOut={() => setSelectedCell(null)}/>
        })}
        </g>
    </svg>
}

