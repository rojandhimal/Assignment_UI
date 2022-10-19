
import { useFormik } from "formik";
import React,{ useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/UI/Button";
import { getInput } from "../../components/UI/input";
import { useDebounce } from "../../utils";
import Header from "./components/HeaderComponent";

const RightComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const updateUser =()=>{
    console.log("update")
  }
  return (
    <div>
      <Button label={'Back'} action="default" className="mr-4" onClick={() => navigate('/') } />
      <Button label={'Update'} action={"dark"} className="mr-4" onClick={ updateUser } />
    </div>
  );
};



const EditPractitioner = () => {
  const { id } = useParams();
 const user={email:"rojandhimal1@gmail.com"}

  const updateUser=(props)=>{
    console.log("update",props)
  }
  
  const formik = useFormik({
    initialValues: user,
    enableReinitialize: true,
  });

  const debouncedValues = useDebounce(formik.values, 300)
  useEffect(() => {
    formik.dirty && updateUser({
          id: id,
          status: debouncedValues.status,
          roleId: debouncedValues.roleId,
          entityId: debouncedValues.entityId
    
    })
  }, [debouncedValues])

  const inputs = [
    { label: 'Full Name', type: "text", name: "fullname" },
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
          leftText="Edit User Details"
          rightComponent={RightComponent}
        />
        <div className="mt-5">
        </div>
        <div className="mt-5 items-center">
          {renderLabels}
        </div>
      </div>
    </div>
  );
};

export default EditPractitioner;
