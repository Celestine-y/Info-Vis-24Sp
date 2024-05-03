import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import { ScatterPlot } from "@/components/week10/scatter_plot";
import { TreeMap } from "@/components/week10/tree_map";
import { Dropdown } from "@/components/week10/dropdown";
import { useData, getAgeGroup, getTree } from "@/components/week10/utils";


const csvUrl = "https://gist.githubusercontent.com/Celestine-y/203086cb78ebbb38a506e22fc4343ae0/raw/9ada20a7959d5cdad5dcd6977158c22578c85fb6/salary.csv"//"https://gist.githubusercontent.com/Celestine-y/203086cb78ebbb38a506e22fc4343ae0/raw/3a5913f69dc9eb551423331d4b9927e6897b64c8/salary.csv" // "https://gist.githubusercontent.com/hogwild/2ac0f0b665b4295e0574c85c12bec092/raw/8cee439ac896703d2c95cb805f44bf07d74e933b/titanic.csv";

const Titanic = () => {
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
    console.log(getTree(data, ["Gender", "AgeGroup", "Country","EducationLevel","Race"]));
    const attributes = [ firstAttr, secondAttr, thirdAttr].filter( d => d !== "null"); 
    // if length/attribute = 0, set a default value
    // console.log(attributes);
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
        {value: "AgeGroup", label: "Age"},{value: "EducationLevel", label: "Education Level"},{value: "Race", label: "Race"}];
    return (<Container>
        <Row>
            <h1>Salary Visualization</h1>
            <p>The sinking of the Titanic is one of the most infamous shipwrecks in history. On April 15, 1912, during her maiden voyage, the widely considered unsinkable RMS Titanic sank after colliding with an iceberg. Unfortunately, there weren&apos;t enough lifeboats for everyone onboard, resulting in the death of 1502 out of 2224 passengers and crew.</p> 
            <p>While some element of luck was involved in surviving, it seems that some groups of people were more likely to survive than others. This visualization is built to answer the question, &quot;What sorts of people were more likely to survive?&quot; using the passenger dataset. </p>
        </Row>
        <Row>
            <Image src="https://cdn.vox-cdn.com/thumbor/sLyxTzq0fNMOhg_LjLVIgPPxljs=/0x0:1200x800/1820x1213/filters:focal(526x241:718x433):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/71960942/Titanic25th_NonFeat_ParamountPictures_Ringer.0.jpg" alt="titanic" fluid />
        </Row>
        <Row className="mt-3">
            <h2>A visualization on the Titanic passenger dataset</h2>
            <p>We created a symmetric scatter plot and a treemap in the visualization, and the audience can find insights into factors that influenced survival rates using the interactions in the visualization.</p>
        </Row>
        <Row>
            <h2>A symmetric scatter plot</h2>
            <p>The scatter plot shows the relation between passengers&apos; ages and the fare they paid. Each point represents a passenger. The view is divided into two parts: one shows the plot of the survors; the other shows the deceased.</p>
            <p>Comparing the two subplots, we have the following conclusions:</p>
            <ul>
                <li>The more one paid, the higher probabiliy one might survive.</li>
                <li>Young passengers (Age&le;10) who paid less were more likely to survive.</li>
                <li>Adults (18&le;Age&le;50) who paid less were more likely to deceased.</li>
            </ul>
             <ScatterPlot x={margin.left} y={margin.top} width={WIDTH} height={HEIGHT} data={data}
                        selectedCell={selectedCell} setSelectedCell={setSelectedCell} attributes={attributes}/>
        </Row>
        
        <Row>
            <h2>A treemap with recursive subdivision</h2>
            <ul>
                <li>The size of the rectangle encodes the survival rate of the passenger group it represents.</li>
                <li>The audience can use the three dropdown buttons to split the passengers into different clusters. The treemap will adjust accordingly, showing the survival rates.</li>
                <li>The treemap and the scatter plot are connected by highlighting the selections. When the mouse hovering over a rectangle in the treemap, the rectangle and the points in the scatter plot that belong to the rectangle will be highlighted and vice versa.</li>
            </ul>
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


export default Titanic