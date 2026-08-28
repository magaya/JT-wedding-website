export function getGoogleCalendarUrl(): string {
  const title = encodeURIComponent("Joseph & Thea's Wedding");
  const details = encodeURIComponent(
    "Join Joseph and Thea as they celebrate their marriage!\n\n" +
    "11:00 AM - Wedding Service (Arrival to Kampala Baptist Church)\n" +
    "4:30 PM - Ceremony & Reception (Oguzulu Resort Beach, Mukono)\n\n" +
    "We can't wait to celebrate with you!"
  );
  const location = encodeURIComponent("Oguzulu Resort Beach, Mukono, Uganda & Kampala Baptist Church");
  // 2027-09-03 11:00 AM EAT (UTC+3) is 20270903T080000Z to 20270903T210000Z
  const dates = "20270903T080000Z/20270903T210000Z";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function downloadIcsFile(): void {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Joseph & Thea Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:wedding-joseph-thea-20270903@wedding.josephandthea.com",
    "DTSTAMP:20260828T000000Z",
    "DTSTART:20270903T080000Z",
    "DTEND:20270903T210000Z",
    "SUMMARY:Joseph & Thea Wedding Celebration",
    "DESCRIPTION:Joseph and Thea are getting married! 11:00 AM Wedding Service at Kampala Baptist Church followed by 4:30 PM Ceremony & Reception at Oguzulu Resort Beach, Mukono.",
    "LOCATION:Oguzulu Resort Beach, Mukono, Uganda & Kampala Baptist Church",
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Joseph_and_Thea_Wedding_2027.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
