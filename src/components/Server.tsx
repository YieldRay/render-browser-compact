import React from "react";
export function Server(props: React.PropsWithoutRef<React.SVGProps<{}>>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" {...props}>
      <g fill="currentColor">
        <path d="M15,0H1A1,1,0,0,0,0,1V2A1,1,0,0,0,1,3H15a1,1,0,0,0,1-1V1A1,1,0,0,0,15,0ZM14,2.25a.75.75,0,1,1,.75-.75A.75.75,0,0,1,14,2.25Z" />
        <path d="M15,4.5H1a1,1,0,0,0-1,1v1a1,1,0,0,0,1,1H15a1,1,0,0,0,1-1v-1A1,1,0,0,0,15,4.5ZM14,6.75A.75.75,0,1,1,14.75,6,.75.75,0,0,1,14,6.75Z" />
        <path d="M15,9H1a1,1,0,0,0-1,1v1a1,1,0,0,0,1,1H15a1,1,0,0,0,1-1V10A1,1,0,0,0,15,9Zm-1,2.25a.75.75,0,1,1,.75-.75A.75.75,0,0,1,14,11.25Z" />
      </g>
    </svg>
  );
}
