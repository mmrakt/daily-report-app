const webpack = require('webpack')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

require('dotenv').config()
module.exports = withBundleAnalyzer({
    // dotenv
    webpack: (config) => {
        const env = Object.keys(process.env).reduce((acc, curr) => {
            acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
            return acc
        }, {})
        config.plugins.push(new webpack.DefinePlugin(env))
        return config
    },
    reactStrictMode: false,
})
