import 'muse-ui/lib/styles/base.less'
import {
<<<<<<< HEAD
  AppBar,
  Avatar,
  Badge,
  Button,
  BottomNav,
  Chip,
  Divider,
  Drawer,
  Icon,
  List,
  Progress,
  Slider,
  Snackbar,
  Tabs,
  TextField
} from 'muse-ui'

const componets = [AppBar, Avatar, Badge, Button, BottomNav, Chip, Divider, Drawer, Icon, List, Progress, Slider, Snackbar, Tabs, TextField]

export default {
  // Vue.use(对象) 方法会调用对象的install方法并且将,Vue构造函数传入install函数内
  install(Vue) {
    componets.forEach(c => Vue.use(c))
  }
=======
    AppBar,
    Avatar,
    Badge,
    Button,
    BottomNav,
    Chip,
    Divider,
    Drawer,
    Icon,
    List,
    Slider,
    Snackbar,
    Tabs,
    TextField
} from 'muse-ui'

const componets = [AppBar, Avatar, Badge, Button, BottomNav, Chip, Divider, Drawer, Icon, List, Slider,Snackbar, Tabs, TextField]

export default {
    // Vue.use(对象) 方法会调用对象的install方法并且将,Vue构造函数传入install函数内
    install(Vue) {
        componets.forEach(c => Vue.use(c))
    }
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
}