import ServiceDetailsCard from "@/components/card/ServiceDetailsCard";
import EditServiceForm from "@/components/form/EditServiceForm";
import MainLayout from "@/layouts/MainLayout";
import { useGetSingleServiceQuery } from "@/redux/features/quizes/quizeApi";
import { useRouter } from "next/router";
import React from "react";

export default function ServiceDetails() {
  const router = useRouter();

  return (
    <MainLayout>
      <ServiceDetailsCard />
    </MainLayout>
  );
}
