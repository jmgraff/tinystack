import Layout from "@/components/Layout.js";

import { wrapper } from "@/store/store.js";

function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default wrapper.withRedux(App);
