import { IService } from "@/interfaces/service";

import ServiceCard from "../card/ServiceCard";

const AvailableService = () => {
  return (
    <section className="mx-auto p-6 ">
      <h1 className="text-3xl font-serif my-3 font-semibold text-center mb-4">
        Our Available Services
      </h1>
      {/* <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">{data?.data?.map((service: IService, i: number) => service?.status === "available" && <ServiceCard service={service} />)}</div> */}
    </section>
  );
};

export default AvailableService;
