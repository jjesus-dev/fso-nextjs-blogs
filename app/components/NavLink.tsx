import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className="hover:bg-blue-400 hover:text-gray-900 hover:rounded px-2"
    >
      {children}
    </Link>
  );
};

export default NavLink;
