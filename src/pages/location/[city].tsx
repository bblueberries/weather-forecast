import { Container } from "postcss";
import { City } from "../../components/SearchBar";
import Image from "next/image";

type Props = {
  thisCity: City;
  today: any;
  locationData: any;
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

  console.log(data.location.localtime);

  return {
    props: {
      thisCity: foundCity,
      today: data.forecast.forecastday[0],
      locationData: data.location,
    },
  };
}

export default function Page({ thisCity, today, locationData }: Props) {
  const currentLocalHour = locationData.localtime
    .split(" ")
    .pop()
    .split(":")[0];

  const currentHourIndex = today.hour.findIndex(
    (hourData: any) =>
      parseInt(currentLocalHour) <=
      parseInt(hourData.time.split(" ").pop().split(":")[0])
  );
  console.log(today.hour);

  return (
    <>
      <div className="flex flex-col items-center">
        This is {thisCity.coord.lat}, {thisCity.coord.lon} the page <br />
        <div className=" flex border border-black overflow-x-auto whitespace-nowrap mt-32 mx-20 p-6 w-9/12">
          {today.hour
            .slice(currentHourIndex)
            .map((hourData: any, index: number) => (
              <div
                key={index}
                className="border border-red-600 mx-3 p-2 rounded flex flex-col items-center"
              >
                <p>{hourData.time.split(" ").pop()}</p>
                <img
                  src={`https:${hourData.condition.icon}`}
                  alt="hello"
                  loading="lazy"
                />
              </div>
            ))}
        </div>{" "}
      </div>
    </>
  );
}
