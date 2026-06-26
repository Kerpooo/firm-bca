declare module '@tabler/icons-react' {
  import * as React from 'react';

  // Use a permissive prop type to avoid strict mismatch errors in the project
  export type IconProps = any;

  export const IconAt: React.FC<IconProps>;
  export const IconMapPin: React.FC<IconProps>;
  export const IconGlobe: React.FC<IconProps>;

  // Provide a permissive default export for named lookups
  const _default: any;
  export default _default;
}
