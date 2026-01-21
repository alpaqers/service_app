export function Button(props) {
  return (
    <a
      href={props.href}
      className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2"
    >
      {props.text}
      {props.icon && <span>{props.icon}</span>}
    </a>
  );
}
