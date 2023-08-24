import React from "react";

type HourData = {
  time: string;
  condition: {
    icon: string;
  };
  temp_c: number;
};

type Props = {
  todayWeather: {
    hour: HourData[];
  };
  currentHourIndex: number;
};

export default function HourlyWeather({
  todayWeather,
  currentHourIndex,
}: Props) {
  return (
    <>
      <p className="mt-32 font-bold text-xl">HOURLY WEATHER</p>
      <div className="flex border border-black overflow-x-auto whitespace-nowrap mt-2 mx-20 p-6 w-7/12 rounded">
        {todayWeather.hour
          .slice(currentHourIndex)
          .map((hourData: HourData, index: number) => (
            <div
              key={index}
              className="border-2 border-gray-300 mx-3 py-4 px-7 rounded flex flex-col items-center "
            >
              <p className="font-bold mb-2">{hourData.time.split(" ").pop()}</p>
              <img
                src={`https:${hourData.condition.icon}`}
                alt="Weather icon"
                loading="lazy"
              />
              <p className="text-sm mt-2">{hourData.temp_c}°C</p>
            </div>
          ))}
      </div>
    </>
  );
}
