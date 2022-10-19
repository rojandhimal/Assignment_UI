import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import { getInput } from '../../components/UI/input';
import { LoginService } from '../../utils/apiservices';
import useAxios from '../../utils/useAxios';

const Login = () => {
  let api = useAxios()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {email:"",password:"",error:""},
    enableReinitialize: true,
    validateOnChange: true
  });

  const handleSignup = () =>{
    navigate("/signup")
  }

  const handleLogin = async () => {
    const {email,password} = formik.values;
    if(email.length && password.length>6){
      const postData ={email,password}
      const {status,data} = await LoginService(postData);
      if(status=="success"){
        localStorage.setItem("accessToken",data.authToken)
        localStorage.setItem("refreshToken",data.refreshToken)
        navigate("/")
      }else{
        formik.setFieldValue("error","Username or password not matched.")
      }
    }else{
      formik.setFieldValue("error","Please provide valid information.")
    }
  }

  const inputs = [
    { label: 'Email', type: "text", name: "email",placeholder:"Ex. rojandhimal1@gmail.com" },
    { label: 'Password', type: "password", name: "password" ,placeholder:"************"}
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
    <>
      <div className="min-w-full min-h-full flex flex-col justify-center grid grid-cols-5">
        <div
          className="hidden col-span-3 lg:flex flex-col items-end justify-center border-r border-gray-200 lg:py-14 lg:px-[10%]">
          <div className="text-lg text-gray-400 font-medium tracking-wider">Tech Tegs</div>
        </div>
        <div
          className="col-span-5 lg:col-span-2 px-4 py-8 lg:py-14 lg:px-14 mx-auto max-w-screen-sm w-full flex flex-col justify-center">
          <div className="flex flex-col justify-center">
          </div>
          <div className="mt-4">
            <div>
              <div>
                <div className="mt-1 grid">
                {formik.values.error.length ? <div className='text-red-500'>{formik.values.error}</div> : <></>}
                 {renderLabels}
                      <Button
                        label="Login"
                        action={"dark"}
                        onClick={() => handleLogin()}
                        className="flex flex-row items-center py-5 mt-5"
                      />
                      <Button
                        label="Signup"
                        action={"dark"}
                        onClick={() => handleSignup()}
                        className="flex flex-row items-center py-5 mt-5"
                      />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
