/** Pictogrammes filaires du prototype (dessinés pour la démo, non officiels). */
import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 20, children, ...rest }: P & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const ArrowLeft = (p: P) => (
  <Base {...p}><path d="M20 12H4M10 6l-6 6 6 6" /></Base>
)
export const ArrowRight = (p: P) => (
  <Base {...p}><path d="M4 12h16M14 6l6 6-6 6" /></Base>
)
export const Plus = (p: P) => (
  <Base {...p}><path d="M12 4v16M4 12h16" /></Base>
)
export const Clock = (p: P) => (
  <Base {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Base>
)
export const People = (p: P) => (
  <Base {...p}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M15 14.2c2.6-.3 4.9 1.2 5.5 4.3" /></Base>
)
export const Gift = (p: P) => (
  <Base {...p}><rect x="4" y="10" width="16" height="10" rx="1" /><path d="M3 7h18v3H3zM12 7v13M12 7c-1-3-5-3.5-5-1s5 1 5 1c1-3 5-3.5 5-1s-5 1-5 1" /></Base>
)
export const Target = (p: P) => (
  <Base {...p}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></Base>
)
export const External = (p: P) => (
  <Base {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></Base>
)
export const Check = (p: P) => (
  <Base {...p}><path d="M5 12.5l4.5 4.5L19 7" /></Base>
)
export const Reset = (p: P) => (
  <Base {...p}><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" /></Base>
)
export const Info = (p: P) => (
  <Base {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5.5M12 7.8v.2" /></Base>
)
export const Calendar = (p: P) => (
  <Base {...p}><rect x="4" y="5.5" width="16" height="14" rx="1" /><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" /></Base>
)
export const Pin = (p: P) => (
  <Base {...p}><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></Base>
)
export const Home = (p: P) => (
  <Base {...p}><path d="M4 11l8-6.5 8 6.5M6 9.5V19h12V9.5" /></Base>
)
export const Menu = (p: P) => (
  <Base {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Base>
)
export const Close = (p: P) => (
  <Base {...p}><path d="M6 6l12 12M18 6L6 18" /></Base>
)
export const User = (p: P) => (
  <Base {...p}><circle cx="12" cy="8" r="3.6" /><path d="M5 20c.8-4 3.6-6.2 7-6.2s6.2 2.2 7 6.2" /></Base>
)
export const Search = (p: P) => (
  <Base {...p}><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5" /></Base>
)
export const Graduation = (p: P) => (
  <Base {...p}><path d="M2.5 9.5L12 5l9.5 4.5L12 14z" /><path d="M6.5 11.5V16c1.5 1.6 3.3 2.4 5.5 2.4s4-.8 5.5-2.4v-4.5M21.5 9.5v5" /></Base>
)
export const TrendUp = (p: P) => (
  <Base {...p}><path d="M3 18l6-6 4 4 8-8" /><path d="M15 8h6v6" /></Base>
)
export const Compass = (p: P) => (
  <Base {...p}><circle cx="12" cy="12" r="8.5" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></Base>
)
export const Handshake = (p: P) => (
  <Base {...p}><path d="M2.5 11l4-4 4 2 3-2 4 1 4 4" /><path d="M6.5 7l-1 7 4.5 4.5c.8.8 2 .8 2.7 0l5.8-5.8" /><path d="M10 13.5l2 2M12.5 11.5l2.5 2.5" /></Base>
)
export const Chart = (p: P) => (
  <Base {...p}><path d="M4 20V4M4 20h16" /><rect x="7" y="12" width="3" height="5" /><rect x="12" y="8" width="3" height="9" /><rect x="17" y="5" width="3" height="12" /></Base>
)
export const Laptop = (p: P) => (
  <Base {...p}><rect x="5" y="5" width="14" height="10" rx="1" /><path d="M2.5 19h19l-2-4h-15z" /></Base>
)
export const Chat = (p: P) => (
  <Base {...p}><path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3.5V15H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /><path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2v2.5L17 18h-4" /></Base>
)
export const Group = (p: P) => (
  <Base {...p}><circle cx="12" cy="7" r="2.6" /><circle cx="5.5" cy="10" r="2.2" /><circle cx="18.5" cy="10" r="2.2" /><path d="M7.5 19c.5-3 2.3-4.8 4.5-4.8s4 1.8 4.5 4.8M1.5 18c.4-2.2 1.8-3.6 3.6-3.6M22.5 18c-.4-2.2-1.8-3.6-3.6-3.6" /></Base>
)
export const Doc = (p: P) => (
  <Base {...p}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 15.5h6M9 9h3" /></Base>
)
