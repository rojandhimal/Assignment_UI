import React from "react";
import {SearchIcon} from "@heroicons/react/outline";

const SearchBar = (props) => {
  const { formik, name, className, variant="default" } = props || {};

  const inputProps = {
    type: "text",
    ...props,
    ...formik.getFieldProps(name),
  };

  const variants = {
    default: {
      input: 'shadow-sm focus:ring-black focus:border-black block w-full pr-12 sm:text-sm border-black rounded'
    },
    simple: {
      input: 'block w-full pr-12 sm:text-sm border-t-0 border-l-0 border-r-0'
    }
  }

  const variantStyles = variants[variant]

  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        {...inputProps}
        className={variantStyles.input}
      />
      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
        <kbd className="inline-flex items-center px-2 text-sm font-sans font-medium text-black">
          <SearchIcon className="h-4 w-4" />
        </kbd>
      </div>
    </div>
  );
};

export default SearchBar
