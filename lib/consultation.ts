export type ConsultationLead = {
  submittedAt: string;
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  website: string;
  message: string;
};

export function createConsultationTimestamp() {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Katmandu",
  }).format(new Date());
}
