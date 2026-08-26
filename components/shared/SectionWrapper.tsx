interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  as?: React.ElementType
}

export default function SectionWrapper({
  children,
  className = '',
  id,
  as: Tag = 'section',
}: SectionWrapperProps) {
  return (
    <Tag id={id} className={className}>
      <div className="max-w-[1140px] mx-auto px-6">{children}</div>
    </Tag>
  )
}
