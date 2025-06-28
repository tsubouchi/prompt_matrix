"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Copy, ArrowLeft, Zap, Code, Palette } from "lucide-react"

const MatrixRain = () => {
  useEffect(() => {
    const characters =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const canvas = document.getElementById("matrix-canvas") as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#333333"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)
    return () => clearInterval(interval)
  }, [])

  return <canvas id="matrix-canvas" className="fixed inset-0 pointer-events-none opacity-10" style={{ zIndex: -1 }} />
}

const promptTemplates = [
  {
    id: 1,
    title: "コード生成プロンプト",
    category: "コーディング",
    icon: Code,
    description: "効率的なコード生成のためのテンプレート",
    template:
      "あなたは経験豊富なソフトウェアエンジニアです。以下の要件に基づいて、クリーンで効率的な[言語]のコードを書いてください：\n\n要件：[具体的な要件]\n機能：[必要な機能]\n制約：[制約条件]\n\nコードには適切なコメントと説明を含めてください。",
    detailedDescription:
      "このプロンプトテンプレートは、プログラミングタスクを効率的に処理するために設計されています。経験豊富なソフトウェアエンジニアの視点から、クリーンで保守性の高いコードを生成します。",
    useCases: [
      "Webアプリケーションの機能実装",
      "アルゴリズムの最適化",
      "データ処理スクリプトの作成",
      "API エンドポイントの実装",
    ],
    tips: [
      "具体的な要件を明確に記述する",
      "使用する言語やフレームワークを指定する",
      "パフォーマンス要件があれば明記する",
      "エラーハンドリングの要件も含める",
    ],
    examples: [
      {
        input: "Python でCSVファイルを読み込んで集計する機能",
        output: "pandas を使用したデータ処理コードを生成",
      },
      {
        input: "React でユーザー認証フォームを作成",
        output: "フォームバリデーション付きのReactコンポーネントを生成",
      },
    ],
  },
  {
    id: 2,
    title: "UI/UXデザイン分析",
    category: "デザイン",
    icon: Palette,
    description: "デザインの改善提案を生成",
    template:
      "あなたはUX/UIデザインの専門家です。以下のデザインについて詳細な分析と改善提案を行ってください：\n\n対象：[デザイン対象]\nターゲットユーザー：[ユーザー層]\n現在の課題：[課題]\n\nユーザビリティ、アクセシビリティ、視覚的魅力の観点から評価し、具体的な改善案を提示してください。",
    detailedDescription:
      "UX/UIデザインの専門的な分析と改善提案を行うためのテンプレートです。ユーザビリティ、アクセシビリティ、視覚的魅力の3つの観点から包括的な評価を提供します。",
    useCases: [
      "既存サイトのリニューアル検討",
      "新規プロダクトのデザイン評価",
      "ユーザビリティテストの準備",
      "デザインシステムの構築",
    ],
    tips: [
      "ターゲットユーザーを具体的に定義する",
      "現在の課題を明確に整理する",
      "競合他社の事例も参考にする",
      "実装可能性も考慮した提案を求める",
    ],
    examples: [
      {
        input: "ECサイトの商品詳細ページの改善",
        output: "購入導線の最適化とユーザビリティ向上案を提示",
      },
      {
        input: "モバイルアプリのナビゲーション改善",
        output: "タップしやすさとアクセシビリティを考慮した設計案",
      },
    ],
  },
  // 他のテンプレートも同様に追加...
]

export default function PromptDetailPage() {
  const params = useParams()
  const id = Number.parseInt(params.id as string)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const template = promptTemplates.find((t) => t.id === id)

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">プロンプトが見つかりません</h1>
          <Link href="/">
            <Button className="bg-white text-black hover:bg-gray-200">ホームに戻る</Button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = template.icon

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRain />

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  戻る
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-white" />
                <span className="text-lg font-bold text-white">PROMPT MATRIX</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-gray-800">
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              <div>
                <Badge variant="outline" className="border-gray-600 text-gray-300 mb-2">
                  {template.category}
                </Badge>
                <h1 className="text-4xl font-bold text-white">{template.title}</h1>
              </div>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">{template.detailedDescription}</p>
          </div>

          {/* Template Section */}
          <Card className="bg-gray-900/60 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                プロンプトテンプレート
                <Button
                  onClick={() => copyToClipboard(template.template, template.id)}
                  className="bg-white text-black hover:bg-gray-200"
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedId === template.id ? "コピー完了!" : "コピー"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <pre className="text-gray-300 whitespace-pre-wrap font-mono leading-relaxed text-sm">
                  {template.template}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Use Cases Section */}
          <Card className="bg-gray-900/60 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">主な使用例</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {template.useCases?.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="text-white mt-1 text-lg">•</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card className="bg-gray-900/60 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">効果的な使用のコツ</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {template.tips?.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="text-white mt-1">💡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Examples Section */}
          {template.examples && (
            <Card className="bg-gray-900/60 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white">実例</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {template.examples.map((example, index) => (
                    <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="mb-3">
                        <span className="text-white font-medium">入力例:</span>
                        <p className="text-gray-300 mt-1">{example.input}</p>
                      </div>
                      <div>
                        <span className="text-white font-medium">期待される出力:</span>
                        <p className="text-gray-300 mt-1">{example.output}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => copyToClipboard(template.template, template.id)}
              className="bg-white text-black hover:bg-gray-200"
              size="lg"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copiedId === template.id ? "コピー完了!" : "テンプレートをコピー"}
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                size="lg"
              >
                他のテンプレートを見る
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
