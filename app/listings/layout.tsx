import { Header } from "@/components/common/header";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const ListingsLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ListingsLayout;
