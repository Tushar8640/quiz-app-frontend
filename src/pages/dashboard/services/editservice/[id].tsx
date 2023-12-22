import EditServiceForm from "@/components/form/EditServiceForm";
import EditProductForm from "@/components/form/EditServiceForm";
import DashboardLayout from "@/layouts/Admin";
import {useGetSingleServiceQuery} from "@/redux/features/services/serviceApi";
import {useRouter} from "next/router";
import React from "react";

export default function editservice() {
  const router = useRouter();
  const {id} = router.query;
  const {data, isLoading, isError} = useGetSingleServiceQuery(id);
  return isLoading ? (
    <h1 className="text-4xl m-3 font-bold">Loading....</h1>
  ) : (
    <DashboardLayout>
      <EditServiceForm service={data?.data} />
    </DashboardLayout>
  );
}
