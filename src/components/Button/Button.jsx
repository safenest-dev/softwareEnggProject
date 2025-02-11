const Button = ({ children, disabled, onClick, style }) => (
    <button type='submit' disabled={disabled} onClick={onClick} style={style}>
      {children}
    </button>
  );
  
  export default Button;
  