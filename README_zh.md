# friday

AI 编码代理的一键式个人开发工作流。

## 快速开始

```bash
npx friday init
npx friday init --force
npx friday --help
npx friday --version
```

这会**全局安装**到 `~/.claude/`：

- **命令目录** — 所有项目可用
- **代理集合** — 架构师、开发者、测试员
- **Context7 MCP** — 实时库文档
- **规范模板** — 复制到当前项目的 `specs/`
- **记忆模板** — 复制到当前项目的 `memory/`

## 安装方式

### 方式 1: CLI（推荐）

```bash
npx friday init
npx friday init --force
npx friday --help
npx friday --version
```

- `init` 默认保留已有文件。
- `init --force` 会覆盖 friday 管理的命令、代理、spec 模板、memory 模板，以及 Context7 配置项。
- `--help` 用于查看当前命令目录和安装行为说明。
- `--version` / `-v` 用于输出 CLI 版本。

### 方式 2: Claude Code 插件

```bash
# 通过已发布的 marketplace 条目
/plugin marketplace add <owner>/<marketplace-repo>
/plugin install friday

# 或手动复制
cp -r .claude-plugin/ ~/.claude/plugins/friday/
cp -r templates/commands/ ~/.claude/commands/
cp -r templates/agents/ ~/.claude/agents/
```

### 方式 3: Codex 插件

```bash
# 通过 Codex CLI
codex plugin install friday

# 或手动复制
cp -r .codex-plugin/ ~/.codex/plugins/friday/
```

### 方式 4: 手动安装

```bash
cp templates/CLAUDE.md ~/.claude/CLAUDE.md
cp -r templates/commands/ ~/.claude/commands/
cp -r templates/agents/ ~/.claude/agents/
cp -r templates/specs/ ./specs/
cp -r templates/memory/ ./memory/
```

## 命令

### 快速操作（独立使用）

当不需要完整工作流时使用：

| 命令 | 功能 |
|------|------|
| `/friday:hotfix` | 快速修复 bug — 跳过头脑风暴，直接修复 |
| `/friday:tweak` | 小改动 — 跳过头脑风暴，直接调整 |
| `/friday:debug` | 系统化调试 — 找到并修复根本原因 |
| `/friday:tdd` | 测试驱动开发 — RED-GREEN-REFACTOR |
| `/friday:simplify` | 代码简化 — 降低复杂度 |
| `/friday:security` | 安全审查 — 发现并修复漏洞 |

### 记忆和发现

| 命令 | 功能 |
|------|------|
| `/friday:memory` | 查看和管理项目记忆 |
| `/friday:find-skill` | 搜索和发现可用 skills |

### 知识指南

| 命令 | 功能 |
|------|------|
| `/friday:api` | API 设计模式和最佳实践 |
| `/friday:frontend` | 前端开发模式（React、Next.js） |
| `/friday:backend` | 后端开发模式（API、数据库） |
| `/friday:deploy` | 部署工作流和 CI/CD 模式 |

### 完整工作流

| 命令 | 功能 |
|------|------|
| `/friday:brainstorm` | 将粗略想法转化为结构化设计 |
| `/friday:spec` | 编写结构化规范（需求、约束、接口） |
| `/friday:plan` | 将规范分解为可执行任务 |
| `/friday:gen` | 根据规范和计划生成代码 |
| `/friday:review` | 根据规范审查代码 |
| `/friday:verify` | 验证需求覆盖和残留风险 |
| `/friday:commit` | 一键提交（lint + test + commit） |

## 工作流

### 完整工作流

```
/friday:brainstorm → /friday:spec → /friday:plan → /friday:gen → /friday:review → /friday:verify → /friday:commit
```

Friday 命令都可以独立执行，但在合适的时候会推荐工作流中的下一步。

### 快速操作

| 场景 | 使用 |
|------|------|
| 修复 bug | `/friday:hotfix` |
| 小的文本/配置改动 | `/friday:tweak` |
| 调查问题 | `/friday:debug` |
| 编写带测试的代码 | `/friday:tdd` |
| 清理复杂代码 | `/friday:simplify` |
| 安全审计 | `/friday:security` |
| 设计 API | `/friday:api` |
| 构建前端 | `/friday:frontend` |
| 构建后端 | `/friday:backend` |
| 部署应用 | `/friday:deploy` |

## 代理

| 代理 | 角色 |
|------|------|
| architect（架构师） | 制定计划和任务列表 |
| developer（开发者） | 实现任务并编写测试 |
| tester（测试员） | 立即验证每个任务 |

## 外部依赖

### MCP 服务器

| 服务器 | 用途 |
|--------|------|
| **Context7** | 实时开源库文档 |
| **GitHub** | PR、Issue 和仓库管理 |
| **Memory** | 跨会话持久化记忆 |

### Skills

| 来源 | 用途 |
|------|------|
| **skills.sh** | 搜索和安装社区 skills |
| **ECC Skills** | 来自 everything-claude-code 的高质量 skills |

**边界说明：** friday 命令是内置工作流命令；外部 skill 只是可选集成或社区扩展，不等同于 `/friday:*` 命令目录。

#### ECC Skill 集成

Friday 利用 everything-claude-code 生态系统中经过实战检验的 skills：

| Friday 命令 | ECC Skill | 用途 |
|-------------|-----------|------|
| `/friday:tdd` | `tdd-workflow` | 全面的 TDD，80%+ 覆盖率 |
| `/friday:security` | `security-review` | OWASP Top 10 预防和最佳实践 |
| `/friday:review` | `code-review` | 五维审查框架 |
| `/friday:api` | `api-design` | REST API 设计模式 |
| `/friday:frontend` | `frontend-patterns` | React/Next.js 模式 |
| `/friday:backend` | `backend-patterns` | API、数据库、缓存模式 |
| `/friday:deploy` | `deployment-patterns` | CI/CD 和部署工作流 |

## 规范格式

Friday 使用 Markdown + YAML frontmatter 作为规范格式：

```markdown
---
type: feature
status: draft
created: 2026-06-12
tags: [auth]
---

# 规范：用户登录

## 需求
- 支持邮箱 + 密码登录
- JWT token 签发

## 约束
- 密码 bcrypt 加密
- Token 有效期 24 小时

## 验收标准
- [ ] 登录返回 JWT
- [ ] 密码错误返回 401
```

规范存储在 `specs/` 目录并由 git 跟踪。

## 记忆

Friday 包含记忆系统，用于跨会话持久化决策、偏好和模式。

详见 [templates/memory/](templates/memory/) 中的示例。

## 项目结构

```
friday/
├── bin/
│   ├── friday.js                # CLI 入口
│   └── friday.test.js           # CLI 测试
├── src/
│   ├── catalog.js               # 共享命令/代理目录
│   ├── setup.js                 # 全局安装器
│   ├── setup.test.js            # 安装器测试
│   ├── metadata.test.js         # 元数据一致性测试
│   └── package-validation.test.js # 打包边界测试
├── scripts/
│   ├── sync-metadata.js         # 从 package.json 同步插件清单
│   └── check-package.js         # 校验打包文件允许/禁止列表
├── templates/
│   ├── CLAUDE.md                # → ~/.claude/CLAUDE.md
│   ├── commands/                # → ~/.claude/commands/
│   ├── agents/                  # → ~/.claude/agents/
│   ├── specs/                   # → ./specs/（每个项目）
│   └── memory/                  # → ./memory/（每个项目）
├── .claude-plugin/              # Claude Code 插件配置
│   ├── plugin.json
│   └── marketplace.json
├── .codex-plugin/               # Codex 插件清单
│   └── plugin.json
├── package.json
├── README.md
├── README_zh.md
├── PUBLISHING.md
├── TESTING.md
└── CLAUDE.md
```

## 支持的平台

| 平台 | 配置目录 | 安装命令 |
|------|----------|----------|
| **Claude Code** | `.claude-plugin/` | `npx friday init` 或 `/plugin install` |
| **Codex** | `.codex-plugin/` | `codex plugin install friday` |
| **通用 CLI** | `templates/` | `npx friday init` |

## 设计原则

- **一键命令** — `npx friday init` 设置一切
- **可独立运行** — 命令可以单独使用，但工作流会在合适时推荐下一步
- **规范驱动** — brainstorm → spec → plan → gen → review → verify → commit
- **代理角色** — 架构师、开发者、测试员的结构化工作流
- **节省 token** — 只加载您调用的内容
- **多平台** — 支持 Claude Code、Codex 和通用 CLI

## 模板分层

Friday 内置两类命令：

1. **工作流命令** — 从想法一路推进到验证：brainstorm、spec、plan、gen、review、verify、commit。
2. **知识指南** — 独立提供领域方法论：api、frontend、backend、deploy。

## 测试

```bash
npm test               # 运行所有测试
node --test src/*.test.js bin/*.test.js  # 直接运行测试
```

详见 [TESTING.md](TESTING.md)。

## 贡献

1. Fork 仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'feat: add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 创建 Pull Request

## 许可证

MIT
