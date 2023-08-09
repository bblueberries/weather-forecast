import { log } from "util";
import { City } from "../../components/SearchBar";

type Props = {
  thisCity: City;
};

export async function getServerSideProps(context: any) {
  const cities: City[] = require("../../lib/city.list.json");
  const city = context.query.city;

  if (!city || typeof city !== "string") {
    return {
      notFound: true,
    };
  }

  const id = city.split("-").pop() || "";
  const foundCity = cities.find((city) => city.id.toString() === id);

  if (!foundCity) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${process.env.API_KEY}`
  );
  const data = await response.json();
  // console.log(`${process.env.API_KEY}`);

  if (!data) {
    return {
      notFound: true,
    };
  }

  console.log(data);

  return {
    props: {
      thisCity: foundCity,
    },
  };
}

export default function Page({ thisCity }: Props) {
  return <div>This is {thisCity.name} the page</div>;
}
