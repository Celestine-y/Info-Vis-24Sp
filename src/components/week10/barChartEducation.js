import XAxis from '@/components/week10/XAxis.js';
import YAxis from '@/components/week10/yAxis.js';
import BarsEducation from './barsEducation.js';

export function BarChartEducation(props){
    const {offsetX, offsetY, data, xScale, yScale, height, width, selectBar, mouseOver, mouseOut, setTooltipX, setTooltipY} = props;

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            <BarsEducation data={data} xScale={xScale} yScale={yScale} height={height} selectBar={selectBar} setTooltipX={setTooltipX} setTooltipY={setTooltipY} mouseOver={mouseOver} mouseOut={mouseOut}/>
            <YAxis yScale={yScale} height={height} axisLable={"Salary"}/>
            <XAxis xScale={xScale} height={height} width={width} axisLable={"Education"}/>
        </g>
    );
}

// export default BarChart