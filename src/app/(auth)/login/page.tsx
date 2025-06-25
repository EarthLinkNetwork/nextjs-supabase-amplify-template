import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-100 via-purple-50 to-pink-50" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/30" />
      
      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="glass rounded-2xl p-8 md:p-10 animate-fadeIn">
          <div className="text-center mb-8">
            <div className="w-20 h-20 gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🧸</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              おかえりなさい
            </h1>
            <p className="text-gray-600">
              ともだちコレクションへようこそ
            </p>
          </div>
          <LoginForm />
        </div>
        
        <div className="text-center mt-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm text-gray-600">
            まだアカウントをお持ちでない方は
            <br />
            下のフォームから新規登録できます
          </p>
        </div>
      </div>
    </div>
  );
}