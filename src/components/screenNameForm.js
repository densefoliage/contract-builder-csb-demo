import React, { useState } from "react"

import toCamelCase from "../js/toCamelCase"

const allWhitespaceRegex = /\s/g;

const ScreenNameForm = ({ onSubmit, verbose }) => {

    const [formValue, setFormValue] = useState("");

    const handleChange = (event) => {
        setFormValue(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = formValue.slice(0);
        const nameCamelCase = toCamelCase(name).replace(); // This might be too much validation, but it works for now.

        const str = `formEvent = {\n\ttype: "submit",\n\tdata: "${name}"\n}`;
        console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");

        if (nameCamelCase.length > 2) {
            onSubmit(nameCamelCase);
        } else {
            const str = `errorEvent = {\n\ttype: "form_validation",\n\tdata: "Screen name invalid, try using more alphabetical characters."\n}`;
            console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
        }
    };

    return (
        <form className="screen-name-form" onSubmit={handleSubmit}>
        <h2>Set Screen Name</h2>
        <div className="text-and-button-wrapper">
            <label htmlFor="type-screen-name">
                {"Screen name: "} 
            </label>
            <input 
            type="text" 
            id="type-screen-name" 
            name="type-screen-name" 
            value={formValue}
            onChange={handleChange}
            />
            {/* <input type="button" id="gen-screen-name" name="gen-screen-name" value="Get random screenname" /> */}
        </div>
        <input type="submit" value="Submit"/>
    </form>
    )
};

export default ScreenNameForm