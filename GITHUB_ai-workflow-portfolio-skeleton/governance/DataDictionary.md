# Data Dictionary (excerpt)

**Transactions**
- **PurchaseOrder**: PO#, VendorId, DeptId, ClassId, LocationId, ItemId, Qty, UnitPrice, Currency, Terms, RequesterId, Status.
- **ItemReceipt**: Receipt#, PO#, ReceivedQty, ReceiverId, Date, Status.
- **VendorBill**: Bill#, VendorId, PO#, Receipt#, GLAccountId, Amount, DeptId, ClassId, LocationId, Terms, DueDate, Status, ApproverId, ApprovedOn, ExceptionFlag, ExceptionNotes.

**Reference**
- **Vendor**: VendorId, Name, TaxId, DefaultTerms, DefaultGL, ActiveFlag.
- **ChartOfAccounts**: GLAccountId, Name, Type (Expense/AP/COGS), ActiveFlag.
- **Department/Class/Location**: Id, Name, Parent, ActiveFlag.
