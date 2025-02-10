import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const UploadChallenge = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !content || !file) {
      setMessage("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("content", content);
      formData.append("file", file); // ต้องใช้ชื่อ "file" ให้ตรงกับ backend

      const res = await axios.post(`${API_URL}/api/challenge/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // ให้ axios ส่ง cookie ไปด้วย
      });

      setMessage(res.data.message || "อัปโหลดสำเร็จ!");
      setName("");
      setContent("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading challenge:", error);
      setMessage("อัปโหลดล้มเหลว");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>📌 อัปโหลด Challenge</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>ชื่อ Challenge:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>เนื้อหา:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div>
          <label>อัปโหลดรูปภาพ:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? "กำลังอัปโหลด..." : "อัปโหลด"}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadChallenge;
