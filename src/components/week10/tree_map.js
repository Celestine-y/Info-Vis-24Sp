import * as d3 from "d3"


function TreeMapText(props) {
    const { d } = props;
    return <foreignObject width={d.x1-d.x0} height={d.y1-d.y0}>
        <div >
            <p style = {{fontFamily: "Georgia, serif", color: '#696969'}}>{d.ancestors().reverse().slice(1).map((d, idx) => d.data.name)
                .join(".\n")+"\nSalary: "+d3.format(".4s")(d.data.value)}</p>
        </div>
        </foreignObject>
}

export function TreeMap(props) {
    const { width, height, tree, selectedCell, setSelectedCell, setTooltipX, setTooltipY } = props;
    const margin = { top: 20, right: 40, bottom: 20, left: 40, gap: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const root = d3.treemap().size([innerWidth, innerHeight]).padding(2)
        .round(true)(d3.hierarchy(tree).sum(d => d.children ? 0 : d.value))
        .sort((a, b) => b.value - a.value);
    const leaves = root.leaves();
    console.log(leaves[0].ancestors());
    const parents = root.leaves().map( d => d.parent.data.name);
    const parentsCategories = parents.filter( (d, idx) => parents.indexOf(d) === idx );
    const color = d3.scaleOrdinal(d3.schemeSet3).domain(parentsCategories);
    const firstLayer = root.descendants()[0].children;

    const compareAncestors = (ancestors) => {
        if(!selectedCell){
            return false;
        }
        for(let i = 0; i < ancestors.length; i++){
            if (selectedCell[i].name !== ancestors[i].name) {
                return false;
            }
        }
        return true;
    };

    return <svg width={width} height={height}>
    <g transform={`translate(${margin.left}, ${margin.right})`}>
        {root.leaves().map( (d, idx) => {
            const ancestors = d.ancestors().map(d => {return {"name":d.data.name, "attr":d.data.attr}}).slice(0, -1);
            // console.log(ancestors);
            return <g key={idx+"treemap"} transform={`translate(${d.x0}, ${d.y0})`} 
                onMouseOver={(event) => {
                    setSelectedCell(ancestors);
                    setTooltipX(null);
                    setTooltipY(null); 
                }}  
                onMouseOut={()=>setSelectedCell(null)}>
                <rect width={d.x1-d.x0} height={d.y1-d.y0} stroke={"none"} fill={selectedCell && compareAncestors(ancestors) ? "red":color(d.parent.data.name)} opacity={0.8}/>
                <TreeMapText d={d} />
            </g>
        })}
        {firstLayer.map( (d, idx) => {
            return <g key={idx+"outerline"} transform={`translate(${d.x0}, ${d.y0})`}>
                <rect width={d.x1-d.x0} height={d.y1-d.y0} stroke={"black"} fill={"none"}/>
                <text style={{fontSize:"6em"}} x={ (d.x1-d.x0)/2 } y={ (d.y1-d.y0)/2 } textAnchor={"middle"} opacity={0.3} 
                transform={`rotate(${(d.x1-d.x0)>(d.y1-d.y0)? 0: 90}, ${(d.x1-d.x0)/2}, ${(d.y1-d.y0)/2})`}>
                    {d.data.name}
                    </text>
                </g>
        })}
        </g>
    </svg>
}