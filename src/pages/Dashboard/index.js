import React, {useState} from "react";
import { DashboardContainer } from "./Dashboard.styles";
import StockMonitoringForm from "../../components/StockMonitoringForm/StockMonitoringForm";
import { Typography } from "@mui/material";
import StockTable from "../../components/StockTable/StockTable";
import CustomSection from "../../components/CustomSection";

export default function Dashboard() {
  const [refreshStockList, setRefreshStockList] = useState(false)

  return (
    <DashboardContainer>
      <CustomSection gridArea='form'>
        <Typography
          style={{ color: "137DC5", margin: '2rem' }}
          variant="h3"
          component="h3"
        >
          Diversify Your Portfolio and Keep Tabs on Your Stocks.
        </Typography>
        <StockMonitoringForm setRefreshStockList={setRefreshStockList} />
      </CustomSection>

      <StockTable refreshStockList={refreshStockList} setRefreshStockList={setRefreshStockList} style={{ gridArea: "table" }} />
    </DashboardContainer>
  );
}
