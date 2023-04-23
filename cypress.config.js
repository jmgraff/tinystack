const { defineConfig } = require('cypress')

module.exports = defineConfig({
    retries: {
        runMode: 1,
    },
    e2e: {
        baseUrl: `${process.env.PROTO}://${process.env.HOST}`,
        chromeWebSecurity: false,
        experimentalMemoryManagement: true,
        defaultCommandTimeout: 5000,
    }
});
