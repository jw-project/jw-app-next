export const TextDescriptionCell = ({
  text,
  description,
}: {
  text: string;
  description: string;
}) => {
  return (
    <>
      <div className="text-base font-semibold text-gray-950 dark:text-gray-500">
        {text}
      </div>
      <div className="font-normal text-gray-500">{description}</div>
    </>
  );
};
