import { useState } from "react";
import DealsHeader from "../Features/Deals/DealsHeader";
import DealsFilter from "../Features/Deals/DealsFilter";
import { useDeals } from "../Features/Deals/useDeals";
import DealsList from "../Features/Deals/DealsList";

const Deals = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const { isLoadingDeals, deals, error } = useDeals({
    minPrice,
    maxPrice,
    selectedSkills: selectedSkill,
  });

  return (
    <>
      <DealsHeader />
      <DealsFilter
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
      />
      {isLoadingDeals && (
        <p style={{ padding: "20px", color: "#efeabb", fontSize: "20px" }}>
          Loading deals...
        </p>
      )}

      {error && (
        <p style={{ padding: "16px", color: "#ffb4b4" }}>
          Error loading deals.
        </p>
      )}
      {!isLoadingDeals && !error && <DealsList deals={deals} />}
    </>
  );
};

export default Deals;
