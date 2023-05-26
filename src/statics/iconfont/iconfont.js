import { createGlobalStyle } from 'styled-components'

export const GlobalStyleIcon = createGlobalStyle`
  @font-face {
    font-family: "iconfont";
    src: url('../../../public/iconfont.woff2?t=1683209369416') format('woff2'),
       url('../../../public/iconfont/iconfont.woff?t=1683209369416') format('woff'),
       url('../../../public/iconfont/iconfont.ttf?t=1683209369416') format('truetype');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`


