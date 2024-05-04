function XAxis(props){
    const { xScale, height, width, axisLable } = props;
    //console.log(xScale)
    if(xScale) {
        const isLinearScale = typeof(xScale.domain()[0]) === 'number';    
        if (isLinearScale) {
            const ticks = xScale.ticks();
            return <g>            
                <line x1={0} x2={width} y1={height} y2={height} stroke={'black'} />
                {ticks.map( tickValue => {
                        return <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height})`}>
                            <line y2={10} stroke={'black'} />
                            <text style={{ textAnchor:'middle', fontSize:'10px'}} y={20}>
                                {tickValue}
                            </text>
                        </g>
                    })                
                }
                <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(10040, 35000)rotate(0)`}>
                    {axisLable}
                </text>            

            </g>
            
        }else{
            const ticks = xScale.domain();
            return <g>
                <line x1={0} x2={width} y1={height} y2={height} stroke={'black'} />
                {ticks.map( tickValue => {
                        return <g key={tickValue} transform={`translate(${xScale(tickValue)+30}, ${height})rotate(75)`}>
                            {/* <line y2={5} stroke={'black'} /> */}
                            <text style={{ textAnchor:'start', fontSize:'10px'}} y={30}>
                                {tickValue}
                            </text>
                        
                        </g>
                    })
                }
                <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(890, 460)rotate(0)`}>
                    {axisLable}
                </text>
            </g>
        }           
        
    }else {
    return <g></g>
    }
}

export default XAxis