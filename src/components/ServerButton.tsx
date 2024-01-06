import { FC, ComponentPropsWithoutRef } from "react";

type ServerButtonProps = {
  action: () => void;
  reset?: boolean;
} & ComponentPropsWithoutRef<"button">;

const ServerButton: FC<ServerButtonProps> = (props) => {
  return (
    <form action={props.action}>
      <button className={props.reset ? props.className : "bg-[#3498db] btn"}>
        {props.children}
      </button>
    </form>
  );
};

export default ServerButton;
