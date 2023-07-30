import React from "react";
import { NoteProps } from "../notes";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import PageLayout from "@/components/layouts/PageLayout";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const data = await prisma.note.findUnique({
    where: {
      id: params?.id as string,
    },
    include: {
      author: {
        select: {
          email: true,
        },
      },
    },
  });

  const note = {
    ...data,
    createdAt: data?.createdAt.toString(),
  };

  return {
    props: {
      note,
    },
  };
};

type DetailProps = {
  note: NoteProps;
};

const Detail: React.FC<DetailProps> = (props) => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/notes");
  };

  return (
    <PageLayout>
      <div className="flex flex-col">
        <button onClick={handleBack} className=" w-fit rounded-md text-lg">
          Back
        </button>
        <h1>{props.note.title}</h1>
        <p>{props.note.content}</p>
        <button
          onClick={() => router.push(`/notes/${props.note.id}/edit`)}
          className="bg-red-500 w-fit px-4 py-2 rounded-md"
        >
          Edit Note
        </button>
      </div>
    </PageLayout>
  );
};

export default Detail;
