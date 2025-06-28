"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Copy,
  Download,
  Zap,
  Code,
  Palette,
  PenTool,
  TrendingUp,
  Database,
  Lightbulb,
  Briefcase,
  GraduationCap,
  Languages,
  Target,
  Eye,
} from "lucide-react"

const MatrixRain = () => {
  const [drops, setDrops] = useState<Array<{ id: number; x: number; y: number; speed: number }>>([])

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

      ctx.fillStyle = "#00ff41"
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

  return <canvas id="matrix-canvas" className="fixed inset-0 pointer-events-none opacity-20" style={{ zIndex: -1 }} />
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
    color: "from-green-500 to-emerald-600",
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
    color: "from-purple-500 to-pink-600",
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
  {
    id: 3,
    title: "コンテンツライティング",
    category: "ライティング",
    icon: PenTool,
    description: "魅力的なコンテンツ作成テンプレート",
    template:
      "あなたは経験豊富なコンテンツライターです。以下の条件で魅力的な[コンテンツタイプ]を作成してください：\n\nテーマ：[テーマ]\nターゲット：[ターゲット読者]\n目的：[コンテンツの目的]\n文字数：[文字数]\nトーン：[文体・トーン]\n\nSEOを意識し、読者の関心を引く構成で作成してください。",
    color: "from-blue-500 to-cyan-600",
    detailedDescription:
      "魅力的で効果的なコンテンツを作成するためのテンプレートです。SEO対策と読者エンゲージメントの両方を考慮した高品質なコンテンツ制作をサポートします。",
    useCases: ["ブログ記事の執筆", "商品説明文の作成", "メールマガジンの企画", "SNS投稿コンテンツの制作"],
    tips: [
      "ターゲット読者のペルソナを明確にする",
      "キーワードを自然に組み込む",
      "読みやすい構成を心がける",
      "CTA（行動喚起）を効果的に配置する",
    ],
    examples: [
      {
        input: "新商品のプレスリリース作成",
        output: "メディア向けの魅力的なプレスリリース文を生成",
      },
      {
        input: "技術ブログの解説記事",
        output: "初心者にも分かりやすい技術解説記事を作成",
      },
    ],
  },
  {
    id: 4,
    title: "マーケティング戦略",
    category: "マーケティング",
    icon: TrendingUp,
    description: "効果的なマーケティング戦略の立案",
    template:
      "あなたはマーケティング戦略の専門家です。以下の製品/サービスのマーケティング戦略を立案してください：\n\n製品/サービス：[製品名]\nターゲット市場：[市場]\n予算：[予算範囲]\n期間：[実施期間]\n目標：[KPI・目標]\n\n市場分析、競合分析、具体的な施策を含む包括的な戦略を提案してください。",
    color: "from-orange-500 to-red-600",
    detailedDescription:
      "包括的なマーケティング戦略を立案するためのテンプレートです。市場分析から具体的な施策まで、データに基づいた戦略的アプローチを提供します。",
    useCases: [
      "新商品のローンチ戦略",
      "既存サービスの拡販計画",
      "ブランド認知度向上施策",
      "デジタルマーケティング戦略",
    ],
    tips: ["SWOT分析を活用する", "競合他社の動向を調査する", "測定可能なKPIを設定する", "予算配分を明確にする"],
    examples: [
      {
        input: "SaaSプロダクトの顧客獲得戦略",
        output: "リードジェネレーションからコンバージョンまでの戦略",
      },
      {
        input: "地域密着型サービスのマーケティング",
        output: "ローカルSEOとコミュニティマーケティング戦略",
      },
    ],
  },
  {
    id: 5,
    title: "データ分析レポート",
    category: "データ分析",
    icon: Database,
    description: "データから洞察を抽出するテンプレート",
    template:
      "あなたはデータアナリストです。以下のデータについて詳細な分析レポートを作成してください：\n\nデータセット：[データの種類]\n分析期間：[期間]\n分析目的：[目的]\n重要指標：[KPI]\n\nトレンド分析、異常値の検出、ビジネスへの影響、改善提案を含む包括的なレポートを作成してください。",
    color: "from-indigo-500 to-purple-600",
    detailedDescription:
      "データから有意義な洞察を抽出し、ビジネス価値のあるレポートを作成するためのテンプレートです。統計的分析と実用的な提案を組み合わせます。",
    useCases: ["売上データの分析", "ユーザー行動の解析", "A/Bテストの結果評価", "市場トレンドの調査"],
    tips: [
      "データの品質を事前に確認する",
      "可視化を効果的に活用する",
      "統計的有意性を検証する",
      "実行可能な提案を含める",
    ],
    examples: [
      {
        input: "ECサイトの購買データ分析",
        output: "顧客セグメント別の購買パターンと改善提案",
      },
      {
        input: "アプリのユーザーエンゲージメント分析",
        output: "ユーザー離脱要因の特定と改善策",
      },
    ],
  },
  {
    id: 6,
    title: "クリエイティブアイデア生成",
    category: "クリエイティブ",
    icon: Lightbulb,
    description: "革新的なアイデアを生み出すプロンプト",
    template:
      "あなたは創造性豊かなアイデアジェネレーターです。以下のテーマで革新的なアイデアを10個生成してください：\n\nテーマ：[テーマ]\n制約条件：[制約]\n対象者：[ターゲット]\n予算：[予算範囲]\n\n各アイデアについて、実現可能性、独創性、インパクトの観点から評価し、最も有望なアイデア3つを詳しく説明してください。",
    color: "from-yellow-500 to-orange-600",
    detailedDescription:
      "創造的思考を刺激し、革新的なアイデアを体系的に生成するためのテンプレートです。ブレインストーミングから実現可能性の評価まで包括的にサポートします。",
    useCases: [
      "新商品・サービスの企画",
      "マーケティングキャンペーンの立案",
      "業務改善アイデアの創出",
      "イベント企画の発想",
    ],
    tips: [
      "制約を明確に設定する",
      "多角的な視点を取り入れる",
      "実現可能性も考慮する",
      "アイデアの組み合わせも検討する",
    ],
    examples: [
      {
        input: "リモートワーク支援サービスのアイデア",
        output: "10個の革新的なサービス案と実現可能性評価",
      },
      {
        input: "環境配慮型パッケージングのアイデア",
        output: "持続可能性と実用性を両立したパッケージ案",
      },
    ],
  },
  {
    id: 7,
    title: "ビジネスプラン作成",
    category: "ビジネス",
    icon: Briefcase,
    description: "包括的なビジネスプランテンプレート",
    template:
      "あなたはビジネスコンサルタントです。以下のビジネスアイデアの詳細なビジネスプランを作成してください：\n\nビジネスアイデア：[アイデア]\n市場：[ターゲット市場]\n競合：[主要競合]\n資金：[初期資金]\n\n市場分析、収益モデル、マーケティング戦略、財務計画、リスク分析を含む包括的なプランを作成してください。",
    color: "from-gray-500 to-slate-600",
    detailedDescription:
      "実行可能なビジネスプランを体系的に作成するためのテンプレートです。市場分析から財務計画まで、投資家や関係者に説得力のある計画書を作成できます。",
    useCases: ["スタートアップの事業計画", "新規事業の提案書", "投資家向けピッチ資料", "事業拡大計画の策定"],
    tips: [
      "市場規模を具体的に調査する",
      "競合分析を詳細に行う",
      "財務予測は保守的に見積もる",
      "リスクと対策を明確にする",
    ],
    examples: [
      {
        input: "AIを活用した教育サービス",
        output: "市場分析から収益予測まで包括的なビジネスプラン",
      },
      {
        input: "サステナブルファッションブランド",
        output: "ESG投資を意識したビジネスモデル設計",
      },
    ],
  },
  {
    id: 8,
    title: "教育コンテンツ設計",
    category: "教育",
    icon: GraduationCap,
    description: "効果的な学習体験を設計",
    template:
      "あなたは教育設計の専門家です。以下のトピックについて効果的な教育コンテンツを設計してください：\n\nトピック：[学習テーマ]\n対象者：[学習者のレベル]\n学習時間：[想定時間]\n学習目標：[達成目標]\n\n学習目標、カリキュラム構成、教材、評価方法を含む包括的な教育プログラムを設計してください。",
    color: "from-teal-500 to-green-600",
    detailedDescription:
      "効果的な学習体験を設計するためのテンプレートです。学習理論に基づいた体系的なアプローチで、学習者の理解と定着を促進する教育コンテンツを作成できます。",
    useCases: ["企業研修プログラムの設計", "オンライン講座の企画", "技術トレーニングの構築", "学習教材の開発"],
    tips: [
      "学習者のレベルに合わせる",
      "実践的な演習を含める",
      "段階的な学習設計を心がける",
      "フィードバック機会を設ける",
    ],
    examples: [
      {
        input: "プログラミング初心者向けPython講座",
        output: "基礎から実践まで段階的な学習プログラム",
      },
      {
        input: "マネジメント研修プログラム",
        output: "ケーススタディを活用した実践的研修設計",
      },
    ],
  },
  {
    id: 9,
    title: "多言語翻訳・ローカライゼーション",
    category: "翻訳",
    icon: Languages,
    description: "文化的配慮を含む翻訳テンプレート",
    template:
      "あなたは多言語翻訳とローカライゼーションの専門家です。以下のテキストを[対象言語]に翻訳し、文化的配慮を含めてローカライズしてください：\n\n原文：[翻訳対象テキスト]\n対象地域：[地域]\n用途：[使用目的]\nトーン：[文体]\n\n直訳だけでなく、現地の文化や慣習に適した表現に調整し、説明も含めてください。",
    color: "from-rose-500 to-pink-600",
    detailedDescription:
      "単純な翻訳を超えて、文化的な文脈を考慮したローカライゼーションを行うためのテンプレートです。地域特性や文化的ニュアンスを反映した自然な翻訳を提供します。",
    useCases: ["Webサイトの多言語化", "マーケティング資料の翻訳", "製品マニュアルのローカライズ", "アプリのUI翻訳"],
    tips: [
      "対象地域の文化を理解する",
      "現地の表現習慣を調査する",
      "法的・規制要件も確認する",
      "ネイティブチェックを推奨する",
    ],
    examples: [
      {
        input: "日本のECサイトを英語圏向けに翻訳",
        output: "文化的配慮を含む自然な英語表現への変換",
      },
      {
        input: "技術文書の中国語ローカライズ",
        output: "専門用語と文化的文脈を考慮した翻訳",
      },
    ],
  },
  {
    id: 10,
    title: "問題解決フレームワーク",
    category: "問題解決",
    icon: Target,
    description: "体系的な問題解決アプローチ",
    template:
      "あなたは問題解決の専門家です。以下の問題について体系的なアプローチで解決策を提案してください：\n\n問題：[具体的な問題]\n背景：[問題の背景]\n制約：[制約条件]\n期限：[解決期限]\n\n問題の根本原因分析、複数の解決策の提案、各案のメリット・デメリット、推奨案の詳細実行計画を含めてください。",
    color: "from-emerald-500 to-teal-600",
    detailedDescription:
      "複雑な問題を体系的に分析し、実行可能な解決策を導き出すためのテンプレートです。論理的思考と創造的アプローチを組み合わせた問題解決手法を提供します。",
    useCases: ["業務プロセスの改善", "技術的課題の解決", "組織運営の問題解決", "プロジェクトの課題対応"],
    tips: ["問題を明確に定義する", "根本原因を深掘りする", "複数の解決策を検討する", "実行可能性を重視する"],
    examples: [
      {
        input: "チームの生産性低下問題",
        output: "原因分析と段階的改善プランの提案",
      },
      {
        input: "システムパフォーマンス問題",
        output: "技術的解決策と運用改善案の提示",
      },
    ],
  },
]

export default function Component() {
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof promptTemplates)[0] | null>(null)

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <MatrixRain />

      {/* Header */}
      <header className="relative z-10 border-b border-green-500/20 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-green-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                PROMPT MATRIX
              </h1>
            </div>
            <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              全テンプレートをダウンロード
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
              プロンプトの力を
              <br />
              解き放て
            </h2>
            <p className="text-xl text-green-300/80 mb-8 leading-relaxed">
              AIとの対話を革命的に変える、厳選されたプロンプトテンプレート集。
              <br />
              あなたの創造性と生産性を次のレベルへ導きます。
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-black font-semibold"
              >
                テンプレートを探索
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-500/10 bg-transparent"
              >
                使い方を学ぶ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-12 border-y border-green-500/20 bg-green-500/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">10+</div>
              <div className="text-green-300/80">プロフェッショナルテンプレート</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-green-300/80">カスタマイズ可能</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">∞</div>
              <div className="text-green-300/80">創造の可能性</div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              プロンプトテンプレート
            </h3>
            <p className="text-green-300/80 text-lg">あらゆる用途に対応する、厳選されたプロンプトテンプレート集</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promptTemplates.map((template) => {
              const IconComponent = template.icon
              return (
                <Card
                  key={template.id}
                  className="bg-black/60 border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 group"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${template.color}`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <Badge variant="outline" className="border-green-500/50 text-green-400">
                        {template.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-green-300 group-hover:text-green-200 transition-colors">
                      {template.title}
                    </CardTitle>
                    <CardDescription className="text-green-400/70">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 mb-4">
                      <pre className="text-sm text-green-300/90 whitespace-pre-wrap font-mono leading-relaxed">
                        {template.template.length > 200
                          ? `${template.template.substring(0, 200)}...`
                          : template.template}
                      </pre>
                    </div>

                    <div className="flex gap-2 mb-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => setSelectedTemplate(template)}
                            variant="outline"
                            className="flex-1 border-green-500/50 text-green-400 hover:bg-green-500/10 bg-transparent"
                            size="sm"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            詳細を見る
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-black/95 border-green-500/30 text-green-300">
                          <DialogHeader>
                            <DialogTitle className="text-2xl text-green-400 flex items-center gap-2">
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${template.color}`}>
                                <IconComponent className="h-6 w-6 text-white" />
                              </div>
                              {template.title}
                            </DialogTitle>
                            <DialogDescription className="text-green-400/70">
                              {template.detailedDescription}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6">
                            {/* プロンプトテンプレート */}
                            <div>
                              <h3 className="text-lg font-semibold text-green-400 mb-3">プロンプトテンプレート</h3>
                              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                                <pre className="text-sm text-green-300/90 whitespace-pre-wrap font-mono leading-relaxed">
                                  {template.template}
                                </pre>
                              </div>
                            </div>

                            {/* 使用例 */}
                            <div>
                              <h3 className="text-lg font-semibold text-green-400 mb-3">主な使用例</h3>
                              <ul className="space-y-2">
                                {template.useCases?.map((useCase, index) => (
                                  <li key={index} className="flex items-start gap-2 text-green-300/80">
                                    <span className="text-green-400 mt-1">•</span>
                                    {useCase}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* 使用のコツ */}
                            <div>
                              <h3 className="text-lg font-semibold text-green-400 mb-3">効果的な使用のコツ</h3>
                              <ul className="space-y-2">
                                {template.tips?.map((tip, index) => (
                                  <li key={index} className="flex items-start gap-2 text-green-300/80">
                                    <span className="text-green-400 mt-1">💡</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* 実例 */}
                            {template.examples && (
                              <div>
                                <h3 className="text-lg font-semibold text-green-400 mb-3">実例</h3>
                                <div className="space-y-4">
                                  {template.examples.map((example, index) => (
                                    <div
                                      key={index}
                                      className="bg-green-500/5 border border-green-500/20 rounded-lg p-4"
                                    >
                                      <div className="mb-2">
                                        <span className="text-green-400 font-medium">入力例:</span>
                                        <p className="text-green-300/80 mt-1">{example.input}</p>
                                      </div>
                                      <div>
                                        <span className="text-green-400 font-medium">期待される出力:</span>
                                        <p className="text-green-300/80 mt-1">{example.output}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* コピーボタン */}
                            <div className="flex gap-2 pt-4 border-t border-green-500/20">
                              <Button
                                onClick={() => copyToClipboard(template.template, template.id)}
                                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white"
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                {copiedId === template.id ? "コピー完了!" : "テンプレートをコピー"}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <Button
                      onClick={() => copyToClipboard(template.template, template.id)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white"
                      size="sm"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copiedId === template.id ? "コピー完了!" : "クイックコピー"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-t border-green-500/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              AIの真の力を解放しよう
            </h3>
            <p className="text-xl text-green-300/80 mb-8">
              これらのプロンプトテンプレートで、あなたのAI体験を革命的に変えてください。
              今すぐ始めて、無限の可能性を探索しましょう。
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-black font-semibold"
              >
                今すぐ始める
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-500/10 bg-transparent"
              >
                詳細を見る
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-green-500/20 bg-black/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-6 w-6 text-green-400" />
            <span className="text-lg font-bold text-green-400">PROMPT MATRIX</span>
          </div>
          <p className="text-green-400/60">© 2024 Prompt Matrix. AIの力で未来を創造する。</p>
        </div>
      </footer>
    </div>
  )
}
