import React,{ useState, useEffect } from 'react';
import { useFormik } from "formik"

import Header from './components/HeaderComponent'
import Actions from './components/Actions'
import Table from '../../components/Table'
import { Button } from '../../components/UI/Button'
import { useDebounce } from '../../utils'
import { useNavigate } from 'react-router-dom';
import { apiGetALlPractitioners } from '../../utils/apiservices';

const RightComponent = () => {
  const navigate = useNavigate()
  const handleAdd = () => {
    navigate(`/practitioner/add`)
  }
  return (
    <Button label={'Add Practitioner'} action={"dark"} className="mr-4" onClick={handleAdd} />
  );
};

const Practitioner = () => {
  const limit = 10
  const [filters, setFilters] = useState({})
  const debouncedFilters = useDebounce(filters, 300)
  const skip = Object.keys(debouncedFilters).length === 0;
  const {status,data} = apiGetALlPractitioners();
  console.log(data)
  const loading =false;
  const edges=[{id:1,email:"rojandhimal1@gmail.com",status:"Active",role:{id:1,name:"admin"}}]
  const onChange = (values) => {
    setFilters({ ...filters, ...values })
  }
  const inputs = [
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        {
          label: 'All',
          value: ''
        },
        {
          label: 'Active',
          value: 'active'
        },
        {
          label: 'Inactive',
          value: 'inactive'
        },
      ]
    },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'from', label: 'From', type: 'date' },
    { name: 'to', label: 'To', type: 'date' },
  ]

  const tableProps = {
    headers: [
      { label: "", name: 'meta.profilePic', type: "custom" },
      { label: 'User', name: 'meta.name', type: 'label', },
      { label: 'Email', name: 'email', type: 'label' },
      { label: 'Status', name: 'status', type: 'label' },
      { label: 'Role', name: 'role.name', type: 'label' },
      { label: 'Last Active', name: 'lastActive', type: 'label' },
      { label: 'Action', name: 'action', type: 'custom', component: Actions },
    ],
    limit,
    loading,
    rows: edges
  }

  const initialValues = { search: '', limit, ...inputs.map(item => ({ ...item, value: '' })).reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {}) }
  const formik = useFormik({
    initialValues
  });

  const filterProps = {
    inputs,
    formik,
    type: 'simple',
    onChange
  }

  const searchBarProps = {
    name: 'search',
    formik
  }

  useEffect(() => {
    onChange(formik.values)
  }, [formik.values])

  return (
    <div className='py-5 mx-auto sm:px-6 lg:px-8 user-admin'>
      <div className="container mx-auto">
        <Header
          leftText="Practitioners"
          rightComponent={RightComponent}
        />
        <div className="flex items-center justify-end flex-grow">
          <div className="mr-4">
          </div>
        </div>
        <div className="p-4 sm:px-0 flex-col">
          <Table  {...tableProps} />
        </div>
      </div>
    </div>
  );
};

export default Practitioner;
