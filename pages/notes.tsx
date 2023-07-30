import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import PageLayout from "@/components/layouts/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import Link from "next/link";

export type NoteProps = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    email: string;
  };
};

const Notes = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery<NoteProps[]>(["notes"], () =>
    fetch("/api/notes").then((res) => res.json())
  );

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [status, session, router]);

  return (
    <PageLayout>
      <div className="mt-5">
        <Button className="mb-5" onClick={() => router.push("/create")}>
          + create note
        </Button>
        {isLoading ? (
          "loading notes..."
        ) : (
          <>
            {session && notes?.length === 0 && (
              <div className="text-center">
                <h1 className="text-3xl font-semibold">No notes found</h1>
                <button
                  className="bg-blue-500 px-4 py-3 rounded-lg mt-3 text-white"
                  onClick={() => router.push("/create")}
                >
                  Create Note
                </button>
              </div>
            )}
            <div className="grid grid-cols-3 gap-3">
              {session &&
                notes?.map((note: NoteProps) => (
                  <Link key={note.id} href={`/note/${note.id}`}>
                    <div className="bg-slate-200 text-black p-4 rounded-lg min-h-[200px] relative">
                      <h1 className="text-3xl font-semibold">{note.title}</h1>
                      <p className="mt-3 text-lg">{note.content}</p>
                      <small className="absolute bottom-5 right-5">
                        {new Date(note.createdAt).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </small>
                    </div>
                  </Link>
                ))}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default Notes;
