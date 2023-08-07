import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { City } from "../../components/SearchBar";

export default function page() {
  const router = useRouter();
  const cities: City[] = require("../../lib/city.list.json");
  const [thisCity, setThisCity] = useState<City | null>(null);

  useEffect(() => {
    const { city } = router.query;
    if (!city) return;
    if (typeof city !== "string") return;

    const id = city.split("-").pop() || "";
    const foundCity = cities.find((city) => city.id.toString() == id);

    if (foundCity) setThisCity(foundCity);
  }, [router]);

  return <div>This is {thisCity?.name} the page</div>;
}
