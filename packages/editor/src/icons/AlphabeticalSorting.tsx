import * as React from 'react';
import { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 12H17L12 17H17"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 3C6 3 6 11.9232 6 17M6 17L9 14M6 17L3 14"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 3L15.3944 2.55279C15.225 2.214 14.8788 2 14.5 2C14.1212 2 13.775 2.214 13.6056 2.55279L14.5 3ZM16.1056 8.44721C16.3526 8.94119 16.9532 9.14142 17.4472 8.89443C17.9412 8.64744 18.1414 8.04676 17.8944 7.55279L16.1056 8.44721ZM11.1056 7.55279C10.8586 8.04676 11.0588 8.64744 11.5528 8.89443C12.0468 9.14142 12.6474 8.94119 12.8944 8.44721L11.1056 7.55279ZM13.6056 3.44721L16.1056 8.44721L17.8944 7.55279L15.3944 2.55279L13.6056 3.44721ZM12.8944 8.44721L15.3944 3.44721L13.6056 2.55279L11.1056 7.55279L12.8944 8.44721ZM12.5 8H16.5V6H12.5V8Z"
      fill="currentColor"
    />
  </svg>
);
export { SvgComponent as AlphabeticalSorting };
