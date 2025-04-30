import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    annee: null,
    academy: null,
    departement: null,
    commune: null,
    region: null,
    status_institution: null,
    etablissement: null,
    formation_selectivity: null,
    formation: null,
    repartition_geo_sector: null,
    formation_searched: null,
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
