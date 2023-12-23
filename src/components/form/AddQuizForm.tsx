import {
  ChangeEvent,
  FormEvent,
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/hooks";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import {
  useAddCategoryMutation,
  useAddQuizeMutation,
  useGetAllCategoryQuery,
} from "@/redux/features/quizes/quizeApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddQuizForm = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data: categoryData } = useGetAllCategoryQuery(undefined);

  const [addQuiz, { data, isError, isSuccess }] = useAddQuizeMutation();

  const [addCategory] = useAddCategoryMutation();
  // Initialize state to hold form input values

  const [categoryTitle, setCategoryTitle] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [title, setTitle] = useState("");

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addQuiz({ title, categoryId });
  };

  const handleCatSubmit = (e: FormEvent) => {
    e.preventDefault();
    addCategory({
      title: categoryTitle,
    });
  };

  //showing success or error message
  const router = useRouter();
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `Quiz Added successfully!`, "success");
      router.push("/dashboard/quizzes");
    }
  }, [isSuccess, isError, data, router]);

  console.log(categoryData);
  return (
    <div className="w-10/12 mx-auto mt-4">
      <h1 className="text-3xl font-semibold text-center mb-3 font-serif">
        Add Category
      </h1>
      <form
        onSubmit={handleCatSubmit}
        className="px-8 py-8 bg-gray-200 rounded my-4"
      >
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              id="title"
              name="title"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              required
              className="rounded"
            />
          </div>
        </div>

        <div className="flex">
          <Button className="mt-2" type="submit">
            Add Category
          </Button>
        </div>
      </form>
      <h1 className="text-3xl font-semibold text-center mb-3 font-serif">
        Add Quiz
      </h1>
      <form onSubmit={handleSubmit} className="px-8 py-8 bg-gray-200 rounded">
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category">Category</label>

            <Select onValueChange={(value) => setCategoryId(value)}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>

                  {categoryData?.data.map(
                    (item: {
                      id: Key | null | undefined;
                      title:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | PromiseLikeOfReactNode
                        | null
                        | undefined;
                    }) => (
                      <SelectItem key={item.id} value={item.id as string}>
                        {item.title}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex">
          <Button className="mt-2" type="submit">
            Add Quiz
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddQuizForm;
