import SearchBar from "../components/SearchBar";
import Image from "next/image";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="">
      <div className="flex items-center flex-col mt-10">
        <SearchBar />
      </div>
    </div>
  );
}
