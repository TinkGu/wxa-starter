# {{ name }}

> {{ description }}

# Build Setup

```bash
npm i

# development
npm start

# production
npm run build
```

# NOTE

支持类似 webpack alias 的功能

```javascript
// 仅支持 .js 文件
import '@/a.js'

// 相当于
import '.../src/a.js'
```

```less
@import "@_/theme.less";

// 相当于
@import "...src/style/theme.less";
```
