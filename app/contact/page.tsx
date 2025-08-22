'use client'

import { usePathname } from 'next/navigation'

export default function ContactPage() {
  const pathname = usePathname()
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white border-b border-gray-200 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            我们期待听到您的声音，欢迎通过以下方式与我们联系
          </p>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* 左侧联系信息 */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">联系方式</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 text-lg">📧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">邮箱</h3>
                      <p className="text-gray-600">hello@magotalk.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 text-lg">🐦</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Twitter</h3>
                      <p className="text-gray-600">@MagoTalk</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 text-lg">💬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Discord</h3>
                      <p className="text-gray-600">MagoTalk Community</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">合作机会</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  如果您是 Web3 领域的专家、创业者或项目方，欢迎与我们联系，
                  探讨播客合作、内容共创等机会。
                </p>
                <a 
                  href="mailto:hello@magotalk.com" 
                  className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                >
                  发送邮件
                </a>
              </div>
            </div>

            {/* 右侧联系表单 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">发送消息</h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="请输入您的姓名"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="请输入您的邮箱"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    主题
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">请选择主题</option>
                    <option value="feedback">内容反馈</option>
                    <option value="cooperation">合作意向</option>
                    <option value="suggestion">建议意见</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    消息内容
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="请输入您的消息内容..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                >
                  发送消息
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
