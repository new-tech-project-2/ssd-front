import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { useRecoilValue } from "recoil";
import authTokenState from "./common/recoil/authTokenAtom";
import { authenticRouter, needAuthRotuer } from "./routes/router";

const queryClient = new QueryClient();
function App() {
    const authToken = useRecoilValue(authTokenState);
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider
                router={authToken.length > 1 ? authenticRouter : needAuthRotuer}
            />
        </QueryClientProvider>
    );
}
export default App;
