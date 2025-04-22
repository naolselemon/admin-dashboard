import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
// import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
// import PageMeta from "../../components/common/PageMeta";

import { useEffect } from "react";
import { useNavigate } from "react-router";

import { account } from "../../appwrite/config";


export default function Home() {
  const navigate   =  useNavigate();
  
  useEffect(() => {
    const checkAuth = async() => {
      try {
       const user =  await account.get()
       if (!( user).labels.includes("admin")){
        throw new Error("Unauthorized: Admin access required");
       }
       
      }catch(error){
        console.error("Auth check failed:", error);
        navigate("/signin");
      }
    }
    checkAuth();
  }, [navigate])
  return (
    <>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
          
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

      </div>
    </>
  );
}
