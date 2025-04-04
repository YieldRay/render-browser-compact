import React from "react";
export function Webview(props: React.PropsWithoutRef<React.SVGProps<{}>>) {
  return (
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 100 100" {...props}>
      <path
        fill="currentColor"
        d="M73.013 63.924a4.164 4.164 0 1 1 4.163-4.166 4.17 4.17 0 0 1-4.163 4.166m-46.026 0a4.164 4.164 0 1 1 4.164-4.166 4.17 4.17 0 0 1-4.164 4.166M74.506 38.84l8.322-14.413a1.732 1.732 0 1 0-2.999-1.734L71.403 37.29c-6.444-2.94-13.682-4.578-21.404-4.578-7.722 0-14.958 1.64-21.402 4.578L20.17 22.694a1.731 1.731 0 1 0-3 1.731l8.323 14.416C11.204 46.613 1.43 61.08 0 78.172h100C98.569 61.08 88.795 46.613 74.506 38.841"
      />
    </svg>
  );
}
