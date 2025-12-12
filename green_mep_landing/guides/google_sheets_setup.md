# How to Connect Contact Form to Google Sheets

Since this is a static website, we can use **Google Apps Script** to receive form submissions and save them to a Google Sheet for free.

## Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com/) and create a new blank sheet.
2. Name it "Green MEP Contact Data" (or anything you like).
3. In the first row (headers), add:
   - Cell A1: `timestamp`
   - Cell B1: `name`
   - Cell C1: `email`
   - Cell D1: `phone`
   - Cell E1: `message`

## Step 2: Add the Script
1. In the Google Sheet, go to **Extensions > Apps Script**.
2. Delete any code in the editor (`myFunction`).
3. Paste the following code:

```javascript
/* Google Apps Script code to handle form submissions */
var sheetName = 'Sheet1';
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost (e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      if(header === 'timestamp'){
        return new Date();
      }
      return e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
```

4. **Save** the project (Name it "Contact Form Handlers").

## Step 3: Run Setup
1. In the toolbar, ensure `intialSetup` is selected in the dropdown function list.
2. Click **Run**.
3. You will be asked to review permissions. Click **Review Permissions**, choose your account, click **Advanced** -> **Go to Contact Form Handlers (unsafe)** -> **Allow**.

## Step 4: Deploy as Web App
1. Click **Deploy > New deployment**.
2. For "Select type", click the gear icon and select **Web app**.
3. Description: "Contact Form v1".
4. Execute as: **Me**.
5. Who has access: **Anyone** (This is crucial so your website visitors can submit the form).
6. Click **Deploy**.
7. Copy the **Web App URL**.

## Step 5: Connect to Website
1. Open the file `js/contact.js` in your project codebase.
2. Find the line: `const scriptURL = 'YOUR_WEB_APP_URL_HERE';`
3. Replace `'YOUR_WEB_APP_URL_HERE'` with the URL you just copied.
4. Save the file.

Your form is now connected!
