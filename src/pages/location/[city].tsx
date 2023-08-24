import { City } from "../../components/SearchBar";
import HourlyWeather from "../../components/HourlyWeather";

type Props = {
  thisCity: City;
  todayWeather: any;
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

  console.log(data.forecast.forecastday[0]);

  return {
    props: {
      todayWeather: data.forecast.forecastday[0],
      locationData: data.location,
    },
  };
}

export default function Page({ todayWeather, locationData }: Props) {
  const currentLocalHour = locationData.localtime
    .split(" ")
    .pop()
    .split(":")[0];

  const currentHourIndex = todayWeather.hour.findIndex(
    //use to show hourly weather only from current time
    (hourData: any) =>
      parseInt(currentLocalHour) <=
      parseInt(hourData.time.split(" ").pop().split(":")[0])
  );

  return (
    <>
      <div className="flex flex-col items-center ">
        <p className="mt-3 text-3xl">
          This is <span className=" text-red-600">{locationData.name}</span>{" "}
          page
        </p>
        <br />

        <HourlyWeather
          todayWeather={todayWeather}
          currentHourIndex={currentHourIndex}
        />
      </div>
    </>
  );
}
