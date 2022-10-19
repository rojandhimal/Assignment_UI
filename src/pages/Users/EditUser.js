
import { useFormik } from "formik";
import React,{ useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/UI/Button";
import { Avatar } from "../../components/UI/Avatar";
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
      <Button label={'Back'} action="default" className="mr-4" onClick={() => navigate('/users') } />
      <Button label={'Update'} action={"dark"} className="mr-4" onClick={ updateUser } />
    </div>
  );
};



const EditUser = () => {
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
    { label: 'Name', type: "text", name: "meta.name" },
    { label: 'Email', type: "text", name: "email" },
    
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
          leftText="Edit Practitioner Details"
          rightComponent={RightComponent}
        />
        <div>
          <Avatar src={""} label={"name"} size="lg" />
        </div>
        <div className="mt-5">
        </div>
        <div className="mt-5 items-center">
          {renderLabels}
        </div>
      </div>
    </div>
  );
};

export default EditUser;
