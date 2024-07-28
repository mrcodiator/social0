import { useState } from "react"

const ExpandText = ({ text }: { text: string }) => {
    const [expand, setExpand] = useState<boolean>(false);

    return (
        <div>
            {text.slice(0, expand ? text.length : 100)}
            {text.length > 100 &&
                <button className=" mx-2 text-primary" onClick={() => setExpand(!expand)}>
                    {expand ? 'less...' : 'more...'}
                </button>
            }
        </div>
    )
}

export default ExpandText
