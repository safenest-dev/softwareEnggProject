const Dropdown = ({ label, name, value, options, onChange, style }) => {
    return (
      <div style={style.inputGroup}>
        <label style={style.label}>{label}</label>
        <select name={name} value={value} onChange={onChange} style={style.select}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Dropdown;
  