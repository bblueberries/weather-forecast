import { City } from "../../components/SearchBar";

type Props = {
  thisCity: City;
  today: object;
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
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${foundCity.coord.lat},${foundCity.coord.lon}&days=3&aqi=no&alerts=no`
    // `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${foundCity.coord.lat},${foundCity.coord.lon}&days=3&aqi=no&alerts=no`
  );
  const data = await response.json();
  // console.log(`${process.env.API_KEY}`);

  if (!data) {
    return {
      notFound: true,
    };
  }

  // console.log(data.forecast);

  return {
    props: {
      thisCity: foundCity,
      today: data.forecast.forecastday[0],
    },
  };
}

export default function Page({ thisCity, today }: Props) {
  console.log(today);

  return (
    <>
      <div>
        This is {thisCity.coord.lat}, {thisCity.coord.lon}the page <br /> right
      </div>
    </>
  );
}
