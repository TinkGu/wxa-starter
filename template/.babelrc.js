const env = [
    'env',
    {
        targets: {
            chrome: 35,
            opera: 42,
            edge: 12,
            firefox: 45,
            safari: 9,
            ie: 9,
            node: 'current'
        },
        useBuiltIns: true
    }
]

const presets = [env, 'stage-0']
const plugins = [
    'babel-plugin-transform-decorators-legacy',
    ['module-resolver', {
        root: ['./src'],
        extensions: ['', '.js', '.jsx', '.es', '.es6', '.mjs'],
        alias: {
            '@': './src'
        }
    }]
]

module.exports = {
    env: {
        development: {
            presets,
            plugins
        },
        production: {
            presets,
            plugins: plugins.concat(['transform-remove-console'])
        }
    }
}
