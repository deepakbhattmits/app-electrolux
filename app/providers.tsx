"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import ToastProvider from "./components/ToastProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ToastProvider>{children}</ToastProvider>
        </Provider>
    );
}
