"use client";

import Image from "next/image";
import Link from "next/link";
import { Book as BookType } from "@/app/types/types";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface BookProps {
  book: BookType;
}

// eslint-disable-next-line react/display-name
const Book = ({ book }: BookProps) => {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const handleParchaseClick = () => {
    setShowModal(true);
  }

  const handlePachaseConfirm = () => {
    if (!user) {
      setShowModal(false);
      // ログインページへリダイレクト
      router.push('/logout');
    } else {
      // stripeで決済する
    }
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal-content {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4">
        <a onClick={handleParchaseClick} className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none">
          <Image
            priority
            src={book.thumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="mt-2 text-lg text-slate-600">この商品は...</p>
            <p className="mt-2 text-md text-slate-700">値段：{book.price}円</p>
          </div>
        </a>

        {showModal && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-900/50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg modal-content">
              <h3 className="text-xl mb-4">本を購入しますか？</h3>
              <button onClick={handlePachaseConfirm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                購入する
              </button>
              <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Book;
