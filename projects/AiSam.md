# AiSam — AI-Assisted Multimodal Developmental Screening Platform

> An AI-powered, child-friendly platform for early identification of learning and developmental difficulties through multimodal behavioral analysis.

## Overview

| Field | Details |
|-------|---------|
| **Repository** | [SamSunny4/AiSam](https://github.com/SamSunny4/AiSam) |
| **Status** | Research / Planning Stage |
| **Domain** | EdTech, AI/ML, Child Development |
| **Focus** | Early developmental screening, risk profiling |

---

## Description

AiSam is a research and planning repository for an AI-assisted developmental screening platform designed to identify early risk indicators in children for learning and developmental difficulties (e.g., dyslexia, ADHD, motor coordination issues). The system aims to replace costly clinic-based assessments with an accessible, gamified, home-friendly screening experience that parents and professionals can use.

The platform emphasises **risk profiling rather than diagnosis** and produces a parent-friendly report with actionable insights.

---

## Problem Statement

Existing screening methods are:
- Clinic-based and time-consuming
- Limited to a single assessment modality
- Often unavailable to families in underserved areas

There is a need for an accessible, multimodal screening tool that captures real-world learning behaviors — attention patterns, sensory preferences, motor responses, and language features — without requiring a specialist visit.

---

## Proposed Solution

A multimodal AI screening platform that integrates:

| Input Modality | What It Assesses |
|----------------|-----------------|
| Structured parent intake form | Medical history, family history, observed behaviors |
| Gamified MCQ assessment | Language, attention, memory, visual processing |
| Camera-based pose estimation | Motor coordination, comprehension, instruction-following |
| Speech-to-text analysis | Expressive language: vocabulary, fluency, pronunciation |
| Reading upload / interaction | Dyslexia-related reading patterns |
| Response timing & accuracy | Attention consistency, task persistence |

---

## System Flow

```
Parent Intake
    └─► Age-Based Adaptive Screening Path
            ├─► Gamified Questions (Text / TTS / Combined)
            ├─► Mini-Games (Memory, Pattern Recognition, Visual Processing)
            ├─► Pose Estimation Tasks (Camera)
            └─► Speech Analysis
                    └─► Feature Extraction Layer
                            └─► Rule-Based + Probabilistic Scoring
                                    └─► Developmental Risk Profile Report
```

---

## Output / Results

The system produces a domain-based **Developmental Risk Profile** with:

| Domain | Risk Levels |
|--------|-------------|
| Reading | Low / Moderate / High |
| Writing | Low / Moderate / High |
| Attention Regulation | Low / Moderate / High |
| Motor Coordination | Low / Moderate / High |
| Memory | Low / Moderate / High |

The parent-facing report highlights:
- **Strengths** observed during assessment
- **Areas of concern** flagged by the system
- **Observed behavioral patterns**
- **Inferred learning preferences** (visual vs auditory)

No diagnostic labels are applied — the system facilitates timely referral for professional evaluation.

---

## Repository Contents

| File | Description |
|------|-------------|
| `abstract.md` | Short project abstract |
| `main_abstract.md` | Full research abstract with background, objectives, methods, and conclusions |
| `basicinfo.md` | Intake form schema — child details, caregiver info, medical history, consent |
| `priority.md` | Feature priority and development roadmap |
| `quiz.md` | Screening question bank and quiz structure |
| `report.md` | Sample report structure and format |
| `report-org.md` | Report organisation and layout notes |
| `consent_acknmnt.txt` | Consent acknowledgement template |

---

## Key Design Principles

- **Multimodal** — Combines parent input, child interaction, passive behavioral signals, and media analysis
- **Adaptive** — Screening paths adjust based on child age and caregiver-reported concerns
- **Explainable** — Results are transparent and human-readable, not black-box predictions
- **Ethical** — No diagnostic labels; focuses on risk indicators and referral support
- **Accessible** — Designed for home use, not requiring specialist hardware or clinic visits
- **Scalable** — Cloud-deployable; suitable for large-scale early intervention programs

---

## Related Project

The implementation counterpart to AiSam's research is **[Leadis](./Leadis.md)**, which contains the actual Next.js application, MediaPipe integration, Flask ML backend, and form schemas derived from this planning work.
