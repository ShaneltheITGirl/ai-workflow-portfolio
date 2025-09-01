# NetSuite Mapping (Conceptual)

> Purpose: Demonstrate readiness by mapping the case study to NetSuite terms/features.

## Key Objects
- **Vendors**, **Items/Services**, **Chart of Accounts (GL)**, **Departments/Classes/Locations**, **Subsidiaries** (OneWorld), **Purchase Orders**, **Item Receipts**, **Vendor Bills**, **Journal Entries**.

## Features to Leverage
- **SuiteFlow** for approvals and routing (DoA rules, escalations, SLA reminders).  
- **Saved Searches / SuiteAnalytics** for AP aging, exception dashboards, and KPIs.  
- **Roles & Permissions** for SoD; **Approval Limits** per role.  
- **CSV Import / Data Management** for initial data loads and updates.  
- **Audit Trail** for configuration and transactions.

## Example Saved Searches (concept)
- *Bills Pending Approval by Approver* → criteria: Status=Pending, Amount>Limit.  
- *Exceptions – 3‑Way Match Failures* → join on PO/Receipt variance flags.  
- *Cycle Time* → search with formula fields: `BillApprovedDate - BillCreatedDate`.

## SuiteFlow Sketch
1. On **Vendor Bill** creation → evaluate match & variance.  
2. If within thresholds → set Status=Approved.  
3. Else route to **Manager**; if over limit → route to **Finance Controller**.  
4. Time-based actions: reminder at 24h, escalate at 72h.  
5. On approval → post to AP; write to Audit Log.
