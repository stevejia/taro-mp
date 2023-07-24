import { createApp } from 'vue'
import './app.scss'
import { Picker, Form, FormItem, Input, Popup, Cell } from '@nutui/nutui-taro';

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
}).use(Picker).use(Form).use(FormItem).use(Input).use(Popup).use(Cell);

export default App
