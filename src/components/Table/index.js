import React from 'react';
import { useFormik } from "formik";

const Label = (props) => {
  const { label } = props || {};
  return (
    <div
      title={label}
      className="leading-5 text-base text-black font-medium max-w-[200px] text-ellipsis overflow-hidden"
    >
      {label}
    </div>
  );
};


const getType = (props) => {
  const { defaultValue, formik, name, type, component=()=>{} } = props || {};
  const values = formik.values || {};
  const value = formik.getFieldProps(name).value || defaultValue || "";
  const cProps = {
    ...props,
    id: values.id,
    label: value,
    values,
  };

  switch (type) {
    case "custom":
      return component(cProps);
    case "date":
      return <Label label={value ? new Date(value).toLocaleDateString() : ""} />;
    case "label":
      return <Label {...cProps} />;
    default:
      return null;
  }
};

const Row = (props) => {
  const { formik, headers } = props || {};
  if (!props.formik.values) {
    return null;
  }
  const columns = headers.map((item, index) => {
    const { onClick } = item || {};
    const component = getType({ ...item, ...props });

    return (
      <td
        key={index}
        className={`border-0 leading-5 border-b border-gray-200 px-6 py-4 containter-column whitespace-nowrap `}
      >
        <span >
          {formik.values.id && component}
        </span>
      </td>
    );
  });

  return (
    <tr className="group component-table-row border-0 border-b border-gray-400">
      {columns}
    </tr>
  );
};

const Table = (props) => {
  const {
    headers = [],
    limit,
    loading,
    rows: _rows = [],
    variant = "default",
  } = props || {};
  let rows = [..._rows];
  // fill emty rows to prevent table from resizing
  if (_rows.length < limit) {
    rows = [...rows, ...Array(limit - _rows.length).fill(null)];
  }
console.log("roe",rows)
  const variants = {
    default: "h-[651px]",
    sm: "h-32",
    md: "h-80",
    modal: "h-[531px]",
    dynamicHeight: "",
  };
  const classes = variants[variant];


  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className={`overflow-hidden relative ${classes}`}>
            <table
              className={`min-w-full divide-y divide-gray-200 border-separate`}
              style={{ borderSpacing: 0 }}
            >
              <thead className="bg-white">
                <tr>
                  {
                    headers.map((item, index) => (
                      <th
                        key={index}
                        scope="col"
                        className={
                          !item.className &&
                          `px-6 py-3 text-left text-xs font-medium font-bold text-black border-0 border-b border-gray-200`
                        }
                        
                        style={{ width: `${item.width || "initial"}` }}
                      >
                        <div className="flex">
                          <div className={item.className}>{typeof item.label === 'function' ? item.label(props) : item.label}</div>
                          
                        </div>
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody className={`bg-white divide-y divide-gray-200`}>
                {loading || _rows.length === 0 ? (
                  <tr>
                    <td colSpan={headers.length}>
                      <div className="py-12 flex absolute items-center justify-center w-full inset-0 text-black block relative">
                        
                          <div className="text-black">No results found</div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  rows.map((item, index) => {
                    const formik = useFormik({
                      initialValues: item,
                      enableReinitialize: true,
                    });
                    console.log("formik",formik.values)
                    const rowProps = {
                      headers,
                      formik,
                    };
                    return <Row key={index} {...rowProps} />;
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
