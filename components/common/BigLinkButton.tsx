import Link from 'next/link';

interface BigLinkButtonProps {
  to: string;
  children: React.ReactNode;
  buttonStyle?: string;
}
const BigLinkButton = ({ to, children, buttonStyle }: BigLinkButtonProps) => {
  return (
    <Link
      href={to}
      className={`${buttonStyle} rounded h-[56px] w-[343px] inline-flex items-center justify-center`}
    >
      {children}
    </Link>
  );
};

export default BigLinkButton;
