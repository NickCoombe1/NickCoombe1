import React from "react";
import { Button } from "@headlessui/react";

interface ButtonProps {
  label: string;
  secondary?: boolean;
  children?: React.ReactNode;
  type: "button" | "submit" | "reset";
}

const StyledButton: React.FC<ButtonProps> = ({ label, secondary, type }) => {
  if (secondary) {
    return (
      <Button type={type}>
        <div className="flex justify-center items-center p-3 gap-2 w-[107px] h-[35px] bg-button-light-bg-20 bg-button-light-secondary dark:bg-button-dark-bg dark:bg-button-light-secondary bg-blend-overlay rounded-md">
          <span className="text-light-default dark:text-dark-default font-roobertMono text-xs leading-[90%] uppercase tracking-tight text-center">
            {label}
          </span>
        </div>
      </Button>
    );
  }
  return (
    <Button type={type}>
      <div className="flex justify-center items-center p-3 gap-2 w-[107px] h-[35px] bg-white bg-button-light-secondary dark:bg-button-dark-bg dark:bg-button-dark-secondary bg-blend-overlay rounded-md">
        <span className="text-light-default dark:text-dark-default font-roobertMono text-xs leading-[90%] uppercase tracking-tight text-center">
          {label}
        </span>
      </div>{" "}
    </Button>
  );
};

export default StyledButton;
