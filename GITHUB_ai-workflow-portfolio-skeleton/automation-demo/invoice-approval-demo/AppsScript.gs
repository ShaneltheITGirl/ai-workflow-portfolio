/**
 * Apps Script: Simple AP Invoice Approval
 * - Trigger: Installable "On form submit"
 * - Sheet headers (row 1): Timestamp,Vendor,PO,Amount,Dept,ApproverEmail,Status,Exception,Link
 */

const ORG_DOMAIN = 'example.com';   // optional: restrict approver emails
const SENDER_NAME = 'AP Workflow Bot';

function onFormSubmit(e) {
  const sheet = e.source.getActiveSheet();
  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  const row = e.range.getRow();
  const values = sheet.getRange(row,1,1,sheet.getLastColumn()).getValues()[0];
  const rec = Object.fromEntries(headers.map((h,i)=>[h, values[i]]));

  // Basic validation
  if (!rec.ApproverEmail) return;
  if (ORG_DOMAIN && String(rec.ApproverEmail).split('@')[1] && !String(rec.ApproverEmail).endsWith(ORG_DOMAIN)) {
    logAction_(sheet, row, 'Rejected', 'Approver domain not allowed');
    return;
  }

  // Simple threshold logic (demo only)
  const amount = parseFloat(rec.Amount) || 0;
  const autoApproveLimit = 100; // auto-approve small invoices
  const needsApproval = amount > autoApproveLimit;

  if (!needsApproval) {
    logAction_(sheet, row, 'Approved', 'Auto-approved under threshold');
    return;
  }

  // Build approve/reject action URLs
  const {scriptUrl, token} = createActionToken_(sheet, row);
  const approveUrl = `${scriptUrl}?action=approve&row=${row}&token=${token}`;
  const rejectUrl  = `${scriptUrl}?action=reject&row=${row}&token=${token}`;

  // Send email to approver
  const subject = `Invoice ${rec.Vendor} / ${rec.PO} — needs approval`;
  const body = `Hello,

A new vendor invoice requires your approval.

Vendor: ${rec.Vendor}
PO: ${rec.PO}
Amount: ${rec.Amount}
Dept: ${rec.Dept}

Approve: ${approveUrl}
Reject: ${rejectUrl}

Thank you,
${SENDER_NAME}`;

  MailApp.sendEmail({
    to: rec.ApproverEmail,
    subject,
    htmlBody: body.replace(/\n/g,'<br>')
  });

  sheet.getRange(row, headers.indexOf('Status')+1).setValue('Pending Approval');
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const row = parseInt(e.parameter.row, 10);
  const action = e.parameter.action;
  const token = e.parameter.token;

  if (!validateToken_(sheet, row, token)) {
    return HtmlService.createHtmlOutput('Invalid or expired approval link.');
  }

  if (action === 'approve') {
    logAction_(sheet, row, 'Approved', 'Approved via link');
  } else if (action === 'reject') {
    logAction_(sheet, row, 'Rejected', 'Rejected via link');
  } else {
    return HtmlService.createHtmlOutput('Unknown action.');
  }
  return HtmlService.createHtmlOutput('Thank you — your response has been recorded.');
}

// Helper: create a per-row token and publish the script as web app
function createActionToken_(sheet, row) {
  const prop = PropertiesService.getDocumentProperties();
  const token = Utilities.getUuid();
  prop.setProperty('token_' + row, token);

  // NOTE: Publish the script as a web app once (Deploy → New deployment → Web app)
  // Then paste the web app URL below, or store it in Script Properties with key 'webapp_url'
  const url = PropertiesService.getScriptProperties().getProperty('webapp_url') || 'PASTE_WEB_APP_URL_HERE';
  return {scriptUrl: url, token};
}

function validateToken_(sheet, row, token) {
  const prop = PropertiesService.getDocumentProperties();
  const expect = prop.getProperty('token_' + row);
  return expect && token && expect === token;
}

function logAction_(sheet, row, status, note) {
  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  const now = new Date();
  sheet.getRange(row, headers.indexOf('Status')+1).setValue(status);
  sheet.getRange(row, headers.indexOf('Exception')+1).setValue(note);
  const linkCol = headers.indexOf('Link')+1;
  if (sheet.getRange(row, linkCol).getValue() === '') {
    const docUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
    sheet.getRange(row, linkCol).setValue(docUrl);
  }
}
