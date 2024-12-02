import React from "react";

interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <div className="flex justify-center items-center p-3 gap-2 w-[107px] h-[35px] bg-button-light-bg-20 bg-button-light-secondary dark:bg-button-dark-bg dark:bg-button-dark-secondary bg-blend-overlay rounded-md">
      <span className="text-light-default dark:text-dark-default font-[Roobert Mono TRIAL] font-semibold text-[12px] leading-[90%] uppercase tracking-[0.03em] text-center">
        {label}
      </span>
    </div>
  );
};

export default Button;
