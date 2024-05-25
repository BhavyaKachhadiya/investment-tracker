import Link from "next/link";

const Sidebar = () => {
  return (
  <>
  <div className="main-containter w-[15rem] h-screen bg-[#5C6470]">
    <ul>
        <li>
    <Link href={"/dashboard"}>Dashboard</Link>
        </li>
        <li>
    <Link href={"/dashboard/charts"}>Charts</Link>
        </li>
        <li>
    <Link href={"/dashboard/history"}>History</Link>
        </li>
    </ul>
  </div>
  </>
  );
};

export default Sidebar;
