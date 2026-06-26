import { useWindowDimensions } from 'react-native';
import { deviceClass, DeviceClass } from '@/theme/tokens';

export function useDevice(): { width: number; height: number; device: DeviceClass; isMobile: boolean; isDesktop: boolean } {
  const { width, height } = useWindowDimensions();
  const device = deviceClass(width);
  return { width, height, device, isMobile: device === 'mobile', isDesktop: device === 'desktop' };
}
