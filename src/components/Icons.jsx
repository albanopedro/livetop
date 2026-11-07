const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

export const BagIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5.5 8h13l1.1 12.5H4.4L5.5 8Z" />
    <path d="M9 8V6.2a3 3 0 0 1 6 0V8" />
  </svg>
)

export const SearchIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
)

export const StarIcon = (props) => (
  <svg {...base} fill="currentColor" stroke="none" {...props}>
    <path d="m12 3.6 2.55 5.17 5.7.83-4.13 4.02.98 5.68L12 16.62 6.9 19.3l.98-5.68L3.75 9.6l5.7-.83L12 3.6Z" />
  </svg>
)

export const CloseIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const PlusIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const MinusIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5 12h14" />
  </svg>
)

export const TrashIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13M10 11v5M14 11v5" />
  </svg>
)

export const ArrowRightIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const TruckIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17.5" cy="18" r="1.6" />
  </svg>
)

export const ShieldIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3.5 19 6v6c0 4-3 7-7 8.5C8 19 5 16 5 12V6l7-2.5Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const SparkIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />
  </svg>
)

export const CheckIcon = (props) => (
  <svg {...base} {...props}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
)

export const SunIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
)

export const MoonIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </svg>
)
