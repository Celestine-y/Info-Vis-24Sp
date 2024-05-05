function Tooltip(props) {
    const {d, x, y} = props;
    //console.log(d);
    if (x === null|!d) {
        return <div></div>;
    } else {
        if (Array.isArray(d) && d.length >= 3) {
            if (d[2].attr === null) {
                d[2].attr = "not selected"
                d[2].name = "none"
            };
            if (d[1].attr === null) {
                d[1].attr = "not selected"
                d[1].name = "none"
            };
            if (d[0].attr === null) {
                d[0].attr = "not selected"
                d[0].name = "none"
            };

        
            const divStyle = {
                position: "absolute",
                textAlign: "left",
                width: "150px",
                height: "150px",
                padding: "2px",
                font: "12px sans-serif",
                background: "lightblue",
                border: "0px",
                borderRadius: "8px",
                pointerEvents: "none",
                left: `${x+10}px`,
                top: `${y}px`
            };
            return (<div style={divStyle} >
                <p>{d.station}</p>
                <p>Group Attributes:</p>
                <ul>
                <li>{d[2].attr}: {d[2].name}</li>
                <li>{d[1].attr}: {d[1].name}</li>
                <li>{d[0].attr}: {d[0].name}</li> 
                </ul>
                </div>)
    };}
        if (Array.isArray(d) && d.length == 2) {
            if (d[1].attr === null) {
                d[1].attr = "not selected"
                d[1].name = "none"
            };
            if (d[0].attr === null) {
                d[0].attr = "not selected"
                d[0].name = "none"
            };

            const divStyle = {
                position: "absolute",
                textAlign: "left",
                width: "150px",
                height: "120px",
                padding: "2px",
                font: "12px sans-serif",
                background: "lightblue",
                border: "0px",
                borderRadius: "8px",
                pointerEvents: "none",
                left: `${x+10}px`,
                top: `${y}px`
            };
            return (<div style={divStyle} >
                <p>{d.station}</p>
                <p>Group Attributes:</p>
                <ul>
                <li>{d[1].attr}: {d[1].name}</li>
                <li>{d[0].attr}: {d[0].name}</li> 
                </ul>
                </div>)
    };
        if (Array.isArray(d) && d.length == 1) {
            if (d[0].attr === null) {
                d[0].attr = "not selected"
                d[0].name = "none"
            };

            const divStyle = {
                position: "absolute",
                textAlign: "left",
                width: "150px",
                height: "120px",
                padding: "2px",
                font: "12px sans-serif",
                background: "lightblue",
                border: "0px",
                borderRadius: "8px",
                pointerEvents: "none",
                left: `${x+10}px`,
                top: `${y}px`
            };
            return (<div style={divStyle} >
                <p>{d.station}</p>
                <p>Group Attributes:</p>
                <ul>
                <li>{d[0].attr}: {d[0].name}</li> 
                </ul>
                </div>)
};
    
}

export default Tooltip