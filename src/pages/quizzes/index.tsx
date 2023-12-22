
import PrivateLayout from "@/layouts/PrivateLayout";
import { useGetQuizzesQuery } from "@/redux/features/quizes/quizeApi";

export default function index() {
  const { data } = useGetQuizzesQuery("");

  console.log(data);

  return (
    <PrivateLayout>
      <div className="w-10/12 mx-auto ">
        <h1 className="text-3xl font-serif font-semibold mt-4">
          All Services:
        </h1>
        <div className="grid grid-cols-4 mt-6 gap-6"></div>
      </div>
    </PrivateLayout>
  );
}
