import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight, Loader2, CheckCircle2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/contact.functions";
import {
  SERVICE_OPTIONS,
  JOB_TYPES,
  MULTIPLE_SERVICE_CATEGORIES,
  CONTACT_METHODS,
  URGENCY_OPTIONS,
  ACCEPTED_FILE_TYPES,
  ACCEPTED_FILE_EXT,
  MAX_FILE_SIZE,
} from "@/lib/quote-options";

const inputClass =
  "w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";
const labelClass =
  "text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2 block";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    jobType: "",
    multipleServices: [] as string[],
    otherService: "",
    propertyAddress: "",
    description: "",
    preferredContact: "",
    urgency: "",
  });

  const set = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) =>
    setFormData((p) => ({ ...p, [key]: value }));

  const jobTypeOptions = formData.service ? JOB_TYPES[formData.service] ?? [] : [];
  const showJobType = jobTypeOptions.length > 0;
  const showMultiple = formData.service === "Multiple Services Required";
  const showOther = formData.service === "Other (Please Describe)";

  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;
    const next: File[] = [...files];
    for (const f of Array.from(selected)) {
      if (f.size > MAX_FILE_SIZE) {
        toast.error(`${f.name} exceeds 10MB and was skipped`);
        continue;
      }
      if (!ACCEPTED_FILE_TYPES.includes(f.type) && !/\.(jpe?g|png|pdf|docx?)$/i.test(f.name)) {
        toast.error(`${f.name} is not an accepted file type`);
        continue;
      }
      if (next.length >= 10) {
        toast.error("Maximum 10 files");
        break;
      }
      next.push(f);
    }
    setFiles(next);
  };

  const toggleMulti = (s: string) => {
    set(
      "multipleServices",
      formData.multipleServices.includes(s)
        ? formData.multipleServices.filter((x) => x !== s)
        : [...formData.multipleServices, s],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const required = [
      ["name", "Full name"],
      ["email", "Email"],
      ["phone", "Phone"],
      ["service", "Service"],
      ["propertyAddress", "Property address"],
      ["description", "Description of work"],
      ["preferredContact", "Preferred contact method"],
      ["urgency", "Urgency"],
    ] as const;
    for (const [k, label] of required) {
      if (!String(formData[k as keyof typeof formData] ?? "").trim()) {
        toast.error(`${label} is required`);
        return;
      }
    }
    if (showJobType && !formData.jobType) {
      toast.error("Job type is required");
      return;
    }
    if (showMultiple && formData.multipleServices.length === 0) {
      toast.error("Please select at least one service category");
      return;
    }
    if (showOther && !formData.otherService.trim()) {
      toast.error("Please describe the service needed");
      return;
    }

    setLoading(true);
    try {
      const encoded = await Promise.all(
        files.map(async (f) => ({
          name: f.name,
          type: f.type || "application/octet-stream",
          base64: await fileToBase64(f),
        })),
      );
      await submitContactForm({ data: { ...formData, files: encoded } });
      setFormData({
        name: "", phone: "", email: "", service: "", jobType: "",
        multipleServices: [], otherService: "", propertyAddress: "",
        description: "", preferredContact: "", urgency: "",
      });
      setFiles([]);
      setSubmitted(true);
      toast.success("Your quote request has been sent!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-foreground leading-tight">
              Ready to Get <span className="text-gradient-amber">Started?</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">
              Whether it's a small repair or a multi-discipline project, we're ready. One call is all it takes.
            </p>

            <div className="mt-8 space-y-4">
              <a href="tel:+27767816550" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center"><Phone className="w-4 h-4 text-primary" /></div>
                <span className="text-sm">+27 76 781 6550</span>
              </a>
              <a href="mailto:quotes@maintenancemarshall.co.za" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center"><Mail className="w-4 h-4 text-primary" /></div>
                <span className="text-sm">quotes@maintenancemarshall.co.za</span>
              </a>
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center"><MapPin className="w-4 h-4 text-primary" /></div>
                <span className="text-sm">Kempton Park, South Africa</span>
              </div>
            </div>
          </motion.div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-primary/30 rounded-xl p-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Request Received</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                Thank you for contacting Maintenance Marshall. Your quote request has been received and a confirmation email is on its way. Our team will be in touch shortly.
              </p>
              <Button variant="heroOutline" size="lg" onClick={() => { setSubmitted(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                Back to Home
              </Button>
            </motion.div>
          ) : (
            <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="q-name" className={labelClass}>Full Name *</label>
                  <input id="q-name" type="text" value={formData.name} onChange={(e) => set("name", e.target.value)} className={inputClass} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="q-phone" className={labelClass}>Phone *</label>
                  <input id="q-phone" type="tel" value={formData.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} placeholder="Your phone" />
                </div>
              </div>

              <div>
                <label htmlFor="q-email" className={labelClass}>Email *</label>
                <input id="q-email" type="email" value={formData.email} onChange={(e) => set("email", e.target.value)} className={inputClass} placeholder="your@email.com" />
              </div>

              <div>
                <label htmlFor="q-service" className={labelClass}>Service Required *</label>
                <select id="q-service" value={formData.service} onChange={(e) => { set("service", e.target.value); set("jobType", ""); set("multipleServices", []); set("otherService", ""); }} className={inputClass}>
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {showJobType && (
                <div>
                  <label htmlFor="q-jobtype" className={labelClass}>Job Type *</label>
                  <select id="q-jobtype" value={formData.jobType} onChange={(e) => set("jobType", e.target.value)} className={inputClass}>
                    <option value="">Select a job type</option>
                    {jobTypeOptions.map((j) => <option key={j} value={j}>{j}</option>)}
                  </select>
                </div>
              )}

              {showMultiple && (
                <div>
                  <span className={labelClass}>Select All That Apply *</span>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {MULTIPLE_SERVICE_CATEGORIES.map((s) => (
                      <label key={s} className="flex items-center gap-2 text-sm text-foreground bg-card border border-border rounded-lg px-3 py-2 cursor-pointer hover:border-primary/50 transition-colors">
                        <input type="checkbox" checked={formData.multipleServices.includes(s)} onChange={() => toggleMulti(s)} className="accent-primary" />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {showOther && (
                <div>
                  <label htmlFor="q-other" className={labelClass}>Please Describe the Service *</label>
                  <input id="q-other" type="text" value={formData.otherService} onChange={(e) => set("otherService", e.target.value)} className={inputClass} placeholder="What do you need?" />
                </div>
              )}

              <div>
                <label htmlFor="q-address" className={labelClass}>Property Address *</label>
                <textarea id="q-address" rows={2} value={formData.propertyAddress} onChange={(e) => set("propertyAddress", e.target.value)} className={`${inputClass} resize-none`} placeholder="Enter the full property address where the work is required" />
              </div>

              <div>
                <label htmlFor="q-desc" className={labelClass}>Description of Work *</label>
                <textarea id="q-desc" rows={5} value={formData.description} onChange={(e) => set("description", e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe the maintenance issue, repair, installation, or work required in as much detail as possible" />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="q-contact-method" className={labelClass}>Preferred Contact Method *</label>
                  <select id="q-contact-method" value={formData.preferredContact} onChange={(e) => set("preferredContact", e.target.value)} className={inputClass}>
                    <option value="">Select...</option>
                    {CONTACT_METHODS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="q-urgency" className={labelClass}>Urgency *</label>
                  <select id="q-urgency" value={formData.urgency} onChange={(e) => set("urgency", e.target.value)} className={inputClass}>
                    <option value="">Select...</option>
                    {URGENCY_OPTIONS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <span className={labelClass}>Upload Images/Documents (optional)</span>
                <label htmlFor="q-files" className="flex items-center justify-center gap-2 border border-dashed border-border rounded-lg px-4 py-6 cursor-pointer hover:border-primary/60 transition-colors bg-card/50">
                  <Upload className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload — JPG, PNG, PDF, DOC, DOCX (max 10MB each)
                  </span>
                  <input id="q-files" type="file" multiple accept={ACCEPTED_FILE_EXT} className="hidden" onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }} />
                </label>
                {files.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {files.map((f, i) => (
                      <li key={i} className="flex items-center justify-between bg-card border border-border rounded-lg px-3 py-2 text-sm">
                        <span className="truncate text-foreground">{f.name} <span className="text-muted-foreground">({(f.size / 1024 / 1024).toFixed(2)} MB)</span></span>
                        <button type="button" onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive" aria-label="Remove file">
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Button variant="hero" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                {loading ? "Sending..." : "Send Quote Request"}
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
