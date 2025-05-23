import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M17 17L13.6167 13.6167M15.4444 9.22222C15.4444 12.6587 12.6587 15.4444 9.22222 15.4444C5.78578 15.4444 3 12.6587 3 9.22222C3 5.78578 5.78578 3 9.22222 3C12.6587 3 15.4444 5.78578 15.4444 9.22222Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>;
export { SvgComponent as Search };