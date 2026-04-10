import type { ViewProps } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

type AnimatedViewProps = ViewProps & {
  delayMs?: number;
};

export const AnimatedView = ({ delayMs = 0, ...props }: AnimatedViewProps) => (
  <Animated.View
    {...props}
    entering={FadeInUp.delay(delayMs).duration(500).springify().mass(1)}
  />
);
