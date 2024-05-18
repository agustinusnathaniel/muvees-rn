import Reactotron, { networking, openInEditor } from 'reactotron-react-native';

Reactotron.configure()
  .useReactNative()
  .use(networking())
  .use(openInEditor())
  .connect();
