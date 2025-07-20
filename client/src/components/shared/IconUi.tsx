import { colors } from '~/styles/color'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export const CartIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      id='bag'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 400 400'
      {...props}
      className={className}
    >
      <path
        d='M274.772,347.241H125.228c-15.157,0-27.66-11.869-28.447-27.005l-10.52-217.064h227.478l-10.52,217.064c-.788,15.136-13.29,27.005-28.447,27.005Z'
        fill='none'
        stroke={colors['color-secondary-color']}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='15'
      />
      <path
        d='M160.791,123.509v-37.059c0-21.655,17.555-39.209,39.209-39.209h0c21.655,0,39.209,17.555,39.209,39.209v37.059'
        fill='none'
        stroke={colors['color-secondary-color']}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='15'
      />
    </svg>
  )
}
