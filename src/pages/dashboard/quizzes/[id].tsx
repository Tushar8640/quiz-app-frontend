import AddQuestionForm from "@/components/form/AddQuestionForm";
import { useGetSingleQuizeQuery } from "@/redux/features/quizes/quizeApi";
import { useRouter } from "next/router";
import React from "react";

export default function QuizDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetSingleQuizeQuery(id);
  console.log(data);
  return (
    <div>
      <AddQuestionForm />
    </div>
  );
}
