import { rest } from "msw";
export const handlers = [
    rest.post("/auth", async (req, res, ctx) => {
        const data = await req.json();
        return res(
            ctx.delay(),
            ctx.status(200),
            ctx.json({ success: data.token.length > 3 })
        );
    }),
];
