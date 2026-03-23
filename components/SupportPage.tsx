import React from 'react';
import { LifeBuoy, Mail, MapPin, School, Phone, BookOpen, HelpCircle, ExternalLink } from 'lucide-react';

const SupportPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-4xl font-black text-slate-900 mb-2">Support & Help <span className="text-2xl font-semibold text-slate-400">/ Hỗ Trợ</span></h2>
                <p className="text-lg text-slate-500">Contact information and user guide / Thông tin liên hệ và hướng dẫn sử dụng</p>
            </div>

            {/* Author Info Card */}
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-8 text-white mb-6 shadow-xl">
                <div className="flex items-start gap-6">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                        <School className="w-12 h-12" />
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-teal-100 mb-1">APP AUTHOR / TÁC GIẢ ỨNG DỤNG</div>
                        <h3 className="text-3xl font-black mb-4">Thầy Trần Hoài Thanh</h3>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <School className="w-5 h-5 flex-shrink-0" />
                                <div>
                                    <div className="text-sm text-teal-100">School / Trường</div>
                                    <div className="font-bold">THPT Khúc Thừa Dụ</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <MapPin className="w-5 h-5 flex-shrink-0" />
                                <div>
                                    <div className="text-sm text-teal-100">Address / Địa chỉ</div>
                                    <div className="font-bold">Vĩnh Lại - TP Hải Phòng</div>
                                </div>
                            </div>

                            <a
                                href="https://zalo.me/0348296773"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 bg-white text-primary hover:bg-teal-50 rounded-lg p-3 transition-all group"
                            >
                                <Phone className="w-5 h-5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                                <div>
                                    <div className="text-sm text-slate-500">Contact Zalo / Liên hệ Zalo</div>
                                    <div className="font-bold text-lg">0348296773</div>
                                </div>
                                <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Guide */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">User Guide <span className="text-base font-normal text-slate-400">/ Hướng Dẫn Sử Dụng</span></h3>
                            <p className="text-sm text-slate-600">Steps to create an English quiz / Các bước tạo bài kiểm tra tiếng Anh</p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <ol className="space-y-4">
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                1
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 mb-1">Configure API Key / Cấu hình API Key</div>
                                <div className="text-sm text-slate-600">
                                    Go to <strong>Settings</strong> and enter your Google Gemini API key. / Vào mục <strong>Cài đặt</strong> và nhập API key.
                                    <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="text-primary hover:underline ml-1">
                                        Get API key here / Lấy API key tại đây →
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                2
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 mb-1">Enter Quiz Information / Nhập thông tin bài kiểm tra</div>
                                <div className="text-sm text-slate-600">
                                    Enter English topic or upload materials (PDF, TXT, images). Choose question count and difficulty level. / Nhập chủ đề tiếng Anh hoặc tải tài liệu lên. Chọn số câu và mức độ.
                                </div>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                3
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 mb-1">Generate and Export / Tạo và xuất file</div>
                                <div className="text-sm text-slate-600">
                                    Click <strong>"Generate AI Quiz"</strong>, then save to library or download the HTML file. / Nhấn <strong>"Generate AI Quiz"</strong>, sau đó lưu hoặc tải file HTML.
                                </div>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                4
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 mb-1">Manage and Track / Quản lý và theo dõi</div>
                                <div className="text-sm text-slate-600">
                                    Review saved quizzes in <strong>Library</strong>, track statistics in <strong>Reports</strong>. / Xem lại bài đã lưu trong <strong>Thư viện</strong>, theo dõi thống kê trong <strong>Báo cáo</strong>.
                                </div>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                            <HelpCircle className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">FAQ <span className="text-base font-normal text-slate-400">/ Câu Hỏi Thường Gặp</span></h3>
                            <p className="text-sm text-slate-600">Common questions answered / Giải đáp thắc mắc phổ biến</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <details className="bg-slate-50 rounded-lg p-4 group">
                        <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                            <span>Is the API key free? / API key có miễn phí không?</span>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-sm text-slate-600 mt-3 pl-4 border-l-2 border-primary">
                            Google Gemini provides a free tier with reasonable usage limits. You can create hundreds of English quizzes at no cost. / Google Gemini cung cấp gói miễn phí với hạn mức hợp lý. Bạn có thể tạo hàng trăm bài kiểm tra tiếng Anh mà không tốn phí.
                        </p>
                    </details>

                    <details className="bg-slate-50 rounded-lg p-4 group">
                        <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                            <span>How to export HTML file? / Làm sao xuất file HTML?</span>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-sm text-slate-600 mt-3 pl-4 border-l-2 border-primary">
                            After generating questions, click <strong>"Download App"</strong>. The HTML file works offline and can be shared with students. / Sau khi tạo câu hỏi, nhấn <strong>"Download App"</strong>. File HTML chạy offline và chia sẻ cho học sinh.
                        </p>
                    </details>

                    <details className="bg-slate-50 rounded-lg p-4 group">
                        <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                            <span>Is data stored on cloud? / Dữ liệu có lưu trên cloud không?</span>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-sm text-slate-600 mt-3 pl-4 border-l-2 border-primary">
                            No. All data is stored in your browser's <strong>localStorage</strong>. Your data is completely private and only exists on your computer. / Không. Dữ liệu lưu trong <strong>localStorage</strong> trình duyệt, hoàn toàn riêng tư.
                        </p>
                    </details>

                    <details className="bg-slate-50 rounded-lg p-4 group">
                        <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                            <span>How many questions per quiz? / Tạo bao nhiêu câu 1 lúc?</span>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-sm text-slate-600 mt-3 pl-4 border-l-2 border-primary">
                            You can create 1-20 questions per quiz. We recommend 10-15 for optimal quality. / Tạo 1-20 câu mỗi lần. Khuyến nghị 10-15 câu để đảm bảo chất lượng.
                        </p>
                    </details>
                </div>
            </div>

            {/* Contact Footer */}
            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                    Need more help? Contact via Zalo / Cần hỗ trợ thêm? Liên hệ Zalo: <strong className="text-primary">0348296773</strong>
                </p>
            </div>
        </div>
    );
};

export default SupportPage;
