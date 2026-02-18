import MultiStepForm from "./components/multi-step-form/multiStepForm";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <MultiStepForm />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
