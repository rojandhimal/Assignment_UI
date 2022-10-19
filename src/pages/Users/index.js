import React,{ useState, useEffect } from 'react'
import { useFormik } from "formik"

import Header from './components/HeaderComponent'
import Actions from './components/Actions'
import Table from '../../components/Table'
import { Button } from '../../components/UI/Button'
import { useDebounce } from '../../utils'

const RightComponent = () => {
  return (
    <Button label={'Add User'} action={"dark"} className="mr-4" onClick={() => console.log("hello")} />
  );
};

const Users = () => {
  const limit = 10
  const [filters, setFilters] = useState({})
  const debouncedFilters = useDebounce(filters, 300)
  const skip = Object.keys(debouncedFilters).length === 0;
  const loading =false;
  const edges=[{id:1,email:"rojandhimal1@gmail.com",status:"active"}]
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
      { label: 'Status', name: 'status', type: 'tag' },
      { label: 'Role', name: 'role.name', type: 'label' },
      { label: 'Last Active', name: 'lastActive', type: 'label' },
      { label: 'Action', name: 'action', type: 'custom', component: Actions },
    ],
    limit,
    loading,
    rows: edges.map(item => ({ ...item, action: item.isActive ? 'success' : 'danger' }))
  }

  console.log("tableProps",tableProps)

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
          leftText="Users"
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

export default Users;
