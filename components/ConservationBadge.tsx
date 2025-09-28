import { Shield } from 'lucide-react'

interface ConservationBadgeProps {
  status: {
    key: string;
    value: string;
  };
  size?: 'small' | 'medium' | 'large';
}

const statusConfig = {
  'LC': { color: 'status-LC', label: 'Least Concern' },
  'NT': { color: 'status-NT', label: 'Near Threatened' },
  'VU': { color: 'status-VU', label: 'Vulnerable' },
  'EN': { color: 'status-EN', label: 'Endangered' },
  'CR': { color: 'status-CR', label: 'Critically Endangered' },
}

export default function ConservationBadge({ status, size = 'medium' }: ConservationBadgeProps) {
  const config = statusConfig[status.key as keyof typeof statusConfig]
  
  if (!config) {
    return null
  }

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  }

  const iconSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5'
  }

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full border
      ${config.color} 
      ${sizeClasses[size]}
    `}>
      <Shield className={`mr-1 ${iconSizes[size]}`} />
      {size === 'large' ? status.value : status.key}
    </span>
  )
}