---
# ═══════════════════════════════════════════════════════════════
# 事业面板 · 数据契约(方案 B)
# 结构化状态全部住在这份 frontmatter —— 这是唯一来源,网站只读这里渲染。
# 正文只放叙事(表格 / case / narrative),不再重复写 Status。
# 推进状态 = 改这里的字段;跨里程碑时向 events 记一条(见 ROADMAP)。
# ═══════════════════════════════════════════════════════════════

# ── 面板身份 ──────────────────────────────────────────────
title: Career Turnaround
slug: career-turnaround
kind: panel            # 在 lab-play 里这是一个「面板」(state 型工具)
domain: career         # 归属领域(领域是面板分级的一层,暂未展开为一级导航)
schema_version: 0.2    # 0.1→0.2:状态提取进 frontmatter(方案 B)
last_updated: 2026-09-10
review_cycle: weekly

# ── 全局状态(首页 career 卡 / Dashboard widget 直接取用)──
enabled: false         # 通关开关:达成下方 activation 全部条件才置 true
readiness_level: 0     # 0–5,见正文「Readiness level」图例
career_rto: unknown    # 失业后进入正式面试所需的恢复时间

# 关键焦点(供 Dashboard widget、首页卡的「下一步」一行直接取)
primary_lanes: []
current_bottleneck: ""
biggest_unknown: ""
next_action: ""

# ── 9 条子技能线的状态(唯一来源;正文对应 section 不再写 Status)──
# status ∈ EMPTY | MAPPED | BUILT | TESTED | MAINTAINED(见正文「Status scale」)
# confidence: 0–5   dod: 已完成 / 该线 Definition of done 总数
sections:
  market_map:          { status: EMPTY, confidence: 0, dod: "0/5" }   # 外面的世界什么样
  target_positioning:  { status: EMPTY, confidence: 0, dod: "0/5" }   # 我是什么工程师
  capability_map:      { status: EMPTY, confidence: 0, dod: "0/5" }   # 能力拆成字段+证据+gap
  evidence_bank:       { status: EMPTY, confidence: 0, dod: "0/5" }   # 能力→可调用的证据
  resume_pack:         { status: EMPTY, confidence: 0, dod: "0/6" }   # 序列化成市场接口
  interview_readiness: { status: EMPTY, confidence: 0, dod: "0/5" }   # 被调用时接口能跑通
  opportunity_access:  { status: EMPTY, confidence: 0, dod: "0/4" }   # 准备好后真能接触机会
  decision_framework:  { status: EMPTY, confidence: 0, dod: "0/4" }   # 什么值得走
  maintenance:         { status: EMPTY, confidence: 0, dod: "0/5" }   # 别半年后锁回黑盒

# ── 通关条件进度(Activation Criteria;网站可渲染成进度条)──
activation:
  level1_all_mapped:            false   # 所有一级字段 ≥ MAPPED
  market_map_built:             false
  positioning_built:            false
  capability_built:             false
  evidence_built:               false
  resume_built:                 false
  interview_built_key_tested:   false   # Interview Readiness ≥ BUILT 且关键模块 TESTED
  opportunity_built:            false
  decision_built:               false
  maintenance_defined:          false
  rto_known:                    false   # Career RTO 不再是 unknown
  can_triage_jd:                false   # 收到真实 JD 能快速判断 fit/gap/是否投/准备什么
---

# Career Turnaround

> Goal: turn “随时转身” from an abstract wish into an inspectable, testable, maintainable skill.
>
> `enabled = true` does **not** mean “I can get any offer anytime”.
> It means: I know the market, know my position, know my gaps, have a usable resume and evidence bank, can enter interview-prep mode quickly, know where opportunities come from, and know how to decide whether an opportunity is worth taking.

> **本文档是「事业面板」的自持状态(文档态)。** 仪表盘、9 条线的状态、通关进度都由上方 frontmatter 提供,网站据此渲染;下面的正文是每条线的叙事与填写区。推进方式:编辑 frontmatter 的字段 + 在对应正文里补内容。

---

## 图例(scales)

### Status scale — 每条子技能线的状态

- `EMPTY` — 基本没有内容 / 完全未知
- `MAPPED` — 已知道这个字段应该包含什么,黑盒被打开
- `BUILT` — 已有可用版本
- `TESTED` — 已经过真实 JD、mock、同行反馈或实际求职场景验证
- `MAINTAINED` — 可长期保持,不会很快退化回黑盒

### Readiness level — skill 整体等级

- `0` — Locked:职业转身是黑盒
- `1` — Visible:知道市场和自身的大致结构
- `2` — Usable:简历、能力图谱、项目材料已有基础版本
- `3` — Interview-ready:短时间内可以进入正式面试准备
- `4` — Market-ready:可以主动投递并稳定应对流程
- `5` — Maintained:长期保持低 RTO 的职业 failover 能力

---

# 1. Market Map

**Purpose:** 搞清楚“外面的世界是什么样”,把招聘市场从 `???` 变成可观察的结构。

## 1.1 Role families / Career lanes

| Lane | Typical titles | Market volume | My fit | Interest | Notes |
|---|---|---:|---:|---:|---|
| Traditional Video Codec |  |  |  |  |  |
| Perceptual Coding / JND |  |  |  |  |  |
| VQA / Video Quality |  |  |  |  |  |
| Video / Multimedia Algorithm |  |  |  |  |  |
| AI-assisted Codec |  |  |  |  |  |
| Video / Multimodal AI |  |  |  |  |  |
| Other |  |  |  |  |  |

## 1.2 Companies

| Company | Team / role | Lane | Hiring status | Seniority | Location | Comp | Source | Notes |
|---|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |  |

## 1.3 High-frequency requirements

| Requirement | Frequency | Which lanes | My current level | Gap |
|---|---:|---|---|---|
|  |  |  |  |  |

## 1.4 Hiring process

- Common interview rounds:
- Coding requirement:
- Domain depth:
- System design:
- ML / AI fundamentals:
- Behavioral:
- English:
- Typical timeline:

## 1.5 Market observations

- Hiring volume:
- Role concentration:
- Seniority trend:
- Traditional codec trend:
- AI / video crossover trend:
- Geographic distribution:
- Compensation range:
- Risks:
- Opportunities:

## Definition of done

- [ ] I can name 3–5 realistic role families I can target.
- [ ] I know which companies actually hire them.
- [ ] I have sampled enough real JDs to identify recurring requirements.
- [ ] I can distinguish “market fact” from “industry rumor / anxiety”.
- [ ] I can explain which lanes are native / adjacent / exploratory for me.

---

# 2. Target Positioning

**Purpose:** 回答“我到底是什么工程师,我想被市场如何理解”。

## 2.1 Professional identity

**One-line version**

> 

**Three-line version**

> Past:  
> Core value:  
> Next:

## 2.2 Positioning

- **Primary lane:**
- **Secondary lane(s):**
- **Exploratory lane(s):**
- **Non-target roles:**
- **Preferred technical depth:**
- **Preferred team type:**
- **Preferred company stage:**
- **Preferred location / work mode:**

## 2.3 Differentiators

What makes me more valuable than a generic candidate?

1. 
2. 
3. 
4. 

## 2.4 Career narrative

### Why my past experience makes sense

> 

### Why I may consider a move

> 

### Why the next step is a natural extension rather than a random pivot

> 

## Definition of done

- [ ] I can explain who I am in 30 seconds.
- [ ] I can explain my career direction in 2–3 minutes.
- [ ] My target lanes are explicit.
- [ ] My non-targets are explicit.
- [ ] My positioning is supported by real experience, not aspirational labels.

---

# 3. Capability Map

**Purpose:** 把“我能力不足”拆成具体字段、证据和 gap。

## 3.1 Rating rule

Use a consistent scale:

- `0 — Unknown`: 没接触 / 无法判断
- `1 — Aware`: 知道概念和接口
- `2 — Usable`: 能完成常规任务
- `3 — Strong`: 能独立诊断、优化、解释
- `4 — Expert`: 能处理复杂边界情况并指导他人

For each skill, fill: **Current level / Target level / Evidence / Interview depth / Market relevance / Gap / Priority**.

## 3.2 Domain skills

| Skill | Current | Target | Evidence | Interview depth | Market relevance | Gap | Priority |
|---|---:|---:|---|---:|---:|---|---|
| Video coding fundamentals |  |  |  |  |  |  |  |
| HEVC / x265 |  |  |  |  |  |  |  |
| Encoder optimization |  |  |  |  |  |  |  |
| RDO / lambda |  |  |  |  |  |  |  |
| Perceptual coding / JND |  |  |  |  |  |  |  |
| VQA |  |  |  |  |  |  |  |
| Video pipeline |  |  |  |  |  |  |  |
| Other codecs / standards |  |  |  |  |  |  |  |

## 3.3 Engineering skills

| Skill | Current | Target | Evidence | Interview depth | Market relevance | Gap | Priority |
|---|---:|---:|---|---:|---:|---|---|
| C / C++ |  |  |  |  |  |  |  |
| Python |  |  |  |  |  |  |  |
| Profiling |  |  |  |  |  |  |  |
| Debugging |  |  |  |  |  |  |  |
| Performance optimization |  |  |  |  |  |  |  |
| Deployment |  |  |  |  |  |  |  |
| Linux / tooling |  |  |  |  |  |  |  |
| System design |  |  |  |  |  |  |  |

## 3.4 ML / AI skills

| Skill | Current | Target | Evidence | Interview depth | Market relevance | Gap | Priority |
|---|---:|---:|---|---:|---:|---|---|
| ML fundamentals |  |  |  |  |  |  |  |
| Deep learning fundamentals |  |  |  |  |  |  |  |
| Model training |  |  |  |  |  |  |  |
| Model deployment |  |  |  |  |  |  |  |
| Transformer |  |  |  |  |  |  |  |
| Multimodal / video AI |  |  |  |  |  |  |  |
| LLM / agent engineering |  |  |  |  |  |  |  |

## 3.5 Interview / soft skills

| Skill | Current | Target | Evidence | Interview depth | Market relevance | Gap | Priority |
|---|---:|---:|---|---:|---:|---|---|
| Coding interview |  |  |  |  |  |  |  |
| Project storytelling |  |  |  |  |  |  |  |
| Technical communication |  |  |  |  |  |  |  |
| Behavioral interview |  |  |  |  |  |  |  |
| Career narrative |  |  |  |  |  |  |  |
| English interview |  |  |  |  |  |  |  |

## Definition of done

- [ ] Every important target-role requirement maps to a capability field.
- [ ] Every strong capability has evidence.
- [ ] Every important gap has a target level.
- [ ] I know which gaps affect employability vs. which are merely “nice to learn”.
- [ ] “I am not good enough” can always be translated into concrete fields.

---

# 4. Evidence Bank

**Purpose:** 把真实能力转成市场能识别、面试能调用的证据。

## 4.1 Project inventory

| Project | Context | My role | Core problem | Key decision | Result | Metric | Skills demonstrated |
|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |

## 4.2 Quantified results

- 
- 
- 

## 4.3 Difficult problems solved

### Case 1

- **Context:**
- **Problem:**
- **Why difficult:**
- **My diagnosis:**
- **Decision:**
- **Tradeoff:**
- **Result:**
- **What this proves:**

### Case 2

- **Context:**
- **Problem:**
- **Why difficult:**
- **My diagnosis:**
- **Decision:**
- **Tradeoff:**
- **Result:**
- **What this proves:**

## 4.4 Failure / recovery stories

- 
- 
- 

## 4.5 Cross-team / collaboration stories

- 
- 
- 

## 4.6 Public / semi-public evidence

- Patents:
- Papers:
- GitHub repos:
- Demos:
- Talks / docs:
- Other:

## Definition of done

- [ ] I have a complete project inventory.
- [ ] At least 3 projects can support deep technical questioning.
- [ ] At least 3 stories show judgment, debugging, tradeoffs, or collaboration.
- [ ] Important claims in the resume are traceable to evidence.
- [ ] I can retrieve a suitable story quickly during an interview.

---

# 5. Resume Pack

**Purpose:** 把 `positioning + capability + evidence` 序列化成市场接口。

## 5.1 Resume assets

- [ ] Master resume
- [ ] Chinese resume
- [ ] English resume
- [ ] Codec-focused version
- [ ] VQA / perceptual-focused version
- [ ] AI + video / adjacent version
- [ ] Privacy-safe external version

## 5.2 Resume checklist

### Header / summary

- Name / Current title / Years of experience / Professional summary / Core keywords

### Experience

For each role: Scope / Ownership / Technical depth / Quantified impact / Cross-team impact / Relevant keywords

### Projects

- 
- 
- 

### Skills

- Domain / Engineering / ML·AI / Tooling

## 5.3 Resume validation

| Target JD | Match | Missing keywords | Missing evidence | Resume changes |
|---|---:|---|---|---|
|  |  |  |  |  |

## Definition of done

- [ ] A recruiter can understand my core value in 20–30 seconds.
- [ ] The resume is outcome-oriented, not an internal work log.
- [ ] Major bullets contain scope / action / result where possible.
- [ ] Different target lanes can be supported by variants without rewriting from scratch.
- [ ] Resume claims are interview-defensible.
- [ ] At least several real JDs have been used to validate the resume.

---

# 6. Interview Readiness

**Purpose:** 当市场真正调用我时,接口能跑通。

## 6.1 Interview modules

| Module | Current state | Target state | Tested? | Main gap |
|---|---|---|---|---|
| Self introduction |  |  |  |  |
| Project deep dive |  |  |  |  |
| Codec fundamentals |  |  |  |  |
| VQA / perceptual |  |  |  |  |
| Coding |  |  |  |  |
| System design |  |  |  |  |
| ML / AI fundamentals |  |  |  |  |
| Behavioral |  |  |  |  |
| Career questions |  |  |  |  |
| English |  |  |  |  |

## 6.2 Core answers

### 60-second self introduction

> 

### Why are you looking?

> 

### What are you looking for next?

> 

### Strongest project

> 

### Most difficult technical problem

> 

### Failure / disagreement / tradeoff

> 

## 6.3 Mock interview log

| Date | Type | Interviewer / Agent | Score | Failure points | Follow-up |
|---|---|---|---:|---|---|
|  |  |  |  |  |  |

## 6.4 Failure log

| Failure | Category | Severity | Root cause | Fix | Retest |
|---|---|---:|---|---|---|
|  |  |  |  |  |  |

## Definition of done

- [ ] I have mapped likely interview modules for target roles.
- [ ] I have actually performed mock interviews.
- [ ] I can explain key projects without relying on notes.
- [ ] Failure points are logged as specific repairable problems.
- [ ] I know what I would prepare if an interview were scheduled next week.

---

# 7. Opportunity Access

**Purpose:** 保证“准备好了”之后真的能接触到机会。

## 7.1 Target company pool

| Company | Lane | Priority | Contact / referral | Hiring page | Notes |
|---|---|---:|---|---|---|
|  |  |  |  |  |  |

## 7.2 Channels

- Job platforms / Recruiters / Former colleagues / Friends·referrals / Professional communities / GitHub·technical network / Other

## 7.3 Application infrastructure

- [ ] Job platform profiles updated
- [ ] Resume versions stored and accessible
- [ ] Contact info professional and current
- [ ] Application tracker ready
- [ ] Referral message template ready
- [ ] Recruiter reply template ready

## Definition of done

- [ ] If I decide to start tomorrow, I know where to find real openings.
- [ ] I have multiple channels, not a single platform dependency.
- [ ] I know who I can contact for referrals or market information.
- [ ] My application materials can be sent without emergency preparation.

---

# 8. Decision Framework

**Purpose:** 不只是“能不能走”,还要知道“什么值得走”。

## 8.1 Must-haves / Nice-to-haves / Deal breakers

**Must-haves**
- 
- 

**Nice-to-haves**
- 
- 

**Deal breakers**
- 
- 

## 8.2 Decision fields

| Field | Minimum | Preferred | Notes |
|---|---|---|---|
| Compensation |  |  |  |
| Role content |  |  |  |
| Technical growth |  |  |  |
| Stability |  |  |  |
| Team quality |  |  |  |
| Manager |  |  |  |
| Work intensity |  |  |  |
| Location |  |  |  |
| Company stage |  |  |  |
| Long-term option value |  |  |  |

## 8.3 Risk policy

- Acceptable uncertainty:
- Acceptable compensation tradeoff:
- Acceptable domain pivot:
- Startup risk tolerance:
- When to prefer stability:
- When to prefer growth:

## Definition of done

- [ ] I know the minimum conditions for saying yes.
- [ ] I know which tradeoffs I am willing to make.
- [ ] Anxiety alone cannot force me into a bad move.
- [ ] I have a consistent way to compare opportunities.

---

# 9. Maintenance

**Purpose:** 防止 `career_turnaround` 在半年后重新锁回去。

## 9.1 Maintenance loop

| Item | Frequency | Last done | Next | Notes |
|---|---|---|---|---|
| Market refresh |  |  |  |  |
| Resume refresh |  |  |  |  |
| Project evidence capture |  |  |  |  |
| Capability review |  |  |  |  |
| Mock interview |  |  |  |  |
| Network refresh |  |  |  |  |
| Career RTO test |  |  |  |  |

## 9.2 Trigger events

Re-evaluate immediately if:

- [ ] Team / org restructuring
- [ ] Layoff signals increase
- [ ] Role scope shrinks materially
- [ ] Compensation becomes uncompetitive
- [ ] Major market shift
- [ ] A new target lane becomes attractive
- [ ] I receive a serious external opportunity
- [ ] I feel trapped because I no longer know the external market

## Definition of done

- [ ] The system has a refresh cadence.
- [ ] New projects are captured before details are forgotten.
- [ ] Resume never falls years behind reality.
- [ ] Career RTO stays bounded and measurable.
- [ ] “外面是什么样” never returns to a complete black box.

---

# Career RTO

**Definition**

> If my current job disappeared today, how long would it take me to become ready to enter serious interview processes?

当前值见 frontmatter `career_rto`。分解:

| Component | Estimated recovery time | Main blocker |
|---|---:|---|
| Market refresh |  |  |
| Resume update |  |  |
| Project story refresh |  |  |
| Technical fundamentals |  |  |
| Coding interview |  |  |
| Interview communication |  |  |
| Opportunity sourcing |  |  |

> Long-term target: keep Career RTO low enough that losing the current role is a disruption, not a black-box crisis.

---

# Current Focus

叙事版的当前焦点(关键字段已同步进 frontmatter 的 `next_action` / `current_bottleneck` / `biggest_unknown`)。

## Biggest unknown

> 

## Biggest risk

> 

## Highest-leverage improvement

> 

## This week's focus

> 

## Next action

> 

---

# Change Log

| Date | Change | Why |
|---|---|---|
| 2026-09-09 | Created schema v0.1 | Turn “随时转身” into a visible and maintainable career skill |
| 2026-09-10 | v0.2:状态提取进 frontmatter(方案 B) | 让「事业面板」可被网站解析渲染;状态与叙事分区,唯一来源在 frontmatter |
