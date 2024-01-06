import Link from "next/link";

const navLinks = [
  { name: "Comics", href: "/manage-comics" },
  { name: "Upload Chapter", href: "/upload-chapter" },
  { name: "Create Team", href: "/create-team" },
];

const ManagerNavbar = () => {
  return (
    <>
      <div className="w-screen p-4 border-b border-b-foreground/10 duration-300 transition-colors">
        <div className="flex mx-10">
          {navLinks.map((link) => (
            <Link
              className="mr-6 text-sm font-medium px-6 py-2 rounded-md hover:bg-zinc-200 hover:text-black dark:hover:bg-[#A1A1A1] dark:hover:bg-opacity-20 dark:hover:text-white"
              href={link.href}
              key={link.name}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManagerNavbar;
