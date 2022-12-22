const SelectField = (props) => {
    return(
        <select 
            className={`border-2 border-green-900 p-3 cursor-pointer disabled:cursor-not-allowed ${props.disabled && !props.error ? "border-gray-300 text-gray-300" : ""} ${props.error ? "border-[#ff0000] bg-red-100 text-[#ff0000]" : ""} ${props.className}`}
            name={props.name}
            value={props.value || 'DEFAULT'}
            onChange={props.onChange}
            disabled={props.disabled} 
        >
            <option value="DEFAULT" disabled>{props.optionsList.label || 'brand'}</option>
            {props.optionsList.options.map((option, index)=>
                <option key={index}>{option}</option>
            )}
        </select>
    )
}

export default SelectField;