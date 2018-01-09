// 总是添加一个 .eslintignore
// 来使得某些编辑器（ 如 atom、sublime ）使用下项目下的 eslint dep 的而非全局的 dep

// eslint rules 中
// 0: 'off', 关闭规则
// 1: 'warn', 匹配到不符合规则时，lint cli 仅提示
// 2: 'error', 匹配到不符合规则时，lint cli 退出，可能导致无法提交代码

// 使用 eslint-disable-next-line 进行单例违法
module.exports = {
    extends: ['airbnb-base', 'loose-airbnb'],
    plugins: ['import'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2017,
        ecmaFeatures: {
            classes: true,
            modules: true,
            jsx: true,
        },
    },
    rules: {
        semi: [1, 'never'],
        'import/no-extraneous-dependencies': ['error', {
            'devDependencies': [
                'gulpfile.js'
            ]
        }]
    },
    globals: {
        App: true,
        Page: true,
        Component: true,
        wx: true,
    }
}
