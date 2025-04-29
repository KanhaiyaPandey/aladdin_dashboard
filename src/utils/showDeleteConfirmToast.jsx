import { toast } from 'react-hot-toast';


export const showDeleteConfirmToast = (onConfirm) => {
  toast(
    (t) => (
      <div className="flex flex-col items-center gap-2  ">
        <p className="font-semibold flex items-center justify-center">Are you sure you want to delete this product?</p>
        <div className="flex gap-4 mt-2 ">
          <button
            onClick={() => {
              onConfirm();
              toast.dismiss(t.id);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            className="bg-gray-300 text-black px-3 py-1 rounded-lg hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      position: 'top-center',
      duration: 5000,
      closeOnClick: false,
      closeButton: false,
    }
  );
};
