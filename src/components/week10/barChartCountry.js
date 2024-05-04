import XAxis from '@/components/week10/XAxis.js';
import YAxis from '@/components/week10/yAxis.js';
import BarsCountry from './barsCountry.js';

export function BarChartCountry(props){
    const {offsetX, offsetY, data, xScale, yScale, height, width, selectBar, mouseOver, mouseOut, setTooltipX, setTooltipY} = props;

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            <BarsCountry data={data} xScale={xScale} yScale={yScale} height={height} selectBar={selectBar} setTooltipX={setTooltipX} setTooltipY={setTooltipY} mouseOver={mouseOver} mouseOut={mouseOut}/>
            <YAxis yScale={yScale} height={height} axisLable={"Salary"}/>
            <XAxis xScale={xScale} height={height} width={width} axisLable={"Country"}/>
        </g>
    );
}

// export default BarChart