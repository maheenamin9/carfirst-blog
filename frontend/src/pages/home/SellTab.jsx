import React from "react";
import Button from "../../components/UI/Button";
import { useFormik } from "formik";
import * as Yup from 'yup';
import SelectField from "../../components/UI/SelectField";
import { useState } from "react";

const SellTab = () => {
    const brandList = {
        label: "Select Brand",
        options: []
    };
    // const [newBrandList, setNewBrandList] = useState('');
    async function fetchBrandHandler() {
        try{
            const response = await fetch('http://localhost:3000/api/brands');
            const brands = await response.json();

            brands.map(brandObj => {
                brandList.options.push(brandObj.brand)
            })
            console.log(brandList);   
        }
        catch(err) {
            console.log(err.message)
        }
    }
    // fetchBrandHandler();
    const optionsList = [
        {
            label: 'Select Brand',
            options: ['Audi', 'BMW', 'Cherry', 'Chevrolet', 'Daihastu']
        },
        {
            label: 'Select Model',
            options: ['Boon', 'Cast', 'Cuore', 'Esse', 'Mira']
        },
        {
            label: 'Select Year',
            options: [2015, 2016, 2017, 2018, 2019]
        },
        {
            label: 'Select Trim / variant',
            options: ['660c', '660cc 2 Pwr', 'Other']
        },
        {
            label: 'Select Transmission',
            options: ['Automatic', 'Manual']
        },
        {
            label: 'Select Mileage',
            options: [5000, 10000, 20000, 30000, 40000]
        },
        {
            label: 'Select Registration City',
            options: ['Lahore', 'Gujranwala', 'Faisalabad', 'Islamabad', 'Karachi']
        },
      ]

    const formikObj = useFormik({
        initialValues: {
            brand: '',
            model: '',
            year: '',
            variant: '',
            transmission: '',
            mileage: '',
            regCity: '',
            pno: ''
        },
        validationSchema: Yup.object({
            brand: Yup.string().required("Choose the make of your car."),
            model: Yup.string().required("Find this in your cars logbook or owners manual"),
            year: Yup.string().required("Find this on a sticker inside the drivers side door."),
            variant: Yup.string().required("Find this on the original sales invoice, or sometimes the owners manual."),
            transmission: Yup.string().required("Please fill in the information."),
            mileage: Yup.string().required("Find this on your odometer on the dashboard."),
            regCity: Yup.string().required("Please select your car's registered city."),
            pno: Yup.string().required("This should be 10 digits. We'll only contact you about your inspection."),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            // resetForm({ values: '' })
        }
    })

    return (
        <React.Fragment>
            <h3 className="font-bold">What's your car worth?</h3>
            <p>We will buy your car. Sell to CarFirst instantly, safely and hassle-free</p>
            <form className="flex flex-col space-y-2" onSubmit={formikObj.handleSubmit}>
                <SelectField
                    name="brand"
                    value={formikObj.values.brand}
                    onChange={formikObj.handleChange}
                    error={formikObj.errors.brand && formikObj.touched.brand}
                    optionsList = {optionsList[0]}
                ></SelectField>
                {formikObj.errors.brand && formikObj.touched.brand ? <p className="text-[#ff0000] text-xs">{formikObj.errors.brand}</p> : null}
                <SelectField
                    name="model"
                    value={formikObj.values.model}
                    onChange={formikObj.handleChange}
                    error={formikObj.errors.model && formikObj.touched.model}
                    disabled={formikObj.values.brand === ""}
                    optionsList = {optionsList[1]}
                ></SelectField>
                {formikObj.errors.model && formikObj.touched.model ? <p className="text-[#ff0000] text-xs">{formikObj.errors.model}</p> : null}
                <SelectField
                    name="year"
                    value={formikObj.values.year}
                    onChange={formikObj.handleChange}
                    error={formikObj.errors.year && formikObj.touched.year}
                    disabled={formikObj.values.model === ""}
                    optionsList = {optionsList[2]}
                ></SelectField>
                {formikObj.errors.year && formikObj.touched.year ? <p className="text-[#ff0000] text-xs">{formikObj.errors.year}</p> : null}
                <SelectField
                    name="variant"
                    value={formikObj.values.variant}
                    onChange={formikObj.handleChange}
                    error={formikObj.errors.variant && formikObj.touched.variant}
                    disabled={formikObj.values.year === ""}
                    optionsList = {optionsList[3]}
                ></SelectField>
                {formikObj.errors.variant && formikObj.touched.variant ? <p className="text-[#ff0000] text-xs">{formikObj.errors.variant}</p> : null}
                <SelectField
                    name="transmission"
                    value={formikObj.values.transmission}
                    onChange={formikObj.handleChange}
                    error={formikObj.errors.transmission && formikObj.touched.transmission}
                    disabled={formikObj.values.variant === ""}
                    optionsList = {optionsList[4]}
                ></SelectField>
                {formikObj.errors.transmission && formikObj.touched.transmission ? <p className="text-[#ff0000] text-xs">{formikObj.errors.transmission}</p> : null}
                <SelectField
                    name="mileage"
                    value={formikObj.values.mileage}
                    onChange={formikObj.handleChange}
                    error={formikObj.errors.mileage && formikObj.touched.mileage}
                    disabled={formikObj.values.transmission === ""}
                    optionsList = {optionsList[5]}
                ></SelectField>
                {formikObj.errors.mileage && formikObj.touched.mileage ? <p className="text-[#ff0000] text-xs">{formikObj.errors.mileage}</p> : null}
                <SelectField
                    name="regCity"
                    value={formikObj.values.regCity}
                    onChange={formikObj.handleChange}
                    error={formikObj.errors.regCity && formikObj.touched.regCity}
                    optionsList = {optionsList[6]}
                ></SelectField>
                {formikObj.errors.regCity && formikObj.touched.regCity ? <p className="text-[#ff0000] text-xs">{formikObj.errors.regCity}</p> : null}
                <input
                    className={`border-2 p-3 ${formikObj.errors.pno ? "border-[#ff0000] bg-red-100" : "border-green-900"}`} 
                    placeholder="+92 Enter your phone number"
                    name="pno"
                    value={formikObj.values.pno}
                    onChange={formikObj.handleChange}
                ></input>
                {formikObj.errors.pno && formikObj.touched.pno ? <p className="text-[#ff0000] text-xs">{formikObj.errors.pno}</p> : null}
                <div className="flex">
                    <input type="checkbox" defaultChecked />
                    <p className="text-sm">By clicking on "get a price" you agree to our Terms and Privacy Policy.</p>
                </div>
                <Button type="submit" className="w-full" >Get car price</Button>
            </form>
        </React.Fragment>
    )
}

export default SellTab;