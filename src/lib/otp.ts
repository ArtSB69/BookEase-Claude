export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function normalizePhone(phone: string): string {
  // Strip spaces/dashes, keep only digits and leading +
  return phone.replace(/[\s\-]/g, "");
}

export async function sendOtp(phone: string, code: string): Promise<void> {
  // Development: log to console
  console.log(`\n📱 [OTP] เบอร์: ${phone} → รหัส: ${code}\n`);

  // TODO: ใส่ SMS provider จริงตรงนี้
  // เช่น Twilio, thaibulksms, ESMS
  //
  // ตัวอย่าง thaibulksms:
  // await fetch("https://www.thaibulksms.com/api/sms/send", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     key: process.env.THAIBULKSMS_API_KEY,
  //     secret: process.env.THAIBULKSMS_SECRET,
  //     msisdn: phone,
  //     message: `รหัส OTP BookEase ของคุณคือ ${code} (หมดอายุใน 10 นาที)`,
  //   }),
  // });
}
