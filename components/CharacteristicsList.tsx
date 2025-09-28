interface CharacteristicsListProps {
  characteristics: {
    height?: string;
    trunk_diameter?: string;
    bark?: string;
    leaves?: string;
    flowers?: string;
    fruit?: string;
    flowering_period?: string;
  };
}

const characteristicLabels = {
  height: 'Height',
  trunk_diameter: 'Trunk Diameter',
  bark: 'Bark',
  leaves: 'Leaves',
  flowers: 'Flowers',
  fruit: 'Fruit',
  flowering_period: 'Flowering Period'
}

export default function CharacteristicsList({ characteristics }: CharacteristicsListProps) {
  const entries = Object.entries(characteristics).filter(([_, value]) => value)

  if (entries.length === 0) {
    return null
  }

  return (
    <div className="bg-secondary-50 rounded-lg p-6">
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entries.map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <dt className="text-sm font-medium text-secondary-700 mb-1">
              {characteristicLabels[key as keyof typeof characteristicLabels] || key}
            </dt>
            <dd className="text-secondary-900">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}