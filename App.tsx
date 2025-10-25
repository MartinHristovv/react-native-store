import { QueryClientProvider } from "@tanstack/react-query";
import AppNavigator from "./navigation/AppNavigator";
import { queryClient } from "./api/client";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}
