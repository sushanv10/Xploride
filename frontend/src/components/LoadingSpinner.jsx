

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
      <div className="w-10 h-10 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
}
