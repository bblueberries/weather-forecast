import SearchBar from "../components/SearchBar";
import Image from "next/image";

type Props = {
  apiKey: string;
};

export default function Page({}: Props) {
  //  console.log(apiKey);

  return (
    <div className="">
      <div className="flex items-center flex-col mt-10">
        <SearchBar />
      </div>
    </div>
  );
}
