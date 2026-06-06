import { Toaster } from "sonner"

export default function SonnerProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "bg-lumen-surface border border-lumen-border text-lumen-text font-plex",
          success:
            "bg-lumen-surface border border-lumen-border text-lumen-text",
          error:
            "bg-lumen-surface border border-lumen-border text-lumen-text",
        },
      }}
    />
  )
}
