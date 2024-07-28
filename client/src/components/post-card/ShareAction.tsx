import { Share } from "lucide-react"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"

const ShareAction = () => {

    const copyText = async () => {
        await navigator.clipboard.writeText(window.location.href)
        return toast({ title: "Copied to clipboard" })
    }

    return (
        <div>
            <Button variant="ghost" size="icon" onClick={copyText}>
                <Share className="h-5 w-5" />
            </Button>
        </div>
    )
}

export default ShareAction

