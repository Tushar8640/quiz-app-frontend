import DashboardLayout from "@/layouts/Admin";
import { useGetQuizzesQuery } from "@/redux/features/quizes/quizeApi";
import Link from "next/link";
import React from "react";

export default function products() {
  const { data, isLoading } = useGetQuizzesQuery("");
  console.log(data);
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold font-serif">All Services:</h1>
      {/* <QuizzesTable /> */}

      {data?.data.map(
        (
          item: {
            id: any;
            title:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | React.PromiseLikeOfReactNode
              | null
              | undefined;
          },
          i: number
        ) => (
          <Link href={`quizzes/${item?.id}`}>
            <p className="font-bold text-2xl">
              {i + 1}: {item.title}
            </p>
          </Link>
        )
      )}
    </DashboardLayout>
  );
}
