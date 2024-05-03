

export function Dropdown (props) {
    const { options, id, selectedValue, onSelectedValueChange } = props;
    // console.log(options)
    return (
                <select id={id} defaultValue={selectedValue} onChange={event => {onSelectedValueChange(event.target.value)}}>
                {options.map( ({value, label}) => {
                    return <option key={label} value={value} >
                        {label}
                    </option>
                })}
            </select>
    ) 
}