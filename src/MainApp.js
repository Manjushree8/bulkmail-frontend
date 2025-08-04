import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';

function MainApp() {
  const [subject, setSubject] = useState("");
  const [msg, setmsg] = useState("");
  const [status, setstatus] = useState(false);
  const [emailList, setEmailList] = useState([]);

  const BASE_URL = 'https://bulkmail-backend-pq5l.onrender.com';

  function handlemsg(evt) {
    setmsg(evt.target.value);
  }

  function handlefile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const SheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[SheetName];
      const emailList = XLSX.utils.sheet_to_json(worksheet, { header: 'A' });
      const totalemail = emailList.map(item => item.A);
      setEmailList(totalemail);
    };
    reader.readAsBinaryString(file);
  }

  function Send() {
    if (!subject.trim()) {
      alert("Please enter a subject.");
      return;
    }
    if (!msg.trim()) {
      alert("Please enter a message.");
      return;
    }
    if (emailList.length === 0) {
      alert("Please upload a valid Excel file.");
      return;
    }

    setstatus(true);
    axios.post(`${BASE_URL}/sendemail`, {
      subject: subject,
      msg: msg,
      emailList: emailList
    }).then(function (data) {
      if (data.data === true) {
        alert("✅ Emails have been sent successfully!");
        setstatus(false);
      } else {
        alert("❌ Oops! Something went wrong.");
        setstatus(false);
      }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fce4ec] to-[#f8bbd0] text-[#3b2f30] flex flex-col">
      <header className="bg-[#ec407a] text-white text-center py-6 shadow-md">
        <h1 className="text-4xl font-bold tracking-wide" style={{ fontFamily: 'Pacifico, cursive' }}>
          BulkMail
        </h1>
      </header>

      <section className="text-center py-3">
        <p className="text-lg font-semibold text-[#4a3a3c]">
          Send bulk emails easily and instantly.
        </p>
        <p className="text-sm text-[#5e4d4f] mt-1">
          Just type it. Drop your Excel file. We'll do the magic.
        </p>
      </section>

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-[#f48fb1] space-y-5">
          
          {/* Subject Input */}
          <input
            type="text"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            placeholder="Subject of your email"
            className="w-full p-3 bg-[#fdf0f5] text-[#2d1d1f] border border-[#f8bbd0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec407a] placeholder:text-[#947075]"
          />

          {/* Message Input */}
          <textarea
            onChange={handlemsg}
            value={msg}
            className="w-full h-32 p-4 bg-[#fdf0f5] text-[#2d1d1f] border border-[#f8bbd0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec407a] placeholder:text-[#947075]"
            placeholder="Write your message here..."
          ></textarea>

          {/* File Upload */}
          <label className="block">
            <span className="sr-only">Choose Excel file</span>
            <input
              type="file"
              onChange={handlefile}
              className="block w-full text-sm text-[#b03561] 
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-[#ec407a] file:text-white
                hover:file:bg-[#d81b60] cursor-pointer
                mt-2"
            />
          </label>

          <p className="text-center text-sm text-[#6a424d] font-semibold">
            Emails loaded: {emailList.length}
          </p>

          <div className="text-center space-y-4">
            <button
              onClick={Send}
              className="bg-[#b03561] hover:bg-[#8e2e4f] text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              {status ? "Sending..." : "Send Emails"}
            </button>

            <Link to="/history">
              <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                📜 View History
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainApp;
