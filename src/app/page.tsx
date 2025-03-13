import { Plus } from 'lucide-react';

const HomePage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white px-4">
      <div className="mx-auto w-full max-w-md rounded-md p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">오늘 할 일</h1>
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="할 일을 입력하세요"
            className="flex-1 border-b-2 border-gray-300 py-1 placeholder-gray-400 focus:border-black focus:outline-none"
          />
          <button
            type="button"
            className="ml-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F4F4F] text-white hover:bg-black focus:bg-black focus:outline-none"
          >
            <Plus size={24} />
          </button>
        </div>

        <p className="mb-1 text-sm text-gray-600">
          남은 할 일: <span className="font-semibold">0</span>
        </p>
        <p className="text-sm text-gray-600">
          완료된 일: <span className="font-semibold">0</span>
        </p>
      </div>
    </main>
  );
};

export default HomePage;
