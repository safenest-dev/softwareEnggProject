
const Input = ({ label, name, value, type, min, max, onChange, style }) => (
  <div style={style.inputGroup}>
    <label style={style.label}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      style={style.input}
    />
  </div>
);

export default Input;
