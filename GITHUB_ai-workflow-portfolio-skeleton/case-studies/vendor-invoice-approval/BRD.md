# Case Study: Vendor Invoice Approval & 3‑Way Match (Finance/AP)

## Problem Statement
Manual email back-and-forth, late approvals, and missing documentation cause delayed payments and audit risk. We need a controlled, auditable flow from **PO → Item Receipt → Vendor Bill** with configurable approvals and SLA visibility.

## Goals & KPIs
- Reduce average approval time from 5 days → **< 2 days**.
- **100%** invoices linked to a valid PO and receipt (3‑way match) where applicable.
- **0** payments without required approvals or documentation.
- Dashboard for AP aging, pending approvals, and exception rate.

## Scope
- In-scope: Purchase Orders, Item Receipts, Vendor Bills, Approvals, Notifications, Exception handling, Audit trail, Reporting.
- Out-of-scope: Vendor onboarding/KYB (future), complex tax localization beyond standard fields.

## Actors & RACI
- **Requester (Dept User)** – creates PO; provides receipt confirmation.
- **AP Specialist** – validates invoice; routes for approval; posts vendor bills.
- **Approver (Manager/Finance)** – approves or rejects with reason.
- **System Admin / Product Owner** – configures workflow, roles, and reports.
- **Auditor/Controller** – read-only access to approvals and changes.

## High-Level Workflow
1. Requester raises **PO** (GL account / Item + Department/Class).  
2. Receiving confirms **Item Receipt** (or Service Completion).  
3. Vendor sends **Invoice** → AP creates **Vendor Bill**; system attempts 3‑way match.  
4. If within thresholds → auto‑approve; else route to Manager/Finance via rules.  
5. On approval, post to **AP ledger**; schedule payment per terms.  
6. Exceptions (no PO, price/qty variance, vendor mismatch) go to an **Exception Queue**.

## Business Rules (examples)
- 3‑way match required for Goods; 2‑way for Services.
- Variance thresholds: price ±2%, qty ±1 unit → auto; otherwise approval.
- Segregation of Duties: creator ≠ approver.
- Role-based visibility (AP, Manager, Controller, Auditor).
- All actions must be timestamped and attributable.

## User Stories (samples)
- *As an AP Specialist, I want an exception queue so I can resolve mismatches quickly.*  
- *As a Manager, I want email/slack approvals with one-click Approve/Reject.*  
- *As a Controller, I want reports on exceptions, approval time, and late payments.*

## Acceptance Criteria (excerpt)
- Given a matched PO/Receipt/Bill within variance, when a bill is created, then the bill is **auto‑approved**.  
- Given a bill exceeding thresholds, when routed to the manager, then approval is required before posting.  
- Given DoA rules, when the bill exceeds approver’s limit, then escalate per matrix.

## Data & Reporting
- Core fields: Vendor, PO#, Receipt#, Bill#, Item/GL, Amount, Dept/Class/Location, Terms, Approver, Status, Exception Flag, Audit Log ID.  
- Reports: AP Aging, Approvals pending by approver, Exception rate, Cycle time.

## Risks & Mitigations
- **Data Quality** – enforce required fields and dropdowns; validations at entry.  
- **Change Adoption** – training, quick reference guides, and staged rollout.  
- **Audit Non-Compliance** – immutable audit log with user/time/action.
