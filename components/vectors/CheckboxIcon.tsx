export default function CheckboxIcon({ color }: { color?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="md:size-[16.88px] size-[14.78px] xl:size-6 shrink-0"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
        fill={color || "#FF8C2F"}
      />
      <path
        d="M7.5 11.4706L10.8333 15L16.5 9"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
