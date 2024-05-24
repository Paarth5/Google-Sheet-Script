function getUserDataAndAppendToSheet() {
  // URL to your API endpoint for users
  const url = "http://13.201.45.107:3000/v1/users/newUsers";

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjMzNGE4ZTNmZWJmMDE0MWZjMDgxMjQiLCJpYXQiOjE3MTYxMjAwODEsImV4cCI6MTc0MjA0MDA4MSwidHlwZSI6ImFjY2VzcyJ9.jX-zxE0TSJgYGr601-K1ElylVrsdb_I9Ac9hjXYffkk";

  // Request headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  // Request payload
  const payload = {
    names: [
      "Paarth",
      "Paarth Bansal",
      "PaarthBansal",
      "Parth Bansal",
      "Lokesh",
    ],
    mobile: [
      "7027517793",
      "8950760276",
      "9315753913",
      "9911023164",
      "9899594595",
      "7387971038",
    ],
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: headers,
    payload: JSON.stringify(payload),
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var responseData = JSON.parse(response.getContentText());
    var users = responseData.data;

    // Get the spreadsheet object
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("App Downloads");

    // Assuming the sheet is empty, set headers once
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Email Verified",
        "Mobile Verified",
        "Name",
        "Mobile",
        "comments",
        "Country Code",
        "Company Name",
        "Email",
        "companyAddress",
        "companyCity",
        "companyCountry",
        "companyPostalCode",
        "companyState",
        "locationUrl",
        "Company Mobile",
        "Company mobile code",
        "Company Email",
        "Google Image",
      ]);
    }

    // Append each user's data to the sheet
    users.forEach(function (userInfo) {
      const user = userInfo.user;
      sheet.appendRow([
        user.isEmailVerified || "FALSE",
        user.isMobileVerified || "FALSE",
        user.name || "",
        user.mobile || "",
        "", // comments field is left empty
        user.mobileCountryCode || "",
        user.organizationName || "",
        user.email || "",
        user?.organizationAddress?.companyAddress || "",
        user?.organizationAddress?.companyCity || "",
        user?.organizationAddress?.companyCountry || "",
        user?.organizationAddress?.companyPostalCode || "",
        user?.organizationAddress?.companyState || "",
        user?.organizationAddress?.locationUrl || "",
        user.companyMobile || "",
        user.companyMobileCountryCode || "",
        user.companyEmail || "",
        user.profilePicUrl || "",
      ]);
    });
  } catch (err) {
    Logger.log("Error Fetching New User Info.", err);
  }
  Logger.log("User data appended to sheet successfully!");
}
