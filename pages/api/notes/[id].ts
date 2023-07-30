import { NextApiHandler } from "next";
import prisma from "@/lib/prisma";

export const handle: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const data = await prisma.note.findUnique({
        where: {
          id: id as string,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });

      return res.json(data);
    } catch (error) {
      return res.json(error);
    }
  }
};
