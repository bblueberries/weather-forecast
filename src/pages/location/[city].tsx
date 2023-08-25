import { City } from "../../components/SearchBar";
import HourlyWeather from "../../components/HourlyWeather";
import SearchBar from "../../components/SearchBar";
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
    <div className=" xl:p-8">
      <div className="flex flex-col items-center bg-gray-100 min-h-screen rounded-xl">
        <SearchBar />
        <div className=" border border-black rounded w-11/12 xl:w-9/12 p-4 flex justify-between xl:px-16 xl:py-8 bg-white mt-10 xl:mt-20">
          <div>
            <p className=" font-extrabold text-xl xl:text-2xl">
              {locationData.name}
            </p>
            <p className=" font-semibold text-base xl:text-lg mt-2 ml-1 ">
              {todayWeather.day.maxtemp_c}°C&nbsp;&nbsp;
              <span className=" text-gray-500 text-sm">
                {todayWeather.day.mintemp_c}°C
              </span>
            </p>
            <div className="flex mt-10 font-light text-sm xl:font-normal">
              <div className="flex flex-col mr-2 ">
                <p>Sunrise</p>
                <p className=" text-gray-600 mt-1">
                  {todayWeather.astro.sunrise}
                </p>
              </div>
              <div className="flex flex-col ml-2">
                {" "}
                <p>Sunset</p>
                <p className="  text-gray-600 mt-1">
                  {todayWeather.astro.sunset}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center  justify-center">
            <img
              src={`https:${todayWeather.day.condition.icon}`}
              loading="lazy"
              className=" w-20"
            />
            <p className="text-sm xl:text-lg font-normal xl:font-semibold">
              {todayWeather.day.condition.text}
            </p>
          </div>
        </div>
        <HourlyWeather
          todayWeather={todayWeather}
          currentHourIndex={currentHourIndex}
        />
      </div>
    </div>
  );
}
