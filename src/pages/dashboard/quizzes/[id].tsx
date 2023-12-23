import AddQuestionForm from "@/components/form/AddQuestionForm";
import {
  useAddAnswerMutation,
  useAddOptionsMutation,
  useAddQuestionsMutation,
  useGetSingleQuizeQuery,
} from "@/redux/features/quizes/quizeApi";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardLayout from "@/layouts/Admin";

export default function QuizDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useGetSingleQuizeQuery(id);
  console.log(data?.data);

  const [option, setOption] = useState("");

  const [addOption] = useAddOptionsMutation();

  const [addAnswer] = useAddAnswerMutation();

  const handleAddOptions = () => {
    addOption({
      option: "Hello world",
      questionId: "2fde25a1-b316-4666-8ed8-4583de192934",
    });
  };

  const handleAddAnswer = () => {
    addAnswer({
      answer: "Hello world",
      questionId: "2fde25a1-b316-4666-8ed8-4583de192934",
    });
  };

  let content;

  if (isLoading) {
    content = <p>...loading</p>;
  }
  if (!isLoading && isError) {
    content = <p>Something went wrong!</p>;
  }

  if (!isLoading && !isError && data?.data) {
    content = (
      <Accordion type="single" collapsible>
        {data?.data?.questions.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item?.question_text}</AccordionTrigger>
            <AccordionContent>
              <div className="my-2 ">
                <div>
                  {item?.options?.map((item) => (
                    <div className="flex items-center my-2 space-x-2">
                      <Checkbox
                        id="terms"
                        // checked={field.value}
                        onCheckedChange={() => handleAddAnswer(item?.option)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item?.option}
                      </label>
                    </div>
                  ))}
                </div>
                <p>Answer:</p>
                <div>
                  {item?.correct_answers?.map((item) => (
                    <div className="flex items-center my-2 space-x-2">
                  
                      <p
                        
                        className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item?.answer}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Add Option</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Option</DialogTitle>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="option" className="sr-only">
                            Option
                          </Label>
                          <Input
                            id="option"
                            value={option}
                            onChange={(e) => setOption(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <Button onClick={handleAddOptions} type="button">
                          Save
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-[900px] mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-3 font-serif">
          Add Question for {data?.data?.title}
        </h1>
        <AddQuestionForm />
        <div className="w-[700px] mx-auto"></div>
        {content}
      </div>
    </DashboardLayout>
  );
}
