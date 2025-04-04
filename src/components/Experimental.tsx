import React from "react";
export function Experimental(props: React.PropsWithoutRef<React.SVGProps<{}>>) {
  return (
    <svg width="16" height="16" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" {...props}>
      {" "}
      <path d="M90.72 82.34c4.4 7 1.29 12.66-7 12.66H16.25C8 95 4.88 89.31 9.28 82.34l29.47-46.46V12.5H35A3.75 3.75 0 0135 5h30a3.75 3.75 0 010 7.5h-3.75v23.38zM45.08 39.86L29.14 65h41.72L54.92 39.86l-1.17-1.81V12.5h-7.5v25.55z" fill="currentColor" />
    </svg>
  );
}
