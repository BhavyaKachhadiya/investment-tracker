import Link from "next/link";
import InfoMainCard from "./InfoMainCard";
import InvestmentCard from "./InvestmentCard";

const MainDashboard = () => {
  return (
    <>
      <div className="main-container">
        <div className="flex justify-end">
        <Link href={"/dashboard/addinvestment"} className="font-semibold py-[.5rem] px-[.5rem] bg-[#5C6470] border-0 rounded-xl">Add Investment</Link>

        </div>
        <h3 className="font-semibold mb-[2rem]">Dashboard</h3>
        <InfoMainCard
          firstlabel="Investment Goal"
          firstvalue={3000}
          secondlabel="Current Investment"
          secondvalue={5000}
          thirdlabel="Investment to Acheive Goal"
          thirdvalue={455}
        />
        <InfoMainCard
          firstlabel="Large cap"
          firstvalue={3000}
          secondlabel="Mid cap"
          secondvalue={5000}
          thirdlabel="Small cap"
          thirdvalue={455}
        />
        <div className="flex justify-between">
          <h3 className="investtype">Stock</h3>
          <h3 className="see-all">See All</h3>
        </div>
        <InvestmentCard
          InvestType="Stock"
          Symbol="Tata Steel"
          TotalInvestment={300}
          BuyAtPrice={43}
          Quantity={45}
          Avg={5}
        />
      </div>
    </>
  );
};

export default MainDashboard;
