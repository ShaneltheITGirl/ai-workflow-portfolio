# SuiteFlow Design (Concept)

**Trigger:** On Vendor Bill creation/update  
**Flow:** 
1. Evaluate PO/Receipt link and variance.
2. If within thresholds → set Status=Approved; stamp ApprovedBy/On.
3. If outside thresholds → route to Manager role; if over Manager limit → Finance Controller.
4. Reminders at 24h; escalate at 72h.
5. On Reject → set Status=Rejected; require comment; notify AP.
6. Log state changes to Audit table.

**Inputs:** Amount, Dept/Class, Vendor, PO#, Receipt#, Variance%.  
**Outputs:** Status, Approver, ApprovedOn, ExceptionFlag, EscalationLevel.
