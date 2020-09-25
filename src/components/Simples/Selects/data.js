import colors from "../../../theme/colors";

export const customColors = {
  neutral0: colors.shadeDark,
  primary: colors.secondaryColor,
  primary75: `${colors.secondaryColor}BF`,
  primary50: `${colors.secondaryColor}7F`,
  primary25: `${colors.secondaryColor}3F`,
};

export const customStyles = {
  clearIndicator: (provided, state) => ({
    ...provided,
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#EBE6D9",
    borderWidth: 2,
    boxShadow: "none",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 10,
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none",
  }),
  menu: (provided, state) => ({
    ...provided,
    width: "94%",
    marginLeft: "3%",
    marginRight: "3%",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#FFFCF4" : "#2c2c2c",
    fontWeight: "bold",
    fontSize: "12px",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontWeight: "normal",
    fontSize: "12px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    fontWeight: "bold",
    fontSize: "12px",
  }),
};
