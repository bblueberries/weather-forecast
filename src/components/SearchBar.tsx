import { useState } from "react";
import cities from "../lib/city.list.json";
import Link from "next/link";

export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}
interface cityData {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
  slug: string;
}
type Props = {};
export default function SearchBar({}: Props) {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<cityData[]>([]);
  const cities: City[] = require("../lib/city.list.json");

  const HandleChange = (e: any) => {
    const typing = e.target.value;
    setValue(typing);

    const matchingCities = [];

    if (typing.length >= 3) {
      for (let city of cities) {
        if (matchingCities.length >= 5) break;

        const matching = city.name
          .toLowerCase()
          .startsWith(typing.toLowerCase());

        if (matching) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };
          matchingCities.push(cityData);
        }
      }
      // console.log(matchingCities);
      return setResults(matchingCities);
    }
  };

  return (
    <div className="flex flex-col item-center justify-center w-3/12">
      <span className="text-center font-medium">SEARCH YOUR CITY HERE</span>
      <div className="group mt-3 relative w-full">
        <input
          type="text"
          className="relative p-2 w-full border border-blue-300 rounded-md text-lg font-light shadow-sm shadow-blue-300 group-hover:border-blue-400 focus:outline-none 
          sm:w-full"
          value={value}
          onChange={HandleChange}
        />

        {value.length >= 3 && (
          <ul className="absolute px-2 py-1 rounded border border-blue-300 mt-3 w-full shadow-sm shadow-blue-300 bg-white group-hover:border-blue-400">
            {results.length > 0 ? (
              results.map((city) => (
                <li
                  key={city.id}
                  className="bg-white font-light border-b p-2 last:border-none hover:bg-slate-100 hover:rounded-lg"
                >
                  <Link href={`/location/${city.slug}`}>
                    {city.name}
                    {city.state ? `, ${city.state}` : ""}
                    &nbsp;({city.country})
                  </Link>
                </li>
              ))
            ) : (
              <li className="font-light text-pink-300 py-2">
                CAN NOT FIND YOUR CITY
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
