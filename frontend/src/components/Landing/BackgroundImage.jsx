export function BackgroundImage({ src }) {
  return (
    <img
      src={src}
      className="w-full h-24 object-cover overflow-center"
      alt=""
    />
  );
}