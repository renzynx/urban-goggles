"use client";
import { Menu, Transition } from "@headlessui/react";
import { UserResponse } from "@supabase/supabase-js";
import {
  IconBook,
  IconBookmark,
  IconHistory,
  IconHome,
  IconUser,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: <IconHome /> },
  { href: "/history", label: "History", icon: <IconHistory /> },
  { href: "/bookmarks", label: "Bookmarks", icon: <IconBookmark /> },
  { href: "/account-settings", label: "Account Settings", icon: <IconUser /> },
  { href: "/manage-comics", label: "Manage Comics", icon: <IconBook /> },
];

const AccountMenu = ({
  user,
  signOut,
}: {
  user: UserResponse["data"]["user"];
  signOut: JSX.Element;
}) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return user ? (
    <Menu className="relative inline-block text-left z-[9999]" as="div">
      <Menu.Button>
        <img
          src={
            user.user_metadata.picture ??
            `https://api.dicebear.com/7.x/identicon/svg?seed=${
              user.user_metadata.username ||
              user.user_metadata.full_name ||
              user.email?.split("@")[0] ||
              "N/A"
            }`
          }
          alt="avatar"
          className="w-[38px] h-[38px] rounded-full border border-black/10 dark:border-white/10"
        />
      </Menu.Button>
      <Transition
        as="div"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute border dark:bg-[#0A0A0A] border-white/10 dark:bg-opacity-20 p-3 backdrop-blur backdrop-filter focus-visible:outline-none focus-visible:ring right-0 mt-2 w-56 origin-top-right rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="relative px-3 py-2">
            <p className="text-black dark:text-white font-bold">
              {user.user_metadata.username ||
                user.user_metadata.full_name ||
                user.email?.split("@")[0]}
            </p>
            <p className="text-sm dark:text-gray-400 text-zinc-600">
              {user.email}
            </p>
          </div>

          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent my-2" />

          {links.map((link) => (
            <Menu.Item
              as="a"
              key={link.href}
              href={link.href}
              disabled={isActive(link.href)}
              className="disabled:bg-white/10 px-3 disabled:dark:bg-zinc-900/50 disabled:text-gray-500 text-black dark:text-white hover:bg-zinc-100 hover:text-black/80 dark:hover:bg-zinc-900/50 dark:hover:text-gray-300 relative flex items-center rounded-md py-3 text-sm font-medium"
            >
              <span className="mr-4 inline-block">{link.icon}</span>
              {link.label}
            </Menu.Item>
          ))}

          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent my-2" />

          <Menu.Item as="div" className="relative block pt-2">
            <div className="px-3 py-2 w-full cursor-pointer hover:bg-opacity-80 bg-black text-white dark:bg-white dark:text-black rounded-md font-medium flex items-center justify-center">
              {signOut}
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  ) : (
    <div></div>
  );
};

export default AccountMenu;
