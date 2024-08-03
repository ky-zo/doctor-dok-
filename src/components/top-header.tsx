import { Button } from "./ui/button";
import { SettingsPopup } from "@/components/settings-popup";
import PatientListPopup from "./patient-list-popup";
import PatientRecordForm from "./patient-record-form";
import { PatientContext } from "@/contexts/patient-context";
import { useContext } from "react";
import { Chat } from "./chat";
import { AuthorizePopup } from "./authorize-popup";
import { LogOutIcon } from "lucide-react";
import { DatabaseContext } from "@/contexts/db-context";
import { toast } from "sonner";

export default function TopHeader() {
    const patientContext = useContext(PatientContext);
    const dbContext = useContext(DatabaseContext);
    return (
      <div className="sticky top-0 z-1000 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-200 dark:bg-zinc-800">
        <div className="font-medium">Patient Pad {patientContext?.currentPatient ? (' for ' + patientContext.currentPatient.displayName()) : (null)}</div>
        <div className="flex items-center gap-2">
          <PatientListPopup />
          <SettingsPopup />
          {(patientContext?.currentPatient !== null) ? (
            <PatientRecordForm patient={patientContext?.currentPatient} />
          ) : ("")}
          {(patientContext?.currentPatient !== null) ? (
            <Chat />
          ) : ("")}     
          <Button variant="outline" size="icon"  onClick={() => {
              dbContext?.logout();
              localStorage.removeItem('keepLoggedIn');
              toast.info("Logged out successfully");

            }} >
            <LogOutIcon className="cursor-pointer w-6 h-6"/>     
          </Button>
        </div>
      </div>
    );
}

function LogInIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" x2="3" y1="12" y2="12" />
      </svg>
    )
  }