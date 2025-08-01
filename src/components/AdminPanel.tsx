import React, { useState, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Calendar, MapPin, Heart, Save, Trash2, Home } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { storage, db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

interface Memory {
  id: string;
  title: string;
  date: string;
  description: string;
  location?: string;
  imageUrl: string;
  createdAt: Date;
}

const AdminPanel: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    location: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadMemories();
  }, []);

  const loadMemories = async () => {
    try {
      console.log('🔄 AdminPanel: Bắt đầu tải danh sách kỷ niệm...');
      const querySnapshot = await getDocs(collection(db, 'memories'));
      console.log('✅ AdminPanel: Lấy được', querySnapshot.size, 'documents từ Firestore');
      
      const memoriesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('📄 AdminPanel: Document data:', data);
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date()
        };
      }) as Memory[];
      
      console.log('🎯 AdminPanel: Memories đã xử lý:', memoriesData);
      setMemories(memoriesData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
      console.log('✅ AdminPanel: Đã cập nhật state với', memoriesData.length, 'kỷ niệm');
    } catch (error) {
      console.error('❌ AdminPanel: Lỗi khi tải dữ liệu:', error);
      alert('Có lỗi khi tải danh sách kỷ niệm: ' + (error instanceof Error ? error.message : 'Lỗi không xác định'));
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !formData.title || !formData.description) {
      alert('Vui lòng điền đầy đủ thông tin và chọn ảnh!');
      return;
    }

    setIsUploading(true);
    try {
      // Upload ảnh lên Firebase Storage
      const storageRef = ref(storage, `memories/${Date.now()}_${selectedFile.name}`);
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Lưu thông tin vào Firestore
      const memoryData = {
        title: formData.title,
        date: formData.date,
        description: formData.description,
        location: formData.location || '',
        imageUrl: downloadURL,
        createdAt: new Date()
      };

      await addDoc(collection(db, 'memories'), memoryData);

      // Reset form
      setSelectedFile(null);
      setPreviewUrl('');
      setFormData({
        title: '',
        date: '',
        description: '',
        location: ''
      });

      // Reload danh sách
      await loadMemories();
      alert('Upload thành công!');
    } catch (error) {
      console.error('Lỗi khi upload:', error);
      alert('Có lỗi xảy ra khi upload!');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa kỷ niệm này?')) {
      try {
        await deleteDoc(doc(db, 'memories', id));
        await loadMemories();
        alert('Đã xóa thành công!');
      } catch (error) {
        console.error('Lỗi khi xóa:', error);
        alert('Có lỗi xảy ra khi xóa!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          {/* Nút về trang chính */}
          <button
            onClick={() => navigate('/')}
            className="absolute top-0 left-0 flex items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-pink-50"
          >
            <Home className="w-4 h-4 text-pink-500" />
            <span className="text-pink-600 font-medium">Về trang chính</span>
          </button>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Admin Panel - Quản Lý Kỷ Niệm
          </h1>
          <p className="text-pink-600 text-lg">
            Thêm và quản lý những kỷ niệm đẹp của chúng ta
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Upload className="w-6 h-6 mr-2 text-pink-500" />
              Thêm Kỷ Niệm Mới
            </h2>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chọn ảnh
              </label>
              <div className="border-2 border-dashed border-pink-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg shadow-md"
                      />
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl('');
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon className="w-12 h-12 mx-auto text-pink-400 mb-2" />
                      <p className="text-gray-600">Click để chọn ảnh</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Nhập tiêu đề kỷ niệm..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày tháng
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa điểm (tùy chọn)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Nhập địa điểm..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Mô tả kỷ niệm này..."
                />
              </div>

              <button
                onClick={handleUpload}
                disabled={isUploading || !selectedFile}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang upload...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Lưu Kỷ Niệm
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Memories List */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-pink-500" />
              Danh Sách Kỷ Niệm ({memories.length})
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {memories.map((memory) => (
                <div key={memory.id} className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                  <div className="flex items-start space-x-3">
                    <img
                      src={memory.imageUrl}
                      alt={memory.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{memory.title}</h3>
                      <div className="flex items-center text-sm text-pink-600 space-x-4 mt-1">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {memory.date}
                        </span>
                        {memory.location && (
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {memory.location}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {memory.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(memory.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {memories.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Heart className="w-12 h-12 mx-auto text-pink-300 mb-2" />
                  <p>Chưa có kỷ niệm nào được thêm</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 