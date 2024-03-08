"use client";
import { randomUUID } from "crypto";
import { useRouter } from "next/router";
import { Redirect } from "next";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import { useState } from "react";

interface FormData {
  name: string;
  mobile: string;
  amount: string;
  muid: string;
}

export default function Pay() {
  const [data, setData] = useState<FormData>({
    name: "",
    mobile: "",
    amount: "",
    muid: "",
  });

  const { v4: uuidv4 } = require("uuid");

  const makePayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const transactionid = "CR-" + uuidv4().toString(36).slice(-6);
    console.log(transactionid);

    const payload = {
      merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
      merchantTransactionId: transactionid,
      merchantUserId: "CR-" + uuidv4().toString(36).slice(-6),
      amount: 10000,
      redirectUrl: `https://localhost:3000/api/status/${transactionid}`,
      redirectMode: "POST",
      callbackUrl: `https://localhost:3000/api/status/${transactionid}`,
      mobileNumber: data.mobile,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const dataPayload = JSON.stringify(payload);
    console.log(dataPayload);
    const dataBase64 = Buffer.from(dataPayload).toString("base64");
    console.log(dataBase64);

    const fullURL = dataBase64 +"/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = sha256(fullURL);


    const checksum = dataBase64 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

  };


  


  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dd = { ...data, [e.target.name]: e.target.value };
    setData(dd);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                value="DemoTest"
                onChange={(e) => handleFormData(e)}
                type="name"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Mobile"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Mobile
            </label>
            <div className="mt-2">
              <input
                id="Mobile"
                name="mobile"
                value="999999999"
                onChange={(e) => handleFormData(e)}
                autoComplete="Mobile"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Amount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Amount
            </label>
            <div className="mt-2">
              <input
                id="Amount"
                name="amount"
                value="10"
                autoComplete="Amount"
                onChange={(e) => handleFormData(e)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="MUID"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              MUID
            </label>
            <div className="mt-2">
              <input
                id="MUID"
                name="muid"
                value="nuid-909090"
                onChange={(e) => handleFormData(e)}
                autoComplete="MUID"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div></div>
          <div>
            <button
              onClick={(e) => makePayment(e)}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}