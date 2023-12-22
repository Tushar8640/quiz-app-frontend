import {useEffect} from "react";
import Swal from "sweetalert2";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "../ui/button";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {useDeleteServiceMutation} from "@/redux/features/services/serviceApi";

//
export type TableProps = {
  id: string;
};
const TableAction = ({id}: TableProps) => {
  //delete service
  const [deleteService, {data: deleteData, isSuccess, isError}] = useDeleteServiceMutation();
  const handleDeleteService = (id: string) => {
    Swal.fire({
      title: "Do you want to delete this service?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteService(id);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  //showing success or error message on delete
  useEffect(() => {
    if (deleteData?.success && isSuccess) {
      Swal.fire("Great!", "Service deleted successfully!", "success");
    } else if (!deleteData?.success && isError) {
      Swal.fire("Oops!", `Something went wrong`, "error");
    }
  }, [deleteData, isError, isSuccess]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem>
          <Link href={`/dashboard/services/editservice/${id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDeleteService(id)}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableAction;
