import { useState } from "react";

type PaymentReceipt = {
  id: number;
  date: string;
  amount: number;
  status: string;
};

const Pagar = () => {
  const [paymentReceipts, _setPaymentReceipts] = useState<PaymentReceipt[]>([
    { id: 1, date: "2022-01-01", amount: 100, status: "Paid" },
    { id: 2, date: "2022-01-15", amount: 200, status: "Pending" },
    { id: 3, date: "2022-02-01", amount: 300, status: "Paid" },
  ]);

  const [selectedReceipt, setSelectedReceipt] = useState<PaymentReceipt | null>(
    null
  );

  const handleSelectReceipt = (receipt: PaymentReceipt) => {
    setSelectedReceipt(receipt);
  };

  return (
    <div className="container mx-auto p-4 pt-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Payment Process Flow</h1>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-2">Payment Receipts</h2>
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">ID</th>
                <th className="border border-gray-200 px-4 py-2">Date</th>
                <th className="border border-gray-200 px-4 py-2">Amount</th>
                <th className="border border-gray-200 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentReceipts.map((receipt) => (
                <tr
                  key={receipt.id}
                  onClick={() => handleSelectReceipt(receipt)}
                  className="cursor-pointer"
                >
                  <td className="border border-gray-200 px-4 py-2">
                    {receipt.id}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {receipt.date}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    ${receipt.amount}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {receipt.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 mb-4 md:mb-0 md:ml-4">
          {selectedReceipt && (
            <div>
              <h2 className="text-xl font-bold mb-2">Selected Receipt</h2>
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    ID:
                  </label>
                  <p className="text-gray-700 text-sm">{selectedReceipt.id}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date:
                  </label>
                  <p className="text-gray-700 text-sm">
                    {selectedReceipt.date}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Amount:
                  </label>
                  <p className="text-gray-700 text-sm">
                    ${selectedReceipt.amount}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Status:
                  </label>
                  <p className="text-gray-700 text-sm">
                    {selectedReceipt.status}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagar;
