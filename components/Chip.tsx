export default function Chip({
  className,
  text,
}: {
  className: string;
  text: string;
}) {
  return (
    <div
      className={`py-[3px] px-[15px] rounded-[15px] w-fit text-[10px] sm:text-sm ${className}`}
    >
      <p className="capitalize">{text}</p>
    </div>
  );
}
