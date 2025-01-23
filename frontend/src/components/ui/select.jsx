import { Select } from "@chakra-ui/react";

const CustomSelect = ({ value, onChange, options, placeholder, ...props }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

export default CustomSelect;