import { BsGearFill } from "react-icons/bs";
import { FaMeta, FaShopify } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { TbBrandGooglePhotos } from "react-icons/tb";
import Logo from "@/bin/Assets/BrandLogo";
import TopNavBar from "@/components/TopNavBar";
import BottomNavBar from "@/components/BottomNavBar";
import SideBarIcon from "@/components/SideBarIcon";

const SideBar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-20 flex flex-col bg-black shadow-lg z-50 pt-20 pb-20">
        <div className="flex flex-col flex-grow">
          <SideBarIcon icon={<TbBrandGooglePhotos size="32" className="text-dark-green" />} text="RetainIQ" />
          <SideBarIcon icon={<CiImageOn size="35" />} text="Image" />
          <SideBarIcon icon={<FaMeta size="28" />} text="Meta" />
          <SideBarIcon icon={<FaShopify size="28" />} text="Shopify" />
        </div>
        <div className="mt-auto mb-4">
          <SideBarIcon icon={<BsGearFill size="22" />} text="Settings" />
        </div>
      </div>

      <TopNavBar />
      <BottomNavBar />
    </>
  );
};







export default SideBar;
