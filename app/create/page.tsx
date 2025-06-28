"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Zap, Sparkles, Loader2, Copy, Wand2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const MatrixRain = () => {
  useEffect(() => {
    let animationId: number
    let canvas: HTMLCanvasElement | null = null
    let ctx: CanvasRenderingContext2D | null = null

    try {
      const characters =
        "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

      canvas = document.getElementById("matrix-canvas") as HTMLCanvasElement
      if (!canvas) return

      ctx = canvas.getContext("2d")
      if (!ctx) return

      // ウィンドウサイズの安全な取得
      const width = window.innerWidth || 800
      const height = window.innerHeight || 600

      canvas.width = width
      canvas.height = height

      const fontSize = 14
      const columns = Math.floor(width / fontSize)
      const drops: number[] = []

      for (let i = 0; i < columns; i++) {
        drops[i] = 1
      }

      const draw = () => {
        try {
          if (!ctx || !canvas) return

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

          animationId = requestAnimationFrame(draw)
        } catch (error) {
          console.error("Matrix animation error:", error)
        }
      }

      animationId = requestAnimationFrame(draw)
    } catch (error) {
      console.error("Matrix setup error:", error)
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return <canvas id="matrix-canvas" className="fixed inset-0 pointer-events-none opacity-10" style={{ zIndex: -1 }} />
}

// 安全なローカルストレージ操作
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem(key)
      }
    } catch (error) {
      console.error("LocalStorage getItem error:", error)
    }
    return null
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value)
      }
    } catch (error) {
      console.error("LocalStorage setItem error:", error)
    }
  },
}

// 模擬AI生成関数
const generatePromptWithAI = async (theme: string, category: string, purpose: string): Promise<any> => {
  try {
    // 2秒待機（実際のAPI呼び出しをシミュレート）
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const templates = {
      ビジネス: {
        title: `${theme}のビジネス戦略プロンプト`,
        description: `${theme}に関する包括的なビジネス戦略を立案するためのプロンプト`,
        template: `あなたは${theme}の専門家です。以下の条件で詳細な戦略を立案してください：

目標：[具体的な目標]
期間：[実施期間]
予算：[予算範囲]
対象市場：[ターゲット市場]

${theme}の特性を活かした実行可能な戦略を、以下の観点から提案してください：
1. 市場分析
2. 競合分析
3. 実行計画
4. リスク評価
5. 成功指標`,
        detailedDescription: `${theme}に特化したビジネス戦略を体系的に立案するためのプロンプトテンプレートです。市場の特性を理解し、実行可能な戦略を提案します。`,
        useCases: [
          `${theme}関連の新規事業立案`,
          `既存事業の${theme}への展開`,
          `${theme}市場での競争戦略`,
          `${theme}を活用した収益モデル構築`,
        ],
        tips: [
          "具体的な数値目標を設定する",
          "市場調査データを活用する",
          "段階的な実行計画を立てる",
          "リスク対策を事前に検討する",
        ],
        examples: [
          {
            input: `${theme}を活用した新サービスの戦略立案`,
            output: `市場分析から実行計画まで包括的な戦略を提案`,
          },
        ],
      },
      技術: {
        title: `${theme}技術実装プロンプト`,
        description: `${theme}に関する技術的な実装や解決策を提案するプロンプト`,
        template: `あなたは${theme}の技術専門家です。以下の技術課題について詳細な解決策を提案してください：

課題：[具体的な技術課題]
要件：[技術要件]
制約：[制約条件]
環境：[技術環境]

${theme}の最新技術を活用して、以下の観点から解決策を提案してください：
1. 技術アーキテクチャ
2. 実装方法
3. パフォーマンス最適化
4. セキュリティ考慮事項
5. 運用・保守方法`,
        detailedDescription: `${theme}に関する技術的な課題を解決するためのプロンプトテンプレートです。最新の技術動向を踏まえた実装方法を提案します。`,
        useCases: [
          `${theme}システムの設計`,
          `${theme}関連の技術選定`,
          `${theme}のパフォーマンス改善`,
          `${theme}のセキュリティ強化`,
        ],
        tips: [
          "最新の技術動向を調査する",
          "スケーラビリティを考慮する",
          "セキュリティを最優先にする",
          "運用コストも検討する",
        ],
        examples: [
          {
            input: `${theme}を使った高性能システムの設計`,
            output: `アーキテクチャから実装まで詳細な技術提案`,
          },
        ],
      },
      マーケティング: {
        title: `${theme}マーケティング戦略プロンプト`,
        description: `${theme}に特化したマーケティング戦略を立案するプロンプト`,
        template: `あなたは${theme}のマーケティング専門家です。以下の条件で効果的なマーケティング戦略を立案してください：

商品/サービス：[対象商品]
ターゲット：[ターゲット顧客]
予算：[マーケティング予算]
期間：[キャンペーン期間]
目標：[KPI・目標値]

${theme}の特性を活かしたマーケティング戦略を以下の観点から提案してください：
1. ターゲット分析
2. メッセージング戦略
3. チャネル選定
4. コンテンツ戦略
5. 効果測定方法`,
        detailedDescription: `${theme}に特化したマーケティング戦略を立案するためのプロンプトテンプレートです。ターゲットの特性を理解し、効果的な施策を提案します。`,
        useCases: [
          `${theme}商品のローンチ戦略`,
          `${theme}ブランドの認知度向上`,
          `${theme}コミュニティの構築`,
          `${theme}イベントのプロモーション`,
        ],
        tips: [
          "ターゲットのペルソナを明確にする",
          "複数のチャネルを組み合わせる",
          "データドリブンな施策を心がける",
          "継続的な改善を行う",
        ],
        examples: [
          {
            input: `${theme}製品の認知度向上キャンペーン`,
            output: `多角的なマーケティング戦略と実行計画`,
          },
        ],
      },
    }

    const categoryKey = category as keyof typeof templates
    return templates[categoryKey] || templates["ビジネス"]
  } catch (error) {
    console.error("AI generation error:", error)
    throw new Error("プロンプトの生成に失敗しました")
  }
}

export default function CreatePromptPage() {
  const [theme, setTheme] = useState("")
  const [category, setCategory] = useState("")
  const [purpose, setPurpose] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState<any>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!theme || !category) return

    setIsGenerating(true)
    setError(null)

    try {
      const result = await generatePromptWithAI(theme, category, purpose)
      setGeneratedPrompt(result)
    } catch (error) {
      console.error("プロンプト生成エラー:", error)
      setError("プロンプトの生成に失敗しました。もう一度お試しください。")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = () => {
    if (!generatedPrompt) return

    try {
      const customPrompts = JSON.parse(safeLocalStorage.getItem("customPrompts") || "[]")
      const newPrompt = {
        id: Date.now(),
        ...generatedPrompt,
        category,
        isCustom: true,
        createdAt: new Date().toISOString(),
      }

      customPrompts.push(newPrompt)
      safeLocalStorage.setItem("customPrompts", JSON.stringify(customPrompts))

      alert("プロンプトが保存されました！")
    } catch (error) {
      console.error("保存エラー:", error)
      alert("保存に失敗しました。もう一度お試しください。")
    }
  }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error("コピーエラー:", error)
      // フォールバック処理
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

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
      <main className="relative z-10 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12 px-4">
            <div className="flex flex-col items-center gap-2 mb-4">
              <Wand2 className="h-6 w-6 md:h-8 md:w-8 text-white" />
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">カスタムプロンプト作成</h1>
            </div>
            <p className="text-lg md:text-xl text-gray-300 px-2">AIがあなたのテーマに最適なプロンプトを生成します</p>
          </div>

          {/* Form Section */}
          <Card className="bg-gray-900/60 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                プロンプト生成設定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
              <div>
                <Label htmlFor="theme" className="text-white text-sm md:text-base">
                  テーマ *
                </Label>
                <Input
                  id="theme"
                  placeholder="例: AI、サステナビリティ、リモートワーク"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 mt-1 text-sm md:text-base"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-white text-sm md:text-base">
                  カテゴリ *
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white mt-1 text-sm md:text-base">
                    <SelectValue placeholder="カテゴリを選択してください" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-600 text-white">
                    <SelectItem value="ビジネス" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                      ビジネス
                    </SelectItem>
                    <SelectItem value="技術" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                      技術
                    </SelectItem>
                    <SelectItem value="マーケティング" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                      マーケティング
                    </SelectItem>
                    <SelectItem value="教育" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                      教育
                    </SelectItem>
                    <SelectItem value="クリエイティブ" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                      クリエイティブ
                    </SelectItem>
                    <SelectItem value="分析" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                      分析
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="purpose" className="text-white text-sm md:text-base">
                  目的・用途
                </Label>
                <Textarea
                  id="purpose"
                  placeholder="どのような目的でプロンプトを使用しますか？（任意）"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 mt-1 text-sm md:text-base"
                  rows={3}
                />
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 md:p-4">
                  <p className="text-red-300 text-sm md:text-base">{error}</p>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={!theme || !category || isGenerating}
                className="w-full bg-white text-black hover:bg-gray-200 text-sm md:text-base py-2 md:py-3"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    AIが生成中...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    プロンプトを生成
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Prompt Section */}
          {generatedPrompt && (
            <Card className="bg-gray-900/60 border-gray-700">
              <CardHeader className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                    <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
                    生成されたプロンプト
                  </CardTitle>
                  <Badge variant="outline" className="border-gray-600 text-gray-300 self-start sm:self-center">
                    {category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
                {/* Title and Description */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                    {generatedPrompt.title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">{generatedPrompt.description}</p>
                </div>

                {/* Template */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h4 className="text-base md:text-lg font-semibold text-white">プロンプトテンプレート</h4>
                    <Button
                      onClick={() => copyToClipboard(generatedPrompt.template, "template")}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-white hover:bg-gray-800 bg-transparent text-xs md:text-sm self-start sm:self-center"
                    >
                      <Copy className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      {copiedId === "template" ? "コピー完了!" : "コピー"}
                    </Button>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 md:p-4 overflow-x-auto">
                    <pre className="text-gray-300 whitespace-pre-wrap font-mono text-xs md:text-sm leading-relaxed">
                      {generatedPrompt.template}
                    </pre>
                  </div>
                </div>

                {/* Use Cases */}
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-white mb-3">主な使用例</h4>
                  <ul className="space-y-2">
                    {generatedPrompt.useCases?.map((useCase: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300 text-sm md:text-base">
                        <span className="text-white mt-1 text-xs md:text-sm">•</span>
                        <span className="leading-relaxed">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tips */}
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-white mb-3">効果的な使用のコツ</h4>
                  <ul className="space-y-2">
                    {generatedPrompt.tips?.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300 text-sm md:text-base">
                        <span className="text-white mt-1">💡</span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 border-t border-gray-700">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-white text-black hover:bg-gray-200 text-sm md:text-base py-2 md:py-3"
                  >
                    プロンプトを保存
                  </Button>
                  <Button
                    onClick={() => setGeneratedPrompt(null)}
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800 bg-transparent text-sm md:text-base py-2 md:py-3"
                  >
                    新しく作成
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
