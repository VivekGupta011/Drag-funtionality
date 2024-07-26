const SideBarIcon = ({ icon, text }: any) => (
    <div className="sidebar-icon group text-gray-400">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );

  export default SideBarIcon;