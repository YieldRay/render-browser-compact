import React from "react";
export function Desktop(props: React.PropsWithoutRef<React.SVGProps<{}>>) {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="path-1-inside-1_519_18896" fill="white">
        <rect x="0.38501" width="16" height="13" rx="1" />
      </mask>
      <rect x="0.38501" width="16" height="13" rx="1" stroke="currentColor" strokeWidth="3" mask="url(#path-1-inside-1_519_18896)" />
      <rect x="7.38501" y="13" width="1.5" height="2" fill="currentColor" />
      <path d="M11.135 14.5C11.6873 14.5 12.135 14.9477 12.135 15.5L12.135 16L4.13501 16L4.13501 15.5C4.13501 14.9477 4.58273 14.5 5.13501 14.5L11.135 14.5Z" fill="currentColor" />
    </svg>
  );
}
