import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import PageLayout from "@/components/layouts/PageLayout";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useMutation } from "@tanstack/react-query";

const Create = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [status, session, router]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationKey: ["createNote"],
    mutationFn: () => {
      return fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      setNote({
        title: "",
        content: "",
      });
      router.push("/notes");
    }
  }, [isSuccess, router]);

  return (
    <PageLayout>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" className="text-white" value="Your email" />
          </div>
          <TextInput
            id="title"
            name="title"
            placeholder="Mancing"
            required
            type="text"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="content"
              className="text-white"
              value="What you think"
            />
          </div>
          <Textarea
            id="content"
            name="content"
            required
            onChange={handleOnChange}
          />
        </div>
        <Button type="submit">
          {isLoading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Submit
        </Button>
      </form>
    </PageLayout>
  );
};

export default Create;
