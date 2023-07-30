import { NextApiHandler } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]";

const handle: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, options);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    const data = await prisma.note.findMany({
      where: {
        author: {
          email: session?.user?.email,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    const notes = data.map((note) => ({
      ...note,
      createdAt: note.createdAt.toString(),
    }));

    res.json(notes);
  }

  if (req.method === "POST") {
    const { title, content } = req.body;
    const result = await prisma.note.create({
      data: {
        title,
        content,
        author: {
          connect: {
            email: session?.user?.email as string,
          },
        },
      },
    });

    res.json(result);
  }
};

export default handle;
