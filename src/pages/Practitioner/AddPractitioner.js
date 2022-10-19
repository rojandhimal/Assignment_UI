
import { useFormik } from "formik";
import React,{ useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/UI/Button";
import { getInput } from "../../components/UI/input";
import Header from "./components/HeaderComponent";


const AddPractitioner = () => {
  const formik = useFormik({
    initialValues: {fullname:"",email:"",contact:"",working_day:"",start_time:"",end_time:"",error:""},
    enableReinitialize: true,
    validateOnChange: true
  });

  const savePractitioner = (props) =>{
    const {formik} = props;
    const {fullname,email,contact,working_day,start_time,end_time} = formik.values;
    if(fullname.length && email.length && contact.length && working_day && start_time.length && end_time.length){
    }else{
      formik.setFieldValue("error","Please provide valid data")
    }
  }
  const RightComponent = () => {
    const navigate = useNavigate();
    return (
      <div>
        <Button label={'Back'} action="default" className="mr-4" onClick={() => navigate('/') } />
        <Button label={'Save'} action={"dark"} className="mr-4" onClick={() => savePractitioner({formik}) } />
      </div>
    );
  };

  const inputs = [
    { label: 'Full Name', type: "text", name: "fullname", required:true},
    { label: 'Email', type: "text", name: "email" },
    { label: 'Contact', type: "number", name: "contact" },
    { label: 'DOB', type: "date", name: "working_day" },
    { label: 'WOrking Days', type: "number", name: "working_day" },
    { label: 'Start Time', type: "time", name: "start_time" },
    { label: 'End Time', type: "time", name: "end_time" },
  ]
  const renderLabels = inputs.map((item, index) => {
    const inputProps = {
      formik,
      ...item,
      ...formik.getFieldProps(item.name)
    }

    return (
      <div key={index} className="w-full p-1">
        {
          getInput(inputProps)
        }
      </div>
    )
  })

  return (
    <div>
      <div className="container mx-auto px-10">
        <Header
          leftText="Practitioner Details"
          rightComponent={RightComponent}
        />
        {formik.values.error && <div className="text-red-600">{formik.values.error}</div>}
        <div className="mt-5">
        </div>
        <div className="mt-5 items-center">
          {renderLabels}
        </div>
        
      </div>
    </div>
  );
};

export default AddPractitioner;
