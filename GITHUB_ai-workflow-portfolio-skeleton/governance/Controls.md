# Governance & Controls (SOX‑friendly excerpt)

- **Segregation of Duties (SoD):** Creators cannot approve their own bills; high-value approvals require Finance Controller.
- **Approval Limits:** Configurable matrix by Role × Department/Class.
- **Immutable Audit Log:** Record user, timestamp, action, old/new values.
- **Data Validations:** Required fields; controlled picklists for Dept/Class/Location/Vendor.
- **Exception Handling:** Dedicated queue; root cause coding; monthly review.
- **Change Management:** Versioned configuration, test → UAT → prod promotion checklist.
- **Access Reviews:** Quarterly RBAC review and recertification.
- **Retention:** Invoices and approvals retained per policy (e.g., 7 years).

**KPIs & Monitoring**
- Approval cycle time, exception rate, overdue approvals, % auto-approved, DPO, duplicate vendor detection.
