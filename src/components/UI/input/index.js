import React from 'react';
import { Fragment, useRef, useEffect } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import { Listbox, Transition } from "@headlessui/react";

import SearchBar from "./components/SearchBar";
import { getIn } from "formik";
import moment from "moment";

const useAutosizeTextArea = (textAreaRef, value) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

const getInput = (props) => {
  const { name, type, formik, options } = props;
  const inputProps = {
    ...props,
    ...formik.getFieldProps(name),
    error: getIn(formik.errors, name),
    touch: getIn(formik.touched, name),
  };

  switch (type) {
    case "number":
      return <Input {...inputProps} />;
    case "text":
      return <Input {...inputProps} />;
    case "password":
        return <Input {...inputProps} />;
        
    case "textarea":
      return <TextArea {...inputProps} />;
    case "select":
      return (
        <InputSelect
          {...inputProps}
          selected={options.find(
            (option) => option.value === inputProps.value
          )}
          {...(formik
            ? { onChange: formik.getFieldHelpers(name).setValue }
            : {})}
        />
      );
    case "date":
      return (
        <Input
          {...inputProps}
          value={
            inputProps.value && moment(inputProps.value).format("YYYY-MM-DD")
          }
        />
      );
    case "time":
      return <Input {...inputProps} />;
  }
};

const TextArea = (props) => {
  const {
    error,
    label,
    subLabel,
    name,
    onChange,
    placeholder,
    type,
    value,
    bottomLabel,
    variant,
    inputClassName,
    rows = 3,
    autoHeight,
  } = props;

  const textAreaRef = useRef(null);
  useAutosizeTextArea(textAreaRef.current, value || "");

  const inputProps = {
    name,
    onChange,
    placeholder,
    type,
    value: value || "",
    rows,
  };

  if (autoHeight) {
    inputProps.ref = textAreaRef;
  }

  const variants = {
    default: {
      container: "flex flex-col flex-grow",
      label: "block text-xs font-medium text-black",
      inputContainer: "mt-1",
      input:
        "focus:ring-0 focus:border-black block w-full sm:text-sm border-black rounded",
    },
    simpleRight: {
      container: "flex flex-col flex-grow",
      label: `flex flex-row text-xs font-medium text-black ${
        bottomLabel &&
        "order-2 font-bold pt-2 text-right uppercase w-full justify-end"
      }`,
      subLabel: `flex flex-column flex-1 text-left font-light`,
      inputContainer: "flex mt-1",
      input: `${inputClassName} w-full border-0 border-b border-black focus:border-black focus:ring-0 pl-0`,
    },
  };

  const classes = variants[variant] || variants.default;

  return (
    <div className={classes.container}>
      <label htmlFor={name} className={classes.label}>
        {subLabel && <span className={classes.subLabel}>{subLabel}</span>}
        <span>{label}</span>
      </label>
      <div className={classes.inputContainer}>
        <textarea {...inputProps} className={classes.input} />
      </div>
      <span className="text-red-600 text-sm">{error}</span>
    </div>
  );
};

const Input = (props) => {
  const {
    preIcon,
    label,
    labelleft,
    labelleftColor = "black",
    bottomLabel,
    rightLabel,
    name,
    onChange,
    placeholder,
    type,
    value,
    variant = "default",
    className,
    disabled = false,
    error = "",
    inputClassName = "",
  } = props;

  const variants = {
    default: {
      container: "flex flex-col flex-1",
      label: "block text-xs font-medium text-black",
      input: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`,
      inputContainer: "flex mt-1",
      errorMessage: "text-red-600 text-sm",
    }
  };
  const classes = variants[variant] || variants.default;

  const inputProps = {
    value: value || "",
    type,
    name,
    placeholder,
    className: classes.input,
    onChange,
    disabled,
  };

  return (
    <div className={`${classes.container} ${className}`}>
      <label htmlFor={name} className={classes.label}>
        {labelleft ? (
          <div className="flex justify-between">
            <div className={`text-${labelleftColor}`}>{labelleft}</div>
            <div>{label}</div>
          </div>
        ) : (
          <div
            className={`${
              rightLabel && "flex flex-row-reverse space-x-4 space-x-reverse"
            }`}
          >
            {label}
          </div>
        )}
      </label>
      <div className={`${bottomLabel && "order-1"} ${classes.inputContainer}`}>
        {preIcon && (
          <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-black text-white sm:text-sm">
            {preIcon}
          </span>
        )}
        <input {...inputProps} />
      </div>
      {error && <small className={classes.errorMessage}>{error}</small>}
    </div>
  );
};

const InputSelect = (props) => {
  const {
    disabled = false,
    error,
    selected,
    onChange,
    options = [],
    label,
    variant = "default",
    bottomLabel,
    placeholder,
    rightLabel,
    hideError = false,
  } = props || {};

  const variants = {
    default: {
      label: "block text-xs font-medium text-black ",
      field: "mt-1 relative",
      button:
        "bg-white relative w-full border border-black rounded pl-3 pr-10 py-2 text-left cursor-default sm:text-sm",
    }
  };

  const classes = variants[variant] || variants.default;

  return (
    <Listbox
      disabled={disabled}
      value={selected.value}
      onChange={onChange}
      className={classes.container}
    >
      {({ open }) => (
        <div className={`${bottomLabel && "flex flex-col"}`}>
          {error && !hideError && (
            <Listbox.Label
              className={`text-red-600 text-sm ${rightLabel && "text-left"}`}
            >
              {error}
            </Listbox.Label>
          )}
          <Listbox.Label
            className={`${classes.label} ${rightLabel && "text-right"}`}
          >
            {label}
          </Listbox.Label>
          <div className={classes.field}>
            <Listbox.Button className={classes.button}>
              <span className="block truncate">
                {selected.label || placeholder || "All"}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-black"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white max-h-60 rounded py-1 text-base border border-black overflow-auto focus:outline-none sm:text-sm min-w-fit">
                {options.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? "text-black bg-gray-100" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={item.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {item.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-black",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};


export { SearchBar, Input, getInput, InputSelect };
