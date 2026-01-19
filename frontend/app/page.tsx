"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!file || !question) {
      setError("Please upload a PDF and enter a question.");
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer(null);
    setConfidence(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("question", question);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload-and-ask", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setAnswer(data.answer);
      setConfidence(data.confidence);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-6">
      <div
        className="bg-white rounded-3xl border border-gray-200
                   shadow-xl w-full max-w-2xl p-10 space-y-8
                   transition-all duration-300
                   hover:shadow-2xl hover:ring-2 hover:ring-gray-300"
      >
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight
                         bg-gradient-to-r from-gray-900 to-gray-600
                         bg-clip-text text-transparent">
            Smart Document AI Agent
          </h1>
          <p className="text-gray-600 text-base">
            Upload a document and interact with it intelligently
          </p>
        </div>

        {/* File upload */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Upload PDF Document
          </label>

          <div className="flex items-center gap-4">
            <label
              className="cursor-pointer inline-flex items-center
                         px-5 py-2 rounded-xl text-white text-sm font-medium
                         bg-gray-900 transition-all duration-200
                         hover:bg-gray-800 hover:shadow-lg
                         hover:-translate-y-0.5 hover:scale-[1.03]"
            >
              Choose File
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>

            <span className="text-sm text-gray-700 italic">
              {file ? `Selected: ${file.name}` : "No file chosen"}
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Your Question
          </label>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-sm text-gray-500 italic mb-2">
              Example: <span className="font-medium">What is the main topic of this document?</span>
            </p>

            <textarea
                placeholder="Type your question here..."
                className="w-full bg-white border border-gray-300 rounded-lg p-4
                          text-lg text-gray-900 caret-gray-900
                          placeholder:text-gray-400
                          focus:outline-none focus:ring-2 focus:ring-gray-900
                          focus:border-gray-900
                          transition"
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gray-900 text-white py-3 rounded-2xl
                     text-lg font-semibold transition-all duration-200
                     hover:bg-gray-800 hover:shadow-xl hover:scale-[1.02]
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing document..." : "Ask AI"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}

        {/* Answer */}
        {answer && (
          <div className="bg-gray-100 border border-gray-300
                          p-6 rounded-2xl space-y-4">
            
            <p className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2">
              Answer
            </p>

            <p className="text-lg text-gray-900 leading-relaxed">
              {answer}
            </p>

            <p className="text-sm text-gray-700">
              Confidence: <span className="font-semibold">{confidence}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
