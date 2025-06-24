import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
            ともだちコレクション
          </h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            ログイン
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            アカウントをお持ちでない方は新規登録してください
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}