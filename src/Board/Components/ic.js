export default function ic(props) {
  return (
    <span className='material-icons' style={props.style}>
      {props.children}
    </span>
  );
}
