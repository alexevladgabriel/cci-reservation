import { z } from "zod";
import { createRouter } from "./context";
// import { z } from "zod";

export const locationRouter = createRouter()
    .query("get-all", {
        async resolve({ ctx }) {
            return await ctx.prisma.location.findMany();
        },
    })
    .mutation("create-location", {
        input: z.object({
            name: z.string(),
            description: z.string(),
            street: z.string(),
            city: z.string(),
            postal_code: z.string().nullish(),
        }),
        async resolve({ ctx, input }) {
            const location = await ctx.prisma.location.create({
                data: {
                    name: input.name,
                    description: input.description,
                    street: input.street,
                    city: input.city,
                    postal_code: input.postal_code ?? "",
                },
            });

            return { success: true, location };
        },
    });
