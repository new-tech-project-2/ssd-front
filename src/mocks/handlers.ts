import { rest } from "msw";
export const handlers = [
    rest.post("/auth", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ success: req.params["token"].length > 3 })
        );
    }),
];
