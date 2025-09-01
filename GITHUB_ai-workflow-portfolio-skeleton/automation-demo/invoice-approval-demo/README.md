# Automation Demo: Google Sheets + Apps Script (Invoice Approval)

This demo simulates an AP approval flow with **free tools**:
- Google Form (invoice submission) → Google Sheet (tracking) → **Apps Script** (emails + status updates).

## What You’ll Build
- A Sheet with columns: `Timestamp, Vendor, PO, Amount, Dept, ApproverEmail, Status, Exception, Link`.
- A Form that writes to the Sheet.
- Script that:
  - Detects new submissions
  - Applies simple variance/threshold checks
  - Emails approver with Approve/Reject links
  - Updates the row’s `Status` and logs actions

## Steps
1. Create a Google Sheet named **AP_Invoices**; add the columns above (row 1 as headers).
2. Create a Google Form → *Responses* → link to the **AP_Invoices** sheet.
3. Open *Extensions → Apps Script* on the Sheet; paste `AppsScript.gs` from this folder.
4. In the script, update `ORG_DOMAIN` and `SENDER_NAME` constants as needed.
5. Set a trigger: *Triggers → Add Trigger* → `onFormSubmit` → From spreadsheet → On form submit.
6. Test by submitting a Form response. Watch the approver email and Status updates.
7. Optional: Add a second Form for Approvers to provide comments, and extend the script to record them.

> This is a simplified demo for portfolio purposes—enough to show automation thinking, controls, and results.
