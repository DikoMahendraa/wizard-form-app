type StepItemProps = {
  number: number;
  title: string;
  description: string;
};

export function StepItem({ number, title, description }: StepItemProps) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white mr-3 mt-0.5">
        {number}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
