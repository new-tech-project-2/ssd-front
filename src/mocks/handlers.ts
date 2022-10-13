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
    rest.get("/drinkers", async (req, res, ctx) => {
        const drinkers = [
            {
                id: "user1",
                capacity: 11,
                name: "술 잘먹는 심규진",
                detail: "심규진의 술잔 ㄹㅇ입니닫ㅇㅇㅇ",
            },
            {
                id: "user2",
                capacity: 10,
                name: "심규",
                detail: "왕",
            },
        ];
        return res(
            ctx.delay(1000),
            ctx.status(200),
            ctx.json({ drinkers: drinkers })
        );
    }),
];
