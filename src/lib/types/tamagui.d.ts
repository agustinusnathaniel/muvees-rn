// Tamagui v2 type declarations for better TypeScript support
// This helps resolve strict type checking issues with children and other props

declare module 'tamagui' {
  // Allow children on all Tamagui components
  interface ViewProps {
    children?: React.ReactNode;
  }
  
  interface TextProps {
    children?: React.ReactNode;
  }
  
  interface InputProps {
    children?: React.ReactNode;
    placeholder?: string;
    type?: string;
  }
  
  interface StackProps {
    children?: React.ReactNode;
  }
  
  interface YStackProps {
    children?: React.ReactNode;
  }
  
  interface XStackProps {
    children?: React.ReactNode;
  }
  
  interface CardProps {
    children?: React.ReactNode;
  }
  
  interface CardHeaderProps {
    children?: React.ReactNode;
  }
  
  interface ImageProps {
    source?: { uri?: string; width?: number; height?: number };
    src?: string;
  }
  
  interface SelectProps {
    children?: React.ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
  }
  
  interface SelectTriggerProps {
    children?: React.ReactNode;
    iconAfter?: React.ComponentType<any>;
  }
  
  interface SelectValueProps {
    children?: React.ReactNode;
    placeholder?: React.ReactNode;
    fontWeight?: string;
  }
  
  interface SelectItemProps {
    children?: React.ReactNode;
    index?: number;
    value?: string;
    onPress?: () => void;
  }
  
  interface SelectItemTextProps {
    children?: React.ReactNode;
  }
  
  interface SelectItemIndicatorProps {
    children?: React.ReactNode;
  }
  
  interface SelectGroupProps {
    children?: React.ReactNode;
  }
  
  interface SelectViewportProps {
    children?: React.ReactNode;
  }
  
  interface SelectContentProps {
    children?: React.ReactNode;
  }
  
  interface SelectScrollUpButtonProps {
    children?: React.ReactNode;
  }
  
  interface SelectScrollDownButtonProps {
    children?: React.ReactNode;
  }
  
  interface AdaptProps {
    children?: React.ReactNode;
    when?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    platform?: 'touch' | 'web';
  }
  
  interface SheetProps {
    children?: React.ReactNode;
    modal?: boolean;
    dismissOnSnapToBottom?: boolean;
    moveOnKeyboardChange?: boolean;
    forceRemoveScrollEnabled?: boolean;
    unmountChildrenWhenHidden?: boolean;
    snapPointsMode?: 'fit' | 'multiple';
  }
  
  interface SheetFrameProps {
    children?: React.ReactNode;
  }
  
  interface SheetHandleProps {
    children?: React.ReactNode;
  }
  
  interface SheetScrollViewProps {
    children?: React.ReactNode;
    scrollEnabled?: boolean;
  }
  
  interface SheetOverlayProps {
    transition?: string;
  }
  
  interface ScrollViewProps {
    children?: React.ReactNode;
  }
  
  interface LabelProps {
    children?: React.ReactNode;
  }
  
  interface H2Props {
    children?: React.ReactNode;
  }
  
  interface H4Props {
    children?: React.ReactNode;
  }
  
  interface IconProps {
    size?: number;
    color?: string;
  }
}

export {};
