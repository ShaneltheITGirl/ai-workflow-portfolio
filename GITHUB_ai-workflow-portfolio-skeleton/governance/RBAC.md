# Role-Based Access Matrix (sample)

| Role               | Create PO | Create Bill | Approve ≤$5k | Approve >$5k | Edit Vendor | Reports | Admin |
|--------------------|-----------|-------------|--------------|--------------|-------------|---------|-------|
| Requester          | ✓         |             |              |              |             | View    |       |
| AP Specialist      |           | ✓           |              |              |             | ✓       |       |
| Manager            |           |             | ✓            |              |             | ✓       |       |
| Finance Controller |           |             | ✓            | ✓            | ✓           | ✓       |       |
| Auditor (ReadOnly) |           |             |              |              |             | ✓       |       |
| Sys Admin/PO       |           |             |              |              |             | ✓       | ✓     |
