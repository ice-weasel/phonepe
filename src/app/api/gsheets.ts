import { google } from "googleapis";
import keys from "@/../keys.json"

export default function handler(req:any, res:any) {
  console.log("API request received");

  if (req.method === "POST") {
    handlePost(req, res);
  } else {
    res.status(405).json({ error: true, message: "Method Not Allowed" });
  }
}




async function handlePost(req:any, res:any) {
  try {
    const client = new google.auth.JWT(
      keys.client_email,
      null,
      keys.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    client.authorize(async function (err, tokens) {
      if (err) {
        return res
          .status(500)
          .json({ error: true, message: "Authorization failed" });
      }

      const gsapi = google.sheets({ version: "v4", auth: client });

      const { inputValue } = req.body; // Assuming you send the input value in the request body

      const opt = {
        spreadsheetId: "1I5Fgyf9QFZYUFrz6UCkIYntaS8D5efyvF79l1PDOCvQ",
        range: "Sheet1!A1:A4",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[inputValue]],
        },
      };

      try {
        await gsapi.spreadsheets.values.append(opt);
        return res
          .status(200)
          .json({ success: true, message: "Data added successfully" });
      } catch (error) {
        console.error("Error adding data:", error);
        return res
          .status(500)
          .json({ error: true, message: "Error adding data" });
      }
    });
  } catch (e) {
    console.error("Internal server error:", e);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
}
