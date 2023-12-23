import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/hooks";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import {
  useAddCategoryMutation,
  useAddQuestionsMutation,
  useAddQuizeMutation,
} from "@/redux/features/quizes/quizeApi";

const AddQuestionForm = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [addQuestion, { data, isError, isSuccess }] = useAddQuestionsMutation();

  const [addCategory] = useAddCategoryMutation();
  // Initialize state to hold form input values

  const [categoryTitle, setCategoryTitle] = useState("");

  const [title, setTitle] = useState("");

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addQuestion({
      question_text: title,
      quizId: "a9371801-247c-48b5-bd9e-21da5d4a9e0d",
      marks: 1,
    });
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
      Swal.fire("Congratulations!", `Service Added successfully!`, "success");
    }
  }, [isSuccess, isError, data, router]);

  return (
    <div className="w-10/12 mx-auto mt-4">
   
      <form
        onSubmit={handleSubmit}
        className="px-8 py-8 bg-gray-200 rounded my-4"
      >
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="title">Question: </label>
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
        </div>

        <div className="flex">
          <Button className="mt-2" type="submit">
            Add Question
          </Button>
        </div>
      </form>
  
    </div>
  );
};
export default AddQuestionForm;
