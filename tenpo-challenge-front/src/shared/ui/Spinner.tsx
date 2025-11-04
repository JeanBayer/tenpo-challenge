type SpinnerProps = {
  message?: string;
};

export const Spinner = ({ message }: SpinnerProps) => {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      <div className="border-4 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
};
