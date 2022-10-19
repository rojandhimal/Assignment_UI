import React from 'react';
const Header = (props) => {
    const Component = props.rightComponent;
    return (
      <div className="flex flex-row justify-between mt-6">
        <div className="flex flex-row items-center">
          <div className="text-xl font-medium mr-4">{props.leftText}</div>
          {props.rightText && 
            <>
              |
              <div className="text-xl pl-4 text-black font-medium">
                {props.rightText}
              </div>
            </>
          }
        </div>
        {Component && <Component />}
      </div>
    );
  };
  
  export default Header;
  