import LeftSidebar from "./LeftSideBar";
import RightSidebar from "./RightSideBar";
import MobileNavBar from "./MobileNavBar";

import { ScrollArea } from "../ui/scroll-area";

export default async function BaseComponent({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 w-full flex justify-center items-center min-h-screen">
      <div className="flex w-full max-w-7xl justify-center">
        <LeftSidebar />
        <ScrollArea className="h-screen w-full lg:w-2/4 md:w-3/4 lg:px-8 lg:py-4 xl:px-12  md:p-6">
          <MobileNavBar />
          {children}
        </ScrollArea>
        <RightSidebar />
      </div>
    </div>
  );
}
