import Layout from "@/components/Layout.js";
import { Provider } from "react-redux";

import { wrapper } from "@/store/store.js";

function App({ Component, ...rest }) {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Layout>
                <Component {...props.pageProps} />
            </Layout>
        </Provider>
    );
}

export default wrapper.withRedux(App);
