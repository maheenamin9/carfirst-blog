import React, { useEffect } from "react";
import Button from "../../components/UI/Button";
import { useFormik } from "formik";
import * as Yup from 'yup';
import SelectField from "../../components/UI/SelectField";

const BuyTab = () => {

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
      label: 'Select Min Year',
      options: [2000, 2001, 2002, 2003, 2004]
    },
    {
      label: 'Select Max Year',
      options: [2015, 2016, 2017, 2018, 2019]
    }
  ]

  const formikObj = useFormik({
    initialValues: {
      brand: '',
      model: '',
      minYear: '',
      maxYear: ''
    },
    validationSchema: Yup.object({
      brand: Yup
        .string()
        .required(),
      model: Yup
        .string()
        .required(),
      minYear: Yup
        .string()
        .required(),
      maxYear: Yup
        .string()
        .required()
    }),
    onSubmit: (values, {resetForm}) => {
      console.log(values);
      resetForm({values: ''})
    }
  })

  useEffect(() => {
    formikObj.setFieldValue("model", "")
  }, [formikObj.values.brand])

  useEffect(() => {
    formikObj.setFieldValue("maxYear", "")
  }, [formikObj.values.minYear])

  return (
    <React.Fragment>
      <h3 className="font-bold">Find your new dream car</h3>
      <p>Explore through hundreds of options to find the best fit</p>
      <form className="flex flex-col space-y-2" onSubmit={formikObj.handleSubmit}>
        <SelectField
          name="brand"
          value={formikObj.values.brand}
          onChange={formikObj.handleChange}
          optionsList = {optionsList[0]}
        ></SelectField>
        <SelectField 
          name="model"
          value={formikObj.values.model}  
          onChange={formikObj.handleChange}
          disabled={formikObj.values.brand === ""}
          optionsList = {optionsList[0]}
        ></SelectField>
        <div className="flex space-x-2">
            <SelectField 
                className="w-1/2"
                name="minYear"
                value={formikObj.values.minYear}
                onChange={formikObj.handleChange}
                optionsList = {optionsList[0]}
                ></SelectField>
            <SelectField
                className="w-1/2"
                name="maxYear"
                value={formikObj.values.maxYear}
                onChange={formikObj.handleChange}
                disabled={formikObj.values.minYear === ""}
                optionsList = {optionsList[0]}
            ></SelectField>
        </div>
        <Button type="submit" className="w-full">
          Browse used cars
        </Button>
      </form>
    </React.Fragment>
  );
};

export default BuyTab;
