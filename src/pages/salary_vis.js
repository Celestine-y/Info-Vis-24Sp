import React from "react";
import * as d3 from 'd3';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import { BarChartEducation } from "@/components/week10/barChartEducation";
import { BarChartRace } from "@/components/week10/barChartRace";
import { BarChartCountry } from "@/components/week10/barChartCountry";
import { ScatterPlot } from "@/components/week10/scatter_plot";
import { TreeMap } from "@/components/week10/tree_map";
import { Dropdown } from "@/components/week10/dropdown";
import { useData, getAgeGroup, getTree } from "@/components/week10/utils";
//import styles from '../styles/assignment6_styles.module.css';

const csvUrl = "https://gist.githubusercontent.com/Celestine-y/203086cb78ebbb38a506e22fc4343ae0/raw/9ada20a7959d5cdad5dcd6977158c22578c85fb6/salary.csv"//"https://gist.githubusercontent.com/Celestine-y/203086cb78ebbb38a506e22fc4343ae0/raw/3a5913f69dc9eb551423331d4b9927e6897b64c8/salary.csv" // "https://gist.githubusercontent.com/hogwild/2ac0f0b665b4295e0574c85c12bec092/raw/8cee439ac896703d2c95cb805f44bf07d74e933b/titanic.csv";

const SalaryVis = () => {
    const [firstAttr, setFirstAttr] = React.useState("Gender");
    const [secondAttr, setSecondAttr] = React.useState("Country");
    const [thirdAttr, setThirdAttr] = React.useState(null);
    // const [fourthAttr, setFourthAttr] = React.useState("EducationLevel");
    // const [fifthAttr, setFifthAttr] = React.useState("Race");
    const [selectedCell, setSelectedCell] = React.useState(null);
    // const [selectedPoint, setSelectedPoint] = React.useState(null);
    // console.log(selectedCell);
    const WIDTH = 1000;
    const HEIGHT = 600;
    const margin = { top: 20, right: 40, bottom: 20, left: 40 };
    const innerHeightBar = HEIGHT - margin.top - margin.bottom-120;
    const innerWidthBar = WIDTH - margin.left - margin.right;
    
    const rawData = useData(csvUrl);
    if (!rawData) {
        return <p>
            Loading...
            </p>
    }
    const data = rawData.filter( d => d.Age > 0);//.forEach(d =>  d.AgeGroup = getAgeGroup(d));
    data.forEach(d => d.AgeGroup = getAgeGroup(d));
    //console.log(data.length, data.filter(d => d.Sex==="female").length, data.filter(d => d.Sex==="male").length )
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;
    console.log(getTree(data, ["Gender", "AgeGroup", "Country","EducationLevel","Race","Senior"]));
    const attributes = [ firstAttr, secondAttr, thirdAttr].filter( d => d !== "null"); 
    // if length/attribute = 0, set a default value
    // console.log(attributes);

    const xScaleBarEducation = d3.scaleBand()
        .domain(data.map(d => d.EducationLevel))
        .range([0, innerWidthBar])
        .padding(0.1);

    const xScaleBarRace = d3.scaleBand()
    .domain(data.map(d => d.Race))
    .range([0, innerWidthBar])
    .padding(0.1);

    const xScaleBarCountry = d3.scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, innerWidthBar])
    .padding(0.1);

    const yScaleBar = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Salary)])
        .range([innerHeightBar, 0])
        .nice();

    const onFristAttrChange = ( attr ) => {
        setFirstAttr(attr);
    }
    const onSecondAttrChange = ( attr ) => {
        setSecondAttr(attr);
    }
    const onThirdAttrChange = ( attr ) => {
        setThirdAttr(attr);
    }
    /*
    const onFourthAttrChange = ( attr ) => {
        setFourthAttr(attr);
    }
    const onFifthAttrChange = ( attr ) => {
        setFifthAttr(attr);
    }
    */
    const tree_ = getTree(data, attributes);
    const tree = {"name":"root", "children": tree_};
    const options = [{value: "null", label: "None"},{value: "Gender", label: "Gender"}, {value: "Country", label: "Country"},
        {value: "AgeGroup", label: "Age"},{value: "EducationLevel", label: "Education"},{value: "Race", label: "Race"},{value: "Senior", label: "Senior"}];
    return (<Container>
        <Row>
            <h1>Salary Determinant Visualization</h1>
            <p>This project serves a crucial purpose by shedding light on the intricate interplay between wages and various demographic factors like age, race, country, gender, and education level. By elucidating these causal relationships, visitors to the website gain valuable insights into income distribution and the myriad factors influencing it. Whether someone seeks a broad overview of income dynamics or desires specific information tailored to their demographic profile, this platform equips them with the necessary knowledge to navigate career choices and self-improvement strategies effectively.</p> 
        </Row>
        <Row>
            {/* <Image src="https://cdn.vox-cdn.com/thumbor/sLyxTzq0fNMOhg_LjLVIgPPxljs=/0x0:1200x800/1820x1213/filters:focal(526x241:718x433):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/71960942/Titanic25th_NonFeat_ParamountPictures_Ringer.0.jpg" alt="titanic" fluid /> */}
            <Image src="/life-choices.jpeg" alt="cartoon picture with a girl standing in front of many doors" fluid />
        </Row>
        <Row className="mt-3">
            <h2>A visualization on the salary dataset</h2>
            <p>We created two bar charts, a scatter plot and a treemap in the visualization, and the audience can find insights into factors that influenced salary using the interactions in the visualization.</p>
        </Row>

        <Row>
            <h2> Barcharts: the relation between Education/Race and Salary</h2>
            <p>One significant aspect explored is the impact of education level on income, as depicted in the accompanying bar chart. The data underscores a clear positive correlation between educational attainment and income levels. Notably, the chart delineates education levels ranging from high school (level 0) to Ph.D. (level 3), revealing a progressive increase in income corresponding to higher educational achievements. This insight serves as a vital reference point for students, particularly college graduates, as they contemplate their career trajectories and avenues for personal growth.</p>
            {/* x: Education Level and y: Salary */}
            <svg width={WIDTH} height={HEIGHT}>
                <BarChartEducation offsetX={margin.left+10} offsetY={margin.top} data={data} xScale={xScaleBarEducation} 
                yScale={yScaleBar} height={HEIGHT - margin.top - margin.bottom-120} width={WIDTH - margin.left - margin.right}/>
            </svg>
            <p>Similarly, the distribution of income across different racial groups is elucidated through another bar chart. This visual representation illuminates how, when controlling for job types, disparities in average incomes persist among various racial demographics. While the chart highlights that certain racial groups, such as white individuals, tend to command higher salaries on average, it also underscores persistent inequalities. For instance, Hispanic individuals often face lower average incomes within comparable job categories. Furthermore, the chart distinguishes between different Asian subgroups, excluding Chinese and Korean populations, providing nuanced insights into income dynamics within these communities. Overall, these visualizations deepen our understanding of income inequality and serve as essential tools for fostering informed discussions and policy interventions aimed at promoting economic equity.</p>
            {/* x: Race and y: Salary */}
            <svg width={WIDTH} height={HEIGHT}>
                <BarChartRace offsetX={margin.left+10} offsetY={margin.top} data={data} xScale={xScaleBarRace} 
                yScale={yScaleBar} height={HEIGHT - margin.top - margin.bottom-120} width={WIDTH - margin.left - margin.right}/>
            </svg>
            {/* // x: Country and y: Salary 
            <svg width={WIDTH} height={HEIGHT}>
                <BarChartCountry offsetX={margin.left+10} offsetY={margin.top} data={data} xScale={xScaleBarCountry} 
                yScale={yScaleBar} height={HEIGHT - margin.top - margin.bottom-120} width={WIDTH - margin.left - margin.right}/>
            </svg> */}
        </Row>

        <Row>
            <h2>A scatter plot</h2>
            <p>The scatterplot presented offers a compelling visualization of the relationship between income and age. A clear trend emerges, indicating a positive correlation between these two variables. As age increases, so does income, reflecting the typical trajectory of career advancement and earning potential over the course of one&aposs working life. </p>
            <p>By hovering your mouse over a certain point, you can see which categories it belongs to in the treemap below as the corresponding rectangle in the treemap will become red, and all the data points referring to the people within the same categories will be highlighted in the scatter plot. You can also hover over the treemap and the relevant part will be highlighted in the scatter plot.</p>
            {/* <ul>
                <li>The more one paid, the higher probabiliy one might survive.</li>
                <li>Young passengers (Age&le;10) who paid less were more likely to survive.</li>
                <li>Adults (18&le;Age&le;50) who paid less were more likely to deceased.</li>
            </ul> */}
             <ScatterPlot x={margin.left} y={margin.top} width={WIDTH} height={HEIGHT/2} data={data}
                        selectedCell={selectedCell} setSelectedCell={setSelectedCell} attributes={attributes}/>
        </Row>
        
        <Row>
            <h2>A treemap with recursive subdivision</h2>
            {/* <ul>
                <li>The size of the rectangle encodes the survival rate of the passenger group it represents.</li>
                <li>The audience can use the three dropdown buttons to split the passengers into different clusters. The treemap will adjust accordingly, showing the survival rates.</li>
                <li>The treemap and the scatter plot are connected by highlighting the selections. When the mouse hovering over a rectangle in the treemap, the rectangle and the points in the scatter plot that belong to the rectangle will be highlighted and vice versa.</li>
            </ul>
            */}
            <Row className="justify-content-md-left">
                <Col lg={2}>
                    <Dropdown options={options} id={"selector1"} selectedValue={firstAttr} onSelectedValueChange={onFristAttrChange}/>
                </Col>
                <Col lg={2}>
                    <Dropdown options={options} id={"selector2"} selectedValue={secondAttr} onSelectedValueChange={onSecondAttrChange}/>
                </Col>
                <Col lg={2}>
                    <Dropdown options={options} id={"selector3"} selectedValue={thirdAttr} onSelectedValueChange={onThirdAttrChange}/>
                </Col>
            </Row> 
        </Row>
        <Row className="justify-content-md-left mb-5">
            <TreeMap width={WIDTH} height={HEIGHT} tree={tree} selectedCell={selectedCell} setSelectedCell={setSelectedCell}/>
        </Row>

    </Container>)
}


export default SalaryVis